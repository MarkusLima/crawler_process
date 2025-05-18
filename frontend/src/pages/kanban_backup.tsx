import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import './kanban.css';

type Card = {
  id: string;
  text: string;
  info: string;
};

type Column = {
  name: string;
  items: Card[];
};

const initialData: Record<string, Column> = {
  nova: {
    name: 'Nova Publicação',
    items: [
      { id: '1', text: '5018120-21.2021.8.13.0022', info: '3h - 27/03/2025' },
    ],
  },
  lida: {
    name: 'Publicação Lida',
    items: [
      { id: '2', text: '5018120-21.2021.8.13.0022', info: '3h - 27/03/2025' },
    ],
  },
  advogado: {
    name: 'Enviar para Advogado Responsável',
    items: [],
  },
  concluido: {
    name: 'Concluído',
    items: [
      { id: '3', text: '5018120-21.2021.8.13.0022', info: '1h - 27/03/2025' },
      { id: '4', text: '5018120-21.2021.8.13.0022', info: '7h - 27/03/2025' },
    ],
  },
};

const Kanban: React.FC = () => {
    const [columns, setColumns] = useState(initialData);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;
        if (!destination) return;

        const sourceCol = columns[source.droppableId];
        const destCol = columns[destination.droppableId];
        const [movedItem] = sourceCol.items.splice(source.index, 1);
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

    return (
        <>
            <nav className="navbar navbar-light bg-light">
                <div className="container-fluid">
                    <img src="/logo.svg" alt="Logo" width="40" className="d-inline-block align-text-top" />
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-danger" type="button" onClick={() => logOut()}>
                            <i className="bi bi-trash"></i> sair
                        </button>
                    </div>
                </div>
            </nav>
            <div className="container py-4">
                <div className="kanban-board">
                    <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-2">
                    <h4 className="mb-0"><i className="bi bi-bell me-2"></i>Publicações</h4>
                    <div className="d-flex gap-2">
                        <input type="text" className="form-control form-control-sm" placeholder="Pesquisar..." />
                        <span className="text-muted">De:</span>
                        <input type="date" className="form-control form-control-sm" />
                        <span className="text-muted">até:</span>
                        <input type="date" className="form-control form-control-sm" />
                        <button className="btn btn-outline-primary btn-sm" type="button">
                        <i className="bi bi-search"></i>
                        </button>
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
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided) => (
                                            <div
                                                className="kanban-card mb-2"
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <div className="fw-semibold">{item.text}</div>
                                                <div className="text-muted small d-flex align-items-center gap-2 mt-1">
                                                <i className="bi bi-clock"></i>
                                                <span>{item.info}</span>
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
        </>
    );
};

export default Kanban;
