import React, { useEffect, useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import './kanban.css';
import api from '../services/api';
import { CalendarDays, Clock3, Scale, Search, SquareArrowLeft } from 'lucide-react';
import { hoursSinceCreation } from '../uitls/hours';
import logo from '../assets/juscash.svg';

type Processo = {
  id: number;
  numero_processo: string;
  data_disponibilizacao: string;
  autores: string;
  advogados: string;
  conteudo_publicacao: string;
  valor_bruto: string;
  valor_liquido: string;
  juros_moratorios: string;
  honorarios_advocaticios: string;
  reu: string;
  status: string;
  link: string;
  created_at: string;
};

type Column = {
  name: string;
  items: Processo[];
};

const emptyColumns: Record<string, Column> = {
  nova: { name: 'Nova Publicação', items: [] },
  lida: { name: 'Publicação Lida', items: [] },
  advogado: { name: 'Enviar para Advogado Responsável', items: [] },
  concluido: { name: 'Concluído', items: [] },
};

const Kanban: React.FC = () => {
    const [columns, setColumns] = useState<Record<string, Column>>(emptyColumns);
    const [search, setSearch] = useState<string>("");
    const [dateInitial, setDateIntial] = useState<string>("");
    const [dateFinish, setDateFinish] = useState<string>("");
    const [selectedProcesso, setSelectedProcesso] = useState<Processo | null>(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
      try {
            setColumns({
                nova: { ...emptyColumns.nova, items: [] },
                lida: { ...emptyColumns.lida, items: [] },
                advogado: { ...emptyColumns.advogado, items: [] },
                concluido: { ...emptyColumns.concluido, items: [] },
            });

            //await delay(2000);
            
            const res = await api.get("/process/list?keyword=" + search + "&date_initial=" + dateInitial + "&date_finish=" + dateFinish);
            const data: Processo[] = res.data.processes;

            // Distribui os processos nas colunas conforme o status
            const updatedColumns = {
                nova: { ...emptyColumns.nova, items: [] },
                lida: { ...emptyColumns.lida, items: [] },
                advogado: { ...emptyColumns.advogado, items: [] },
                concluido: { ...emptyColumns.concluido, items: [] },
            };

            data.forEach((proc) => {
            if (proc.status === 'nova') updatedColumns.nova.items.push(proc);
            else if (proc.status === 'lida') updatedColumns.lida.items.push(proc);
            else if (proc.status === 'enviar') updatedColumns.advogado.items.push(proc);
            else if (proc.status === 'concluido') updatedColumns.concluido.items.push(proc);
            });

            setColumns(updatedColumns);
        } catch (err) {
            console.error('Erro ao buscar processos:', err);
        }
    };
    
    const onDragEnd = async (result: DropResult) => {

        const columnOrder = ['nova', 'lida', 'advogado', 'concluido'];

        const { source, destination } = result;
        if (!destination) return;

        const sourceCol = columns[source.droppableId];
        const destCol = columns[destination.droppableId];

        console.log("sourceCol", sourceCol);
        console.log("destCol", destCol);

        const sourceIndex = columnOrder.indexOf(source.droppableId);
        const destIndex = columnOrder.indexOf(destination.droppableId);

        // Permite mover apenas uma etapa para frente ou para trás
        if (Math.abs(destIndex - sourceIndex) !== 1) {
            alert('Movimentação inválida. Só é permitido mover para a etapa anterior ou próxima!');
            return;
        }

        const [movedItem] = sourceCol.items.splice(source.index, 1);

        await api.put("/process/update/" + movedItem.id, {status: destCol.name});

        console.log("movedItem", movedItem);
        destCol.items.splice(destination.index, 0, movedItem);

        setColumns({
            ...columns,
            [source.droppableId]: { ...sourceCol },
            [destination.droppableId]: { ...destCol },
        });
    };

    const logOut = () => {
        localStorage.removeItem("token");
        alert("Logout realizado com sucesso");
        window.location.reload();
    };

    const openModal = (processo: Processo) => {
        setSelectedProcesso(processo);
        setShow(true);
    };

    const closeModal = () => {
        setShow(false);
    };

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <img src={logo} alt="Logo" width="150" className="d-inline-block align-text-top" />
                    <div className="d-flex gap-2">
                        <button className="btn" type="button" onClick={() => logOut()}>
                            <SquareArrowLeft />sair
                        </button>
                    </div>
                </div>
            </nav>
            <div className="container py-4">
                <div className="kanban-board">
                    <div className="row mb-4">
                        <h4 className="mb-0 col-md-4 d-flex justify-content-start"><Scale/>Publicações</h4>
                        <div className="col-md-8 d-flex justify-content-end">
                            <div className="row">
                                <div className="col-md-5">
                                    <input type="text" className="form-control form-control-sm" placeholder="Pesquisar..." onChange={(e)=>setSearch(e.target.value)} />
                                </div>
                                <div className="col-md-3 d-flex align-items-center">
                                    <span className="text-muted">De:</span>
                                    <input type="date" className="form-control form-control-sm" onChange={(e)=>setDateIntial(e.target.value)} />
                                </div>
                                <div className="col-md-4 d-flex align-items-center">
                                    <span className="text-muted">até:</span>
                                    <input type="date" className="form-control form-control-sm" onChange={(e)=>setDateFinish(e.target.value)}/>
                                    <button className="btn btn-success btn-sm" type="button" onClick={() => fetchData()}>
                                        <Search width={15} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <DragDropContext onDragEnd={onDragEnd}>
                        <div className="row flex-nowrap overflow-auto g-3">
                            {Object.entries(columns).map(([columnId, column]) => (
                            <div className="col-12 col-md-6 col-lg-3" key={columnId}>
                                <div className="kanban-column h-100">
                                <div className="kanban-header">{column.name}</div>
                                <Droppable droppableId={columnId}>
                                    {(provided) => (
                                    <div className="kanban-dropzone" ref={provided.innerRef} {...provided.droppableProps}>
                                        {column.items.map((item, index) => (
                                        <Draggable
                                            key={`${item.id}-${columnId}-${index}`}
                                            draggableId={`${item.id}-${columnId}-${index}`}
                                            index={index}
                                        >
                                            {(provided) => (
                                            <div
                                                className="kanban-card mb-2 row"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                onClick={() => openModal(item)}
                                            >
                                                <div className="col-md-12 fw-semibold">{item.numero_processo}</div>
                                                <div className="text-muted col-md-6 mt-1 d-flex align-items-center justify-content-start">
                                                    <Clock3 width={15}/>
                                                    <span>{hoursSinceCreation(item.created_at)}h</span>
                                                </div>
                                                <div className="col-md-6 text-muted mt-1 d-flex align-items-center justify-content-end">
                                                    <CalendarDays width={15}/>
                                                    <span>{item.data_disponibilizacao}</span>
                                                </div>
                                            </div>
                                            )}
                                        </Draggable>
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                    )}
                                </Droppable>
                                </div>
                            </div>
                            ))}
                        </div>
                    </DragDropContext>
                </div>
            </div>

            {/* Modal Bootstrap */}
            {show && (
                <div className="modal fade show d-block" tabIndex={-1} role="dialog">
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                        <h5 className="modal-title">Detalhes do Processo</h5>
                        <button type="button" className="btn-close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                        {selectedProcesso && (
                            <>
                            <p><strong>Número:</strong> {selectedProcesso.numero_processo}</p>
                            <p><strong>Data Disponibilização:</strong> {selectedProcesso.data_disponibilizacao}</p>
                            <p><strong>Autores:</strong> {selectedProcesso.autores}</p>
                            <p><strong>Advogados:</strong> {selectedProcesso.advogados}</p>
                            <p><strong>Conteúdo:</strong> {selectedProcesso.conteudo_publicacao}</p>
                            <p><strong>Réu:</strong> {selectedProcesso.reu}</p>
                            <p><strong>Valor Bruto:</strong> {selectedProcesso.valor_bruto}</p>
                            <p><strong>Valor Líquido:</strong> {selectedProcesso.valor_liquido}</p>
                            <p><strong>Juros Moratórios:</strong> {selectedProcesso.juros_moratorios}</p>
                            <p><strong>Honorários Advocatícios:</strong> {selectedProcesso.honorarios_advocaticios}</p>
                            <a href={"https://dje.tjsp.jus.br/cdje/getPaginaDoDiario.do?"+selectedProcesso.link} target="_blank" rel="noopener noreferrer">Acessar publicação</a>
                            </>
                        )}
                        </div>
                    </div>
                    </div>
                </div>
            )}

        </>
    );
};

export default Kanban;
