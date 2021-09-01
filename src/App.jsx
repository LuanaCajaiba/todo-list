import React, { Component } from 'react';
import AddTask from './components/AddTask';

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

  createTask(event, newTask){
    event.preventDefault();
    const { tasks } = this.state;
    this.setState({
      tasks: [...tasks, newTask], 
    });
  }

  render(){ 
    return (

      <AddTask onCreate={this.createTask} /> 
    );
  } 
}

export default App;
