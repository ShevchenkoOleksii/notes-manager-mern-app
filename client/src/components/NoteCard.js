import React from "react"

export const NoteCard = ({noteValue, removeNote, editNote, updateNote, startEditNote}) => {

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <h5>Your Note:</h5>
              <table>
                <thead>
                <tr>
                  <th>Completed</th>
                  <th>Created Date</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>
                    <a href="/" onClick={editNote}>
                      {noteValue.completed
                        ? <i className="material-icons">check_box</i>
                        : <i className="material-icons">check_box_outline_blank</i>
                      }
                    </a>
                  </td>
                  <td>{`${new Date(noteValue.createdDate).toLocaleDateString()} ${new Date(noteValue.createdDate).toLocaleTimeString()}`}</td>
                </tr>
                </tbody>
              </table>
              <table>
                <thead>
                <tr>
                  <th>Text</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td>{noteValue.text}</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className="card-action">
              <button
                style={{marginRight: 5}}
                className="btn red darken-2 waves-effect waves-purple"
                onClick={removeNote}
              >Delete
              </button>
              <button
                style={{marginRight: 5}}
                className="btn blue darken-2 waves-effect waves-purple"
                onClick={editNote}
              >Change
              </button>
              <button
                style={{marginRight: 5}}
                className="btn green darken-2 waves-effect waves-purple"
                onClick={updateNote}
              >Update
              </button>
              <button
                style={{marginRight: 5}}
                className="btn orange darken-4 waves-effect waves-purple"
                onClick={startEditNote}
              >Edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}