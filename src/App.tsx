import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./todoList";


export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    const title: string = 'What to learn'

    const [tasks, setTasks] = useState<TaskType[]>(
        [{id: 1, title: "HTML&CSS", isDone: true},
            {id: 2, title: "JS/ES6/TS", isDone: true},
            {id: 3, title: "REACT", isDone: true},
            {id: 4, title: "REDUX", isDone: false},
        ])


    const removeTask = (taskId: number) => {
        const updateTasks = tasks.filter(t => t.id !== taskId)
          setTasks(updateTasks)

    }


    const [filter, setFilter] = useState<FilterValuesType>('all')
    const changerFilter = (filter: FilterValuesType) => {setFilter(filter)}

    const getFilteredTasks = (task: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
        switch (filter) {
            case 'completed':
                return task.filter(t => !t.isDone)
            case 'active':
                return task.filter(t => t.isDone)
            default:
                return task
        }

    }



    return (
        <div className="App">
            <TodoList title={title}
                      tasks={getFilteredTasks(tasks,filter)}
                      removeTask={removeTask}
                      changerFilter={changerFilter}/>


        </div>
    );
}


export default App;
