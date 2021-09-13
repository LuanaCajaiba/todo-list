import React, { Component } from 'react';
import PropTypes from 'prop-types';
import generators from '../lib/generators';
import '../styles/AddTask.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';

export default class AddTask extends Component{
  constructor(){
    super();

    this.initialState = {
      id: 0,
      title: '',
      hasFinished: false,      
    };

    this.state = this.initialState;

    //  forma de resolver o bug do setstate
    this.handleInput = this.handleInput.bind(this);  
    this.handleSubmit = this.handleSubmit.bind(this);
  } 

  //    função que usa o set state para alterar o título
  handleInput(event){
    const { randomId } = generators;
    this.setState({
      id: randomId(99999999999999),
      title: event.target.value,
    });
  }

  handleSubmit(event){
    event.preventDefault();
    const { onCreate } = this.props;
    const { id } = this.state;
    if (id > 0) {
      onCreate(this.state);
      this.setState(this.initialState);
    }
  }

  render(){
    const { title } = this.state;
    return (
      <section className="add-task container">  
        <header>
          <h2> Adicione uma tarefa</h2>
        </header>
        <div className="input-task">
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={title} onChange={this.handleInput} />
            <Button as="input" type="submit" value="enviar" />
            <div className="tasks">
            </div>
          </form>  
        </div>
      </section>         
    );

  }
}

//  Tipagem da propriedade do componente
AddTask.propTypes = {
  onCreate: PropTypes.func,
}.isrequired;