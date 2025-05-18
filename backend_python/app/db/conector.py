import os
import mysql.connector

def get_connection():

    DB_HOST= os.getenv("DB_HOST","db")
    DB_USER= os.getenv("DB_USER","crawler")
    DB_PASSWORD= os.getenv("DB_PASSWORD","crawlerpass")
    DB_NAME= os.getenv("DB_NAME","crawlerdb")

    return mysql.connector.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWORD,
        database=DB_NAME
    )