import React, { Component } from "react"
import uniqid from "uniqid"
import Overview from "./components/Overview"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      tasks: [],
      task: {
        text: "",
        id: uniqid(),
      },
    }
  }

  handleChange = (e) => {
    this.setState({
      task: { text: e.target.value, id: this.state.task.id },
    })
  }

  onSubmitTask = (e) => {
    e.preventDefault()
    this.setState({
      tasks: this.state.tasks.concat(this.state.task),
      task: {
        text: "",
        id: uniqid(),
      },
    })
  }

  render() {
    const { tasks, task } = this.state

    return (
      <div>
        <Overview tasks={tasks} />
        <form onSubmit={this.onSubmitTask}>
          <label htmlFor="taskInput">Enter task</label>
          <input
            id="taskInput"
            type="text"
            value={task.text}
            onChange={this.handleChange}
          />
          <button type="submit">Add task</button>
        </form>
      </div>
    )
  }
}

export default App
