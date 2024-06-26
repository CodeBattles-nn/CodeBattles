import datetime
import json
import string

import requests
from flask import request

import env
from app import app
from database import get_connection
from decorators import get_user_id, api_login_required


@app.route("/api/send", methods=['POST'])
@api_login_required
@get_user_id
def api_send_prog(user_id, uid):
    connection = get_connection()
    cur = connection.cursor()

    cur.execute("SELECT * FROM champs WHERE id = %s", (str(user_id),))

    fetch = cur.fetchone()  # Can be None
    problems_ids_temp = fetch[3:]
    problems_ids = []

    sql = "SELECT * FROM problems WHERE id = -1 "

    strs = string.ascii_uppercase

    for i in problems_ids_temp:
        if i is not None:
            problems_ids.append(i)
            sql += "OR id = %s "

    cur.execute(sql, tuple(problems_ids))

    x = list(cur.fetchall())

    problem_ = None
    problem_letter_form = request.json['problem']

    for i in x:
        _id = i[0]
        problem_letter = strs[problems_ids.index(_id)]
        if problem_letter_form == problem_letter:
            problem_ = i

    tests = problem_[5]
    tests = json.loads(tests)
    tests = list(map(lambda z: {"in": z[0], "out": z[1]}, tests))

    print(problem_)

    f_lang = request.json['cars']
    f_code = request.json['src']

    cur.execute(
        f'''
        INSERT INTO champSends_{user_id}
        (problem_name, problem_id, user_id, send_time, state, program, problem_letter, lang)
        VALUES(%s, %s, %s, %s, %s, %s, %s, %s);
        ''',
        (
            problem_[1], problem_[0], uid, datetime.datetime.now(),
            "Тестируется", f_code,
            problem_letter_form,
            f_lang)
    )
    cur.execute(
        f"SELECT currval(pg_get_serial_sequence('champSends_{user_id}','id'));")

    inserted_id = cur.fetchone()[0]

    meta = {
        "champ_id": user_id,
        "user_id": uid,
        "problem": request.json['problem'],
        "id": inserted_id,
    }

    data = {
        "meta": json.dumps(meta),
        "source": request.json['src'],
        "compiler": request.json['cars'],
        "tests": tests,
    }

    connection.commit()

    cur.execute(
        f"SELECT address FROM servers WHERE id = %s and enabled = true",
        (request.json['cars'],))

    server_addr = cur.fetchone()
    server_addr = server_addr[0]
    print()

    requests.post(f"http://{server_addr}:{env.CHECKER_PORT}/api/v1/test",
                  json=data)
    return {"success": True}
