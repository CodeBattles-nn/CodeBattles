from flask import request
from psycopg2.extras import RealDictCursor

from app import app
from database import get_connection
from decorators import teacher_required


@app.route("/api/teacher/problems")
@teacher_required
def get_problems_api_route():
    connection = get_connection()
    cursor = connection.cursor(cursor_factory=RealDictCursor)

    cursor.execute("SELECT id, name, description FROM problems")
    problems = cursor.fetchall()

    return problems


@app.route("/api/teacher/problems/<problem_id>")
@teacher_required
def get_problems_byid_api_route(problem_id):
    connection = get_connection()
    cursor = connection.cursor(cursor_factory=RealDictCursor)

    cursor.execute(f"SELECT id, name, description FROM problems WHERE id = {problem_id}")
    problem = cursor.fetchone()

    print(problem)

    if problem is None:
        return "", 404

    return problem
