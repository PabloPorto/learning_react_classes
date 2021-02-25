import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
      persons: [
          {id: 'something 1',name: "Pablo", age: 27},
          {id: '2',name: "Lucas", age: 22},
          {id: '3',name: "Amanda", age: 19}
      ],
      otherState: "some other value",
      showPersons: false
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex] //Making a copy of the original array to not manipulate the original Object
    }

    person.name = event.target.value;

    const persons = {...this.state.persons};
    persons[personIndex] = person;


      this.setState({
          persons: persons,
      })
  }

  deletePersonHandler = (personIndex) => {
    //const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1);
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    };

    let persons = null;

    if( this.state.showPersons ) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              click={() => this.deletePersonHandler(index)}
              name = {person.name}
              age = {person.age}
              key = {person.id}
              change ={(event) => this.nameChangeHandler(event, person.id)} />
          })}
        </div> 
      ) 
    }

    return (

      <div className="App">
        <h1>React complete Guide.</h1>
        <p>Here it is an example of a paragraph inside a component</p>
        <button 
          style = {style}
          onClick={this.togglePersonsHandler}>Switch Name</button>
        {persons}
      </div>
    );
  }
}

export default App;
