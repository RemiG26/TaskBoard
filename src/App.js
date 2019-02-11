import React, { Component } from 'react';
import Navbar from './Navbar'
import TaskManager from './TaskManager'

class App extends Component {

  constructor(props)
  {
    super(props)
    this.state = {
      tm: new TaskManager()
    }
  }

  render() {
    return (
        <div>
          <Navbar/>
        </div>
    );
  }
}

export default App;
