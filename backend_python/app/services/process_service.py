def create_process(con, process):
    try:
        # Verifica se o processo já existe
        query = "SELECT * FROM process WHERE link = %s"
        with con.cursor(dictionary=True) as cursor:
            cursor.execute(query, (process['link'],))
            existing_process = cursor.fetchone()
            if existing_process:
                return existing_process

            # Se não existir, cria um novo processo
            insert_query = """
                INSERT INTO process (link, conteudo_publicacao, data_disponibilizacao, reu, status)
                VALUES (%s, %s, %s, %s, %s)
            """
            values = (
                process['link'],
                process['conteudo_publicacao'],
                process['data_disponibilizacao'],
                "Instituto Nacional do Seguro Social - INSS",
                "captured"
            )
            cursor.execute(insert_query, values)
            con.commit()

            # Retorna o processo recém-criado
            cursor.execute(query, (process['link'],))
            new_process = cursor.fetchone()
            return new_process
    except Exception as e:
        raise Exception(f"Erro ao criar processo: {str(e)}")

def get_processes_by_status(con, status: str):
    try:
        query = "SELECT * FROM process WHERE status = %s"
        with con.cursor(dictionary=True) as cursor:
            cursor.execute(query, (status,))
            processes = cursor.fetchall()
            if not processes:
                raise Exception("Nenhum processo encontrado com o status fornecido.")
            return processes
    except Exception as e:
        raise Exception(f"Erro ao obter processos: {str(e)}")