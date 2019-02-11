export default class TaskManager
{

    constructor()
    {
        this.tasks = []
    }

    addTask(task)
    {
        this.tasks = [...this.tasks, task]
    }

    updateTask(task)
    {
        this.tasks = this.tasks.map(t => t.id === task.id ? task : t)
    }

    removeTask(task)
    {
        this.tasks = this.tasks.filter(t => t.id !== task.id)
    }

}