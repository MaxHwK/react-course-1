import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { BsFillPinAngleFill, BsPencilSquare, BsFillTrashFill } from 'react-icons/bs';

import { List, Task, Variables, Setters } from '../../form/form';
import './Task.css';

type Props = {
    index: number;
    listId: string;
    task: Task;
    variables: Variables;
    setters: Setters;
}

const TaskComponent: React.FC<Props> = ({index, listId, task, variables, setters}: Props) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editTitle, setEditTitle] = useState<string>(task.title);
    const [editPriority, setEditPriority] = useState<string>(task.priority);
    const [editDescription, setEditDescription] = useState<string>(task.description);
    const [editAssignedTo, setEditAssignedTo] = useState<string>(task.assignedTo);
    
    const pinTask = (id: string) => {
        setters.setLists(variables.lists.map((list: List) => {
            if (list.id === listId) {
                list.tasks = list.tasks.map((task: Task) => 
                    task.id === id ? {...task, compeleted:!task.completed} : task 
                );          
            }
            return list;
        }));
    }

    const editTask = (e: React.FormEvent, id: string) => {
        e.preventDefault();
        if(editTitle === "" || editPriority === "" || editDescription === "" || editAssignedTo === "") {
            alert("Empty fields !");
            return;
        }

        setters.setLists(variables.lists.map((list: List) => {
            if (list.id === listId) {
                list.tasks = list.tasks.map((task: Task) => 
                    task.id === id ? {...task, title: editTitle, priority: editPriority, description: editDescription, assignedTo: editAssignedTo, } : task
                );          
            }
            return list;
        }));

        setEdit(false);
    }

    const deleteTask = (id: string) => {
        setters.setLists(variables.lists.map((list: List) => {
            if (list.id === listId) {
                list.tasks = list.tasks.filter((task: Task) => task.id !== id);
            }
            return list;
        }))
    }

    return (
        <Draggable draggableId={task.id} index={index}>
        {
            (provided) => (
                <div className='row' ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <form onSubmit={(e) => { editTask(e, task.id) }}>
                        <div className={`card task-card p-0 mt-2 ${task.completed ? "alert-success" : edit ? "alert-warning" : ""}`}>
                        {
                            edit ? (
                                <span>
                                    <div className="card-header bg-dark">
                                        <label className='labelTitle' htmlFor="title">Title of the task</label>
                                        <input className='form-control' id='title' value={editTitle} onChange={(e) => { setEditTitle(e.target.value) }} />
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <label htmlFor="priority">Priority (Low, Medium, High)</label>
                                            <input className='form-control' id='priority' value={editPriority} onChange={(e) => { setEditPriority(e.target.value) }} /> 
                                        </div>

                                        <hr/>

                                        <div className='row'>
                                            <label htmlFor="description">Description</label>
                                            <input className='form-control' id='description' value={editDescription} onChange={(e) => { setEditDescription(e.target.value) }} />
                                        </div>

                                        <hr/>

                                        <div className="row">
                                            <label htmlFor="assignedTo">Assigned to</label>
                                            <input className='form-control' id='assignedTo' value={editAssignedTo} onChange={(e) => { setEditAssignedTo(e.target.value) }} />
                                        </div>
                                    </div>
                                </span>
                            ): (
                                <span>
                                    <div className="card-header bg-dark">
                                        <h5>{task.title}</h5>
                                    </div>
                                    <div className="card-body">
                                        <div className="row">
                                            <span className="badge bg-info text-dark w-25">{task.priority}</span>
                                        </div>

                                        <div className='row'>
                                            <p>{task.description}</p>
                                        </div>

                                        <div className="row d-flex justify-content-end">
                                            <span className="badge bg-primary w-25">{task.assignedTo}</span>
                                        </div>
                                    </div>
                                </span>
                            )
                        }

                        <div className="card-footer bg-dark">
                            <div className="btn-group" role="group">
                                { !edit ? <button disabled={edit} onClick={() => pinTask(task.id)} type="button" className="btn btn-primary"> Pin <BsFillPinAngleFill/></button> : null }
                                { edit ? ( <input type="submit" className="btn btn-primary" value="Update" /> ) : ( task.completed ? null : <button className="btn btn-warning" disabled={task.completed} onClick={() => { setEdit(!edit) }}>Edit <BsPencilSquare/></button> ) }
                                { !edit ? <button disabled={edit} onClick={() => deleteTask(task.id)} type="button" className="btn btn-danger">Delete <BsFillTrashFill/></button> : null }
                            </div>
                        </div>

                        </div>

                    </form>
                </div>
            )
        }    
        </Draggable>
    );
};

export default TaskComponent;
