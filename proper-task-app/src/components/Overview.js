import React, { Component } from "react"

class Overview extends Component {
  //   constructor(props) {
  //     super(props)
  //   }

  render() {
    const { tasks, clickDelete, clickEdit, onTodoTextEdit, clickResubmit } =
      this.props

    const handleEditText = (e, task) => {
      const newText = e.target.value
      onTodoTextEdit(task, newText)
    }

    return (
      <div>
        <h1>Task List</h1>
        <ul>
          {tasks.map((task) => {
            return (
              <div key={task.id}>
                <li>
                  <div className="task-num">{task.num}.</div>
                  <div className="task-text">
                    {task.beingEdited ? (
                      <input
                        type="text"
                        value={task.text}
                        onChange={(e) => handleEditText(e, task)}
                      />
                    ) : (
                      task.text
                    )}
                  </div>
                </li>
                <button
                  onClick={() => {
                    clickDelete(task)
                  }}
                >
                  Delete number {task.num}
                </button>
                <button
                  className="edit"
                  onClick={
                    task.beingEdited
                      ? () => {
                          clickResubmit(task)
                        }
                      : () => clickEdit(task)
                  }
                >
                  {task.beingEdited
                    ? "Resubmit Task"
                    : `Edit number ${task.num}`}
                </button>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default Overview
