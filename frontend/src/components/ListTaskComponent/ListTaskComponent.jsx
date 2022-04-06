import React from 'react'
import {Table} from "antd"


const ListTaskComponent = ({addTask, deleteTask, editTask, viewTask, tasks, setTest, test}) => {

    const actionsTable = (task) => {
        return (
            <>
                <button onClick={() => editTask(task.id)}
                        className="btn btn-info">Редактировать
                </button>
                <button onClick={() => {
                    deleteTask(task.id)
                    setTest(test + 1)
                }}
                        className="btn btn-danger" style={{marginLeft: "10px"}}>Удалить
                </button>
                <button onClick={() => viewTask(task.id)}
                        className="btn btn-info" style={{marginLeft: "10px"}}>Инфо
                </button>
            </>
        )
    }

    const dataSource = tasks.map((task) => ({
        key: task.id,
        task_name: task.task_name,
        accountable: task.accountable,
        performing: task.performing,
        deadline: task.deadline,
        actions: actionsTable(task)
    }))

    const columns = [
        {
            title: 'Название задачи',
            dataIndex: 'task_name',
            key: 'task_name',
        },
        {
            title: 'Ответственный',
            dataIndex: 'accountable',
            key: 'accountable',
        },
        {
            title: 'Исполняющий',
            dataIndex: 'performing',
            key: 'performing',
        },
        {
            title: 'Крайний срок исполнения',
            dataIndex: 'deadline',
            key: 'deadline',
        },
        {
            title: 'Действия',
            dataIndex: 'actions',
            key: 'actions',
        }
    ]

    return (
        <div>
            <h2 className="text-center">Список задач</h2>
            <div className="row">
                <button className="btn btn-primary" onClick={addTask} style={{width: "200px"}}>Добавить задачу
                </button>
            </div>
            <Table dataSource={dataSource} columns={columns} pagination={{pageSize: 7}}/>
        </div>
    )
}

export default ListTaskComponent
