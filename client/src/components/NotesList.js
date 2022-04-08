import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "./Loader";
import {Link} from "react-router-dom";

export const NotesList = () => {
  const [notes, setNotes] = useState([]);
  const [offset, setOffset] = useState('');
  const [limit, setLimit] = useState('');
  const {loading, request} = useHttp();
  const {token} = useContext(AuthContext);

  const fetchedNotes = useCallback(async () => {
    try {
      const fetched = await request('/api/notes', 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setNotes(fetched.notes);
    } catch (e) {

    }
  }, [token, request]);

  const fetchedNotesLimit = async () => {
    try {
      const fetched = await request(`/api/notes?offset=${offset}&limit=${limit}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      });
      setNotes(fetched.notes);
      setOffset('');
      setLimit('');
    } catch (e) {

    }
  };

  useEffect(() => {
    fetchedNotes();
  }, [fetchedNotes]);

  if (loading) {
    return (
      <div className="row">
        <div className="col s12">
          <Loader/>
        </div>
      </div>
    )
  }

  if (!notes.length) {
    return (
      <div className="row">
        <div className="col s12">
          <h2 className="center-align">No Notes!</h2>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className="row">
        <div className="input-field col s2">
          <input id="offset"
                 type="text"
                 value={offset}
                 onChange={(e) => setOffset(e.target.value)}
                 className="validate"/>
          <label htmlFor="offset">Offset</label>
        </div>
        <div className="input-field col s2">
          <input id="limit"
                 type="text"
                 value={limit}
                 onChange={(e) => setLimit(e.target.value)}
                 className="validate"/>
          <label htmlFor="limit">Limit</label>
        </div>
        <button className="btn deep-orange darken-1 col s2" onClick={fetchedNotesLimit}>
          get limit notes
        </button>
      </div>
      <table>
        <thead>
        <tr>
          <th>№</th>
          <th>Text</th>
          <th>Completed</th>
          <th>ID</th>
          <th>Created Date</th>
          <th>Action</th>
        </tr>
        </thead>

        <tbody>
        {notes.map((note, index) => {
          return (
            <tr key={note._id}>
              <td><strong>{index + 1}</strong></td>
              <td>{note.text}</td>
              <td>
                {note.completed
                  ? <i className="material-icons">check_box</i>
                  : <i className="material-icons">check_box_outline_blank</i>
                }
              </td>
              <td>{note._id}</td>
              <td>{`${new Date(note.createdDate).toLocaleDateString()} ${new Date(note.createdDate).toLocaleTimeString()}`}</td>
              <td>
                <Link className="btn blue darken-4" to={`/api/notes/${note._id}`}>Open</Link>
              </td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  );
};
