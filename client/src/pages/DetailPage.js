import React, {useCallback, useContext, useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {NoteCard} from "../components/NoteCard";
import {useMessage} from "../hooks/message.hook";

export const DetailPage = () => {
  const navigate = useNavigate();
  const {token} = useContext(AuthContext);
  const {request, loading} = useHttp();
  const [noteValue, setNoteValue] = useState(null);
  const noteId = useParams().id;
  const [updatedValue, setUpdatedValue] = useState('');
  const message = useMessage();

  useEffect(() => {
    window.M.updateTextFields()
  }, []);

  const getNote = useCallback(async () => {
    try {
      console.log(token);
      const fetched = await request(`/api/notes/${noteId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      });
      setNoteValue(fetched.note);
    } catch (e) {

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
      message(e.message);
    }
  };

  const startEditNote = () => {
    setUpdatedValue(noteValue.text);
  };
  // const editNote = useCallback(async (event) => {
  //   event.preventDefault();
  //   try {
  //     const fetched = await request(`/api/notes/${noteId}`, 'PATCH', null, {
  //       Authorization: `Bearer ${token}`
  //     });
  //     setNoteValue({...noteValue, completed: !noteValue.completed});
  //     console.log(noteValue)
  //     // navigate(`/api/notes`);
  //     window.M.toast({html: fetched.message})
  //   } catch (e) {
  //
  //   }
  // }, [token, noteId, request]);

  const updateNote = async () => {
    if (!updatedValue.trim()) {
      return message('Input value is empty!');
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

    }
  };



  // if (loading) {
  //   return <Loader/>
  // }

  return (
    <div className="row">
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
      />}

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