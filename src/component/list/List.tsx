import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { BsFillTrashFill } from 'react-icons/bs';

import { List, Task, Variables, Setters } from '../../form/form';
import TaskComponent from '../task/Task'
import './List.css'

type Props = {
    variables: Variables;
    setters: Setters;
}

const ListComponent: React.FC<Props> = ({variables, setters}: Props) => {

    const deleteList = (id: string, length: number) => {
        if(window.confirm("Do you really want to delete this list ?") && length === 0) {
            setters.setLists(variables.lists.filter((list: List) => list.id !== id));
        }
    }
    
    return <div className='row'> {
        variables.sortList.map((list: List) => {
            return (
                <div className='col-4'>
                    <div className='card'>
                        <div className='card-header bg-dark'>
                            <h3>{list.title}</h3>
                        </div>

                        <Droppable droppableId={list.id}> 
                        {
                            (provided) => (
                                <div className='card-body' ref={provided.innerRef} {...provided.droppableProps}> {
                                        list.tasks.map((task: Task, index: number) => {
                                            return <TaskComponent index={index} task={task} listId={list.id} variables={variables} setters={setters} key={task.id} />
                                        })
                                    }
                                    {provided.placeholder}
                                </div>
                            )
                        } 
                        </Droppable>
                        
                        <div className='card-footer bg-dark'>
                            <button disabled={ list.tasks.length !== 0 } onClick={ () => deleteList(list.id, list.tasks.length) } type="button" className="btn btn-danger"><span className='icon'>Delete this List <BsFillTrashFill/></span></button>
                        </div>
                    </div>
                </div>
            );
        })
    }
    </div>;
};

export default ListComponent;