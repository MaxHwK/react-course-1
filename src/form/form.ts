import { FormEvent } from "react";

export interface List {
    id: string;
    title: string;
    tasks: Task[];
}

export interface Task {
    id: string;
    title: string;
    priority: string;
    description: string;
    assignedTo: string;
    completed: boolean;
}

export interface Variables {
    lists: List[];
    listId: string;
    listTitle: string;
    taskId: string;
    taskTitle: string;
    priority: string;
    description: string;
    assignedTo: string;
    completed: boolean;
    sort: string;
    sortList: List[];
}

export interface Setters {
    setLists: (lists: List[]) => void;
    setListId: (id: string) => void;
    setListTitle: (title: string) => void;
    setTaskId: (id: string) => void;
    setTaskTitle: (title: string) => void;
    setPriority: (priority: string) => void;
    setDescription: (description: string) => void;
    setAssignedTo: (assignedTo: string) => void;
    setCompleted: (completed: boolean) => void;
    setSort: (sort: string) => void;
    setSortList: (lists: List[]) => void;
}

export interface Actions {
    newList: (e: FormEvent<HTMLFormElement>) => void;
    newTask: (e: FormEvent<HTMLFormElement>) => void;
    listModal: () => void;
    listModalHidden: () => void;
    taskModal: () => void;
    taskModalHidden: () => void;
}