import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from "uuid";

type ToDoListType = {
    id: string
    title: string
}
type TaskStateType = {
[key:string]:DataType
    }
type DataType = {
    data: TasksType[]
    filter: FilterValuesType
}
type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed" | '3 tasks';

function App() {
    let toDoLists1 = v1()
    let toDoLists2 = v1()
    let [toDoLists, setToDoLists] = useState<ToDoListType[]>([
        {id: toDoLists1, title: 'What to learn'},
        {id: toDoLists2, title: 'What to drink'}
    ])
    let [tasks, setTasks] = useState<TaskStateType>({
        [toDoLists1]: {
            data: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "ReactJS", isDone: false},
                {id: v1(), title: "Rest API", isDone: false},
                {id: v1(), title: "GraphQL", isDone: false},
            ],
            filter: 'all'
        },
        [toDoLists2]: {
            data: [
                {id: v1(), title: "Whiskey", isDone: true},
                {id: v1(), title: "Cola", isDone: true},
                {id: v1(), title: "Sprite", isDone: false},
                {id: v1(), title: "Fanta", isDone: false},
                {id: v1(), title: "Beer", isDone: false},
            ],
            filter: 'all'
        }
    });

    function removeTask(todoListId: string, taskId: string) {
        setTasks( {...tasks,
            [todoListId]:{...tasks[todoListId],
                data: tasks[todoListId].data.filter(el=>el.id !== taskId)}})
    }
    function deleteAllTasks(todoListId: string) {
         setTasks({
             ...tasks,
                [todoListId]:{...tasks[todoListId],
                    data: tasks[todoListId].data.filter(el=>!el)}})
    }
    function addTask(todoListId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false}
        setTasks({
            ...tasks,
                [todoListId]:{...tasks[todoListId],
                    data: [...tasks[todoListId].data, newTask]}})
    }
    const changeCheckBox = (todoListId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
                [todoListId]:{...tasks[todoListId],
                    data: [...tasks[todoListId].data.map(el=>el.id == taskId ? {...el, isDone: isDone} : el)]}})
    }
    function changeFilter(todoListId: string, value: FilterValuesType) {
        setTasks({...tasks, [todoListId]:{...tasks[todoListId], filter: value}})
    }
    const deleteTodolist = (todoListId: string) => {
        setToDoLists(toDoLists.filter(el => el.id !== todoListId))
        console.log(tasks)
     delete tasks[todoListId]

    }

    return (
        <div className="App">
            {toDoLists.map((list) => {
                let tasksForTodolist = tasks[list.id].data;
                if (tasks[list.id].filter === "active") {
                     tasksForTodolist = tasksForTodolist.filter(t => !t.isDone);
                }
                if (tasks[list.id].filter === "completed") {
                     tasksForTodolist = tasksForTodolist.filter(t => t.isDone);
                }
                if (tasks[list.id].filter == '3 tasks') {
                     tasksForTodolist = tasksForTodolist.filter((el, index) => index < 3 ? el == el : '')
                }
                return (
                    <Todolist title={list.title}
                              key={list.id}
                              todoListId={list.id}
                              filter={tasks[list.id].filter}
                              tasks={tasksForTodolist}
                              deleteTodolist={deleteTodolist}
                              removeTask={removeTask}
                              addTask={addTask}
                              changeCheckBox={changeCheckBox}
                              deleteAllTasks={deleteAllTasks}
                              changeFilter={changeFilter}
                    />
                )
            })}
        </div>
    );
}

export default App;


//-------------------------------------------------------------------------

// import React, {useState} from 'react';
// import './App.css';
// import {Todolist} from './Todolist';
//
//
// export type FilterValuesType = "all" | "active" | "completed" | "three";
//
// function App() {
//
//     let [tasks, setTasks] = useState([
//         {id: 1, title: "HTML&CSS", isDone: true},
//         {id: 2, title: "JS", isDone: true},
//         {id: 3, title: "ReactJS", isDone: false},
//         {id: 4, title: "Rest API", isDone: false},
//         {id: 5, title: "GraphQL", isDone: false},
//     ]);
//
//     const deleteAllTasks = () => {
//         setTasks([])
//     }
//
//     function removeTask(id: number) {
//         let filteredTasks = tasks.filter(t => t.id != id);
//         setTasks(filteredTasks);
//     }
//
//     // let [filter, setFilter] = useState<FilterValuesType>("all");
//     //
//     // let tasksForTodolist = tasks;
//     //
//     // if (filter === "active") {
//     //     tasksForTodolist = tasks.filter(t => t.isDone === false);
//     // }
//     // if (filter === "completed") {
//     //     tasksForTodolist = tasks.filter(t => t.isDone === true);
//     // }
//     //
//     // function changeFilter(value: FilterValuesType) {
//     //     setFilter(value);
//     // }
//
//     return (
//         <div className="App">
//             <Todolist
//                 title="What to learn"
//                 tasks={tasks}
//                 removeTask={removeTask}
//                 //changeFilter={changeFilter}
//                 deleteAllTasks={deleteAllTasks}
//
//             />
//         </div>
//     );
// }
//
// export default App;