import React, { Component } from 'react';
import AddTask from './components/AddTask';
import Task from './components/Task';

class App extends Component {
  constructor(){
    super();

    this.state = {
      tasks: [],
    };

    //  forma de resolver o bug (this is undefined)
    //  a função é igual a ela mesma conectada ao this
    this.createTask = this.createTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  componentDidMount() {
    this.loadTasksFromLocalStorage();
  }

  loadTasksFromLocalStorage() {
    let localStorageTasks = localStorage.getItem('tasks');

    if (localStorageTasks){
      localStorageTasks = JSON.parse(localStorageTasks);
      this.setState({
        tasks: localStorageTasks,
      });
    }
  }

  createTask(newTask){
    const { tasks } = this.state;
    const updatedTasks = [...tasks, newTask];
    this.setState({
      tasks: updatedTasks, 
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  updateTask(updatedTask){
    const { tasks } = this.state;
    const updatedTasks = tasks.map((task) => {
      const taskToUpdate = task;
      if (taskToUpdate.id === updatedTask.id){
        taskToUpdate.hasFinished = updatedTask.hasFinished;
      }
      return taskToUpdate;
    });
    this.setState({
      tasks: updatedTasks,
    });

    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  }

  removeTask(id) {
    const { tasks } = this.state;
    const updateTasks = tasks.filter((task) => task.id !== id);
    this.setState({
      tasks: updateTasks,
    });

    localStorage.setItem('tasks', JSON.stringify(updateTasks));
  }

  editTask(id){
    const { tasks } = this.state;
    const updateTasks = tasks.find((task) => task.id === id);
    this.setState({
      tasks: updateTasks,
    });

    localStorage.setItem('tasks', JSON.stringify(updateTasks));
  }

  render(){ 
    const { tasks } = this.state;
    return (
      <>
        <AddTask onCreate={this.createTask} /> 
        { tasks.map((task) => (
          <Task 
            key={task.id} 
            data={task}
            onUpdate={this.updateTask}
            onRemove={this.removeTask}
            onEdit={this.editTask}
            hasFinished={task.hasFinished} 
          />
        )) }
      </>
    );
  } 
}

export default App;
