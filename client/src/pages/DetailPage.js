import React, {useCallback, useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {NoteCard} from "../components/NoteCard";
import {useMessage} from "../hooks/message.hook";

export const DetailPage = () => {
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [noteValue, setNoteValue] = useState(null);
  const noteId = useParams().id;
  const navigate = useNavigate();
  const [updatedValue, setUpdatedValue] = useState('');
  const message = useMessage();
  const [warning, setWarning] = useState('');

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const getNote = useCallback(async () => {
    try {
      const fetched = await request(`/api/notes/${noteId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setNoteValue(fetched.note);
    } catch (e) {
      message(e.message, 'message_error');
      setWarning(e.message);
      setNoteValue(null);
    }
  }, [token, noteId, request]);

  useEffect(() => {
    getNote()
  }, [getNote]);

  const removeNote = useCallback(async () => {
    try {
      const fetched = await request(`/api/notes/${noteId}`, 'DELETE', null, {
        Authorization: `Bearer ${token}`
      });
      navigate(`/api/notes`);
      message(fetched.message);
    } catch (e) {
      message(e.message, 'message_error');
    }
  }, [token, noteId, request]);

  const editNote = async (event) => {
    event.preventDefault();
    try {
      const fetched = await request(`/api/notes/${noteId}`, 'PATCH', null, {
        Authorization: `Bearer ${token}`
      });
      setNoteValue({...noteValue, completed: !noteValue.completed});
      // navigate(`/api/notes`);
      message(fetched.message);
    } catch (e) {
      message(e.message, 'message_error');
    }
  };

  const startEditNote = () => {
    setUpdatedValue(noteValue.text);
  };

  const updateNote = async () => {
    if (!updatedValue.trim()) {
      return message('Input value is empty!');
    }

    if (noteValue.text.trim() === updatedValue.trim()) {
      return message('You should change value!');
    }

    try {
      const fetched = await request(`/api/notes/${noteId}`, 'PUT', {text: updatedValue}, {
        Authorization: `Bearer ${token}`
      });
      setNoteValue({...noteValue, text: updatedValue});
      setUpdatedValue('');
      // navigate(`/api/notes`);
      message(fetched.message);
    } catch (e) {
      message(e.message, 'message_error');
    }
  };

  const openPopup = (link, e) => {
    e.preventDefault();
    window.open(link, 'newwindow', 'width=300, height=250');
  };

  // if (loading) {
  //   return <Loader/>
  // }

  return (
      <div className="row">
        {/*{!noteValue && navigate(`/api/notes`)}*/}
        {!noteValue &&
            <div className="row">
              <h6 className="col s6 offset-s3 center-align">{warning}</h6>
            </div>
        }

        {/* {!loading && noteValue && <NoteCard noteValue={noteValue}
                                          removeNote={removeNote}
                                          editNote={editNote}
                                          updateNote={updateNote}
                                          startEditNote={startEditNote}
      />} */}

        {noteValue && <NoteCard noteValue={noteValue}
                                removeNote={removeNote}
                                editNote={editNote}
                                updateNote={updateNote}
                                startEditNote={startEditNote}
        />

        }

        <div className="input-field col s6 offset-s3">
          <input id="updatedValue"
                 type="text"
                 value={updatedValue}
                 onChange={(e) => setUpdatedValue(e.target.value)}
                 className="validate"/>
          <label htmlFor="updatedValue">New Value</label>
        </div>
      </div>
  )
};
