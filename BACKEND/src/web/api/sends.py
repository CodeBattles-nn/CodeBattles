import json

from app import app
from database import get_connection
from decorators import get_user_id, api_login_required


@app.route("/api/sends")
@api_login_required
@get_user_id
def api_sends(user_id, uid):
    connection = get_connection()
    cur = connection.cursor()

    cur.execute(f"SELECT * FROM champSends_{user_id} WHERE user_id = %s ORDER BY send_time DESC", (uid,))

    db_sends = cur.fetchall()

    to_render = []

    for send in db_sends:
        id, letter, name, problem_id, pr_user_id, send_time, state, result, program, score, lang = send

        human_send_time = send_time.strftime("%m/%d/%Y, %H:%M:%S")

        to_render.append(
            dict(id=id, letter=letter, name=name, send_time=human_send_time, state=state,
                 score=(score, "")[score is None],
                 program_checked=result is not None))

    print()

    return dict(success=True, sends=to_render)


@app.route("/api/send/<send_id>")
@api_login_required
def api_send_viewer(send_id, user_id):
    connection = get_connection()
    cur = connection.cursor()

    cur.execute(f'''
      SELECT t1.*, t2.name as lang_name, t2.lang_name as lang_id
      FROM public.champSends_{user_id} as t1
      INNER JOIN public.servers as t2
                  on CAST(t1.lang as INTEGER) = t2.id
                  
      WHERE t1.id = %s
    ''', (send_id,))

    data = cur.fetchone()

    result = json.loads(data[7])

    prog = data[8]
    lang = data[11]
    lang_id = data[12]

    to_render = []

    for i, test in enumerate(result):
        message = test['msg']
        out = test['out']

        if message == "WRONG_ANSWER":
            out = """ВЫВОД СКРЫТ"""

        to_add = dict(id=i + 1, time=test['time'], msg=message, out=out)
        to_render.append(to_add)

    connection.close()

    print()

    return dict(success=True, tests=to_render, lang=lang, program=prog, lang_id=lang_id)