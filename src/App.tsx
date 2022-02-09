import React, { FormEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { v4 } from 'uuid';

import { List, Task } from './form/form';
import NavbarComponent from './component/navbar/Navbar';
import ListComponent from './component/list/List';
import SortComponent from './component/sort/Sort';
import InputListModal from './component/list/ListModal';
import InputTaskModal from './component/task/TaskModal';

import "./assets/css/bootstrap.min.css";
import "./App.css";

const App: React.FC = () => {    

    const [lists, setLists] = useState<List[]>([]);
    const [listId, setListId] = useState<string>("");
    const [listTitle, setListTitle] = useState<string>("");
    const [taskId, setTaskId] = useState<string>("");
    const [taskTitle, setTaskTitle] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [assignedTo, setAssignedTo] = useState<string>("");
    const [completed, setCompleted] = useState<boolean>(false);
    const [ListModalNotHidden, setListModalNotHidden] = useState<boolean>(false);
    const [TaskModalNotHidden, setTaskModalNotHidden] = useState<boolean>(false);
    const [sort, setSort] = useState<string>("");
    const [sortList, setSortList] = useState<List[]>([]);

    const variables = {
        lists,
        listId,
        listTitle,
        taskId,
        taskTitle,
        priority,
        description,
        assignedTo,
        completed,
        sort,
        sortList
    }

    const setters = {
        setLists,
        setListId,
        setListTitle,
        setTaskId,
        setTaskTitle,
        setPriority,
        setDescription,
        setAssignedTo,
        setCompleted,
        setSort,
        setSortList
    }

    const modalStyle = {
        content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        },
    };

    useEffect(() => {
        const sortTasks = () => {
            switch (sort) {
                case 'pinned':
                    setSortList(lists.map(list => {
                        return {
                            ...list,
                            tasks: list.tasks.filter(task => task.completed)
                        }
                    }));
                    break;

                case 'nonpinned':
                    setSortList(lists.map(list => {
                        return {
                            ...list,
                            tasks: list.tasks.filter(task => !task.completed)
                        }
                    }));
                    break;

                default:
                    setSortList(lists);
                    break;
            }
        }
        sortTasks();
    }, [sort, lists]);

    const newList = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(!listTitle) {
            return alert('Empty fields !');
        }

        const newList: List = {
            id: v4(),
            title: listTitle,
            tasks: [],
        }

        setLists([...lists, newList]);
        setListTitle("");
        listModalHidden();
    }
    
    const newTask = (e: FormEvent<HTMLFormElement>) => {        
        e.preventDefault();

        if(!listId || !taskTitle || !priority || !description || !assignedTo) {
            return alert('Empty fields !');
        }

        const newTask: Task = {
            id: v4(),
            title: taskTitle,
            priority: priority,
            description: description,
            assignedTo: assignedTo,
            completed: completed
        }

        lists.forEach(list => {
            if(list.id === listId) {
                list.tasks.push(newTask);
            }
        });
        
        setLists([...lists]);
        setTaskTitle("");
        setPriority("");
        setDescription("");
        setAssignedTo("");
        taskModalHidden();
    }

    const listModal = () => {
        setListModalNotHidden(true);
    }

    const listModalHidden = () => {
        setListModalNotHidden(false);
    }

    const taskModal = () => {
        setTaskModalNotHidden(true);
    }

    const taskModalHidden = () => {
        setTaskModalNotHidden(false);
    }

    const actions = {
        newList,
        newTask,
        listModal,
        listModalHidden,
        taskModal,
        taskModalHidden
    }

    const onDragStop = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const listSource = lists.find(list => list.id === source.droppableId);
        const listDestination = lists.find(list => list.id === destination.droppableId);

        if (listSource && listDestination) {
            const task = listSource.tasks.splice(source.index, 1)[0];
            listDestination.tasks.splice(destination.index, 0, task);

            setLists([...lists]);
        }
    };

    return (
        <div className="App">
            <NavbarComponent variables={variables} actions={actions} />

            <DragDropContext onDragEnd={onDragStop}>

                <div className='container'>

                    { lists.length !== 0 ? <SortComponent setters={setters} /> : null }
                    { lists.length === 0 ? <InputListModal variables={variables} setters={setters} actions={actions} /> : null }
                    <ListComponent variables={variables} setters={setters} />
                   
                    <Modal
                        isOpen={TaskModalNotHidden}
                        onRequestClose={taskModalHidden}
                        contentLabel="Task Modal"
                        style={modalStyle}
                    >
                        <InputTaskModal variables={variables} setters={setters} actions={actions} />                
                    </Modal>

                    <Modal
                        isOpen={ListModalNotHidden}
                        onRequestClose={listModalHidden}
                        contentLabel="List Modal"
                        style={modalStyle}
                    >
                        <InputListModal variables={variables} setters={setters} actions={actions} />
                    </Modal>
                </div>
            </DragDropContext>
        </div>
    );
};

export default App;