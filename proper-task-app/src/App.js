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
        num: 1,
        beingEdited: false,
      },
    }
  }

  handleChange = (e) => {
    this.setState({
      task: {
        text: e.target.value,
        id: this.state.task.id,
        num: this.state.task.num,
        beingEdited: false,
      },
    })
  }

  onSubmitTask = (e) => {
    e.preventDefault()
    this.setState({
      tasks: this.state.tasks.concat(this.state.task),
      task: {
        text: "",
        id: uniqid(),
        num: this.state.task.num + 1,
        beingEdited: false,
      },
    })
  }

  onClickDelete = (taskToDelete) => {

    this.setState({
      tasks: this.state.tasks.filter((task) => {
        return taskToDelete.id !== task.id
      }),
    })
  }

  onClickEdit = (task) => {
    console.log(task)

    const currentState = this.state

    const nextTasks = []

    for (const existingTask of currentState.tasks) {
      // is this the task we want to edit?
      if (existingTask.id === task.id) {
        existingTask.beingEdited = true
      }

      nextTasks.push(existingTask)
    }

    this.setState({
      tasks: nextTasks,
    })
  }

  onTodoTextEdit = (task, newText) => {
    
    const currentState = this.state

    const nextTasks = []

    for (const existingTask of currentState.tasks) {
      // is this the task we want to edit?
      if (existingTask.id === task.id) {
        existingTask.text = newText
      }

      nextTasks.push(existingTask)
    }

    this.setState({
      tasks: nextTasks,
    })
  }
  
  onClickResubmit = (task) => {
    const currentState = this.state

    const nextTasks = []

    for (const existingTask of currentState.tasks) {
      // is this the task we want to edit?
      if (existingTask.id === task.id) {
        existingTask.beingEdited = false
      }

      nextTasks.push(existingTask)
    }

    this.setState({
      tasks: nextTasks,
    })
  }

  render = () => {
    const { tasks, task } = this.state

    return (
      <div>
        <Overview
          tasks={tasks}
          clickDelete={this.onClickDelete}
          clickEdit={this.onClickEdit}
          onTodoTextEdit={this.onTodoTextEdit}
          clickResubmit={this.onClickResubmit}
        />
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
