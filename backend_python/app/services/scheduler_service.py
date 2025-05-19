def save_scheduler(conn, data):
    try:
        query = "INSERT INTO scraped_data (title) VALUES (%s)"
        with conn.cursor() as cursor:
            cursor.execute(query, (data['title'],))
        conn.commit()
    except Exception as e:
        raise Exception(f"Erro ao salvar dados no banco de dados: {str(e)}")