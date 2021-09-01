import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class AddTask extends Component{
  constructor(){
    super();

    this.state = {
      title: '',
    };

    //  forma de resolver o bug do setstate
    this.handleInput = this.handleInput.bind(this);  
  } 

  //    função que usa o set state para alterar o título
  handleInput(event){
    this.setState({
      title: event.target.value,
    });
  }

  render(){
    const { title } = this.state;
    const { onCreate } = this.props;
    return (
      <form onSubmit={(event) => onCreate(event, this.state)}>
        <input type="text" value={title} onChange={this.handleInput} />
        <button type="submit"> Adicionar tarefa</button>
      </form>          
    );
  }
}

//  Tipagem da propriedade do componente
AddTask.propTypes = {
  onCreate: PropTypes.func,
}.isrequired;