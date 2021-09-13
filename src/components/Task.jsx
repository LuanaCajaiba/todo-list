import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/Task.css';

export default class Task extends Component{
  constructor(props){
    super(props);

    const { data } = this.props; 
    this.state = {
      id: data.id,
      hasFinished: false,
    };
    this.handleCheckbox = this.handleCheckbox.bind(this);
  }

  handleCheckbox(event){
    const { onUpdate } = this.props;
    const currentState = this.state;
    this.setState({
      hasFinished: event.target.checked,
    });

    onUpdate({
      ...currentState,
      hasFinished: event.target.checked,
    });
  }

  render() {
    const { 
      data, 
      onRemove, 
      onEdit,  
      hasFinished, 
    } = this.props;
    const { id, title } = data;
    return (
      <section className="add-task container">  
        <div className="tasks">
          <input type="checkbox" onChange={this.handleCheckbox} checked={hasFinished} />
          {title}
          <button type="button" onClick={() => onRemove(id)}>Remover</button>
          <button type="button" onClick={() => onEdit(id)}>Editar</button>
        </div>
      </section>
    );
  }
}

Task.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
  }),
  onRemove: PropTypes.func,
  onUpdate: PropTypes.func,
  onEdit: PropTypes.func,
  hasFinished: PropTypes.bool,
}.isRequired;