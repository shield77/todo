import React, { useState } from 'react';

const Main: React.FC = () => {
    const [tasks, setTasks] = useState<string[]>([]);
    const [taskInput, setTaskInput] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTaskInput(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (taskInput) {
            setTasks([...tasks, taskInput]);
            setTaskInput('');
        }

    };

    const handleDeleteTask = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks.splice(index, 1);
        setTasks(updatedTasks);
    };

    const handleCompleteTask = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks[index] = '✓ ' + updatedTasks[index]; // Префикс для обозначения выполненной задачи
        setTasks(updatedTasks);
    };

    return (
        <div className='Main'>
            <h1>Список задач</h1>
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Новая задача"
                    value={taskInput}
                    onChange={handleInputChange}
                />
                <button type="submit">Добавить</button>
            </form>

            <div className="Do">
                {tasks.map((task, index) => (
                    <div key={index}>
                        <span style={{ textDecoration: task.startsWith('✓ ') ? 'line-through' : 'none', marginRight: 10, color: task.startsWith('✓ ') ? 'green' : 'black', }}>{task}</span>
                        {!task.startsWith('✓ ') && (
                            <button onClick={() => handleCompleteTask(index)}>Выполнено</button>
                        )}
                        <button onClick={() => handleDeleteTask(index)}>Удалить</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Main;
