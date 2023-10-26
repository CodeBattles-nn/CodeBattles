import os

DB_HOST = None
DB_USERNAME = None
DB_PASSWORD = None
DB_NAME = None
CHECKER_PORT = None
HASH_SALT = None


def init():
    global DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME, CHECKER_PORT, HASH_SALT
    DB_HOST = os.environ.get("DB_HOST")
    DB_USERNAME = os.environ.get("DB_USERNAME")
    DB_PASSWORD = os.environ.get("DB_PASSWORD")
    DB_NAME = os.environ.get("DB_NAME")
    CHECKER_PORT = os.environ.get("CHECKER_PORT")
    HASH_SALT = os.environ.get("HASH_SALT")