import React, {useContext, useEffect, useState} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import {NotesList} from "../components/NotesList";
import {useMessage} from "../hooks/message.hook";

export const NotesPage = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const {request} = useHttp();
  const [noteValue, setNoteValue] = useState('');
  const message = useMessage();

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const createNote = async (event) => {
    event.preventDefault();

    try {
      const data = await request('/api/notes', 'POST', {text: noteValue}, {
        Authorization: `Bearer ${auth.token}`
      });

      navigate(`/api/notes/${data.note._id}`);

    } catch (e) {
      message(e.message);
    }
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card horizontal">
          <div className="card-stacked">
            <div className="card-content">
              <h5 className="header">Create Note</h5>
              <div className="input-field col s12">
                <input id="createNote"
                       type="text"
                       value={noteValue}
                       onChange={(e) => setNoteValue(e.target.value)}
                       className="validate"/>
                <label htmlFor="createNote">New Note</label>
              </div>
            </div>
            <div className="card-action">
              <a href="/"
                 className="btn green darken-1"
                 onClick={createNote}
              >Create</a>
            </div>
          </div>
        </div>
      </div>
      <NotesList/>
    </div>
  )
};