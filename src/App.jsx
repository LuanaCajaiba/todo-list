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
  }

  createTask(newTask){
    const { tasks } = this.state;
    this.setState({
      tasks: [...tasks, newTask], 
    });
  }

  render(){ 
    const { tasks } = this.state;
    return (
      <>
        <AddTask onCreate={this.createTask} /> 
        { tasks.map((task) => (
          <Task key={task.id} data={task} />
        )) }
      </>
    );
  } 
}

export default App;
