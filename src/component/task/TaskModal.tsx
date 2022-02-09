import React from 'react';

import { List, Variables, Setters, Actions } from '../../form/form';
import './Task.css';

type Props = {
    variables: Variables;
    setters: Setters;
    actions: Actions;
}

const TaskModal: React.FC<Props> = ({variables, setters, actions}: Props) => {
    return (
        <div>
            <div className='row mb-2'>
                <form onSubmit={(e) => actions.newTask(e)}>
                    <div className="row">
                        <div className="form-floating mb-3 col-6">
                            <input type="text" className="form-control" value={variables.taskTitle} onChange={(e) => setters.setTaskTitle(e.target.value)} id="title" placeholder="Title of your task"/>
                            <label htmlFor="title">Title of your task</label>
                        </div>

                        <div className="form-floating mb-3 col-6">
                            <input type="text" className="form-control" value={variables.priority} onChange={(e) => setters.setPriority(e.target.value)} id="priority" placeholder="Priority (Low, Medium, High)"/>
                            <label htmlFor="priority">Priority (Low, Medium, High)</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" value={variables.description} onChange={(e) => setters.setDescription(e.target.value)} id="description" placeholder="Description of your task"/>
                            <label htmlFor="description">Description of your task</label>
                        </div>
                    </div>

                    <div className="row">
                        <div className="form-floating mb-3 col-6">
                            <select className="form-control" id='list' value={variables.listId} onChange={(e) => setters.setListId(e.target.value)}>
                                <option value="">Choose a list</option>
                                {variables.lists.map((list: List) => {
                                    return (
                                        <option value={list.id}>{list.title}</option>
                                    );
                                })}
                            </select>
                            <label htmlFor="list">Which List ?</label>
                        </div>

                        <div className="form-floating mb-3 col-6">
                            <input type="text" className="form-control" value={variables.assignedTo} onChange={(e) => setters.setAssignedTo(e.target.value)} id="list" placeholder="Assigned to"/>
                            <label htmlFor="list">Assigned to</label>
                        </div>  
                    </div>

                    <div className="form-floating mb-3 col-3 btn-right">
                        <input className="btn btn-primary w-100 h-100" type="submit" value="Create" />
                    </div>
  
                </form>
            </div>
        </div>
    );
};

export default TaskModal;
