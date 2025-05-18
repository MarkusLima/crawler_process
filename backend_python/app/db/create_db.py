import os
from app.db.conector import get_connection
import mysql.connector
from mysql.connector import Error

def create_db_and_tables():
    try:

        # Conecta sem banco para criar o banco
        conn = get_connection()

        cursor = conn.cursor()

        # Criação das tabelas
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS scraped_data (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS processes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                numero_processo VARCHAR(50),
                data_disponibilizacao DATE,
                autores VARCHAR(255),
                advogados VARCHAR(255),
                conteudo_publicacao LONGTEXT,
                valor_bruto VARCHAR(50),
                valor_liquido VARCHAR(50),
                juros_moratorios VARCHAR(50),
                honorarios_advocaticios VARCHAR(50),
                reu VARCHAR(255) NOT NULL,
                status VARCHAR(10),
                link VARCHAR(255) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(100),
                email VARCHAR(100) UNIQUE,
                hashed_password VARCHAR(255)
            )
        """)

        cursor.execute("""
            CREATE TABLE IF NOT EXISTS user_processes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT,
                process_id INT,
                previous_data TEXT(64000),
                updated_data TEXT(64000),
                updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id),
                FOREIGN KEY (process_id) REFERENCES processes(id)
            )
        """)

        print("Tabelas criadas com sucesso.")
        cursor.close()
        conn.close()

    except Error as err:
        print(f"Erro: {err}")
