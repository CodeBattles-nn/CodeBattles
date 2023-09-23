from flask import request, make_response

from app import app
from database import get_connection


@app.route("/api/logout", methods=['POST', 'GET'])
def logout_api():
    resp = make_response({"success": True})

    resp.set_cookie('user_id', expires=0)
    resp.set_cookie('authed', expires=0)
    resp.set_cookie('battle_id', expires=0)

    return resp


@app.route("/api/login", methods=['POST'])
def login_post_api():
    try:
        champ_id = request.json['id']
        login = request.json['login']
        password = request.json['password']

        champ_id = int(champ_id)

        con = get_connection()
        cur = con.cursor()
        cur.execute(f"SELECT * FROM public.champUsers_{champ_id} WHERE login = '{login}' AND password = '{password}'")
        user = cur.fetchone()

        assert user is not None

        resp = make_response({"success": True})
        resp.set_cookie('user_id', str(user[0]))
        resp.set_cookie('authed', str(True))
        resp.set_cookie('battle_id', str(champ_id))

        return resp
    except Exception as e:
        pass

    return {"success": False, "msg": "Bad Credentials"}, 403
