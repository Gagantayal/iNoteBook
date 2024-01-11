import React, { useState, useContext, useEffect, useRef } from "react";
import noteContext from "../context/Notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import "bootstrap/dist/css/bootstrap.min.css"
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {useNavigate } from "react-router-dom";

export default function Notes(props) {
  let navigate = useNavigate(); 
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes();
      
    }
    else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, []);
  
  const[note,setNote] = useState({id: "", etitle:"",edescription:"", etag:""})
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const handleClick = (e)=>{
    refClose.current.click();
    editNote(note.id,note.etitle,note.edescription,note.etag)
    // addNote(note.title, note.description, note.tag)
    props.showAlert("updated successfully","success")
  }

  const onChange = (e)=>{
      setNote({...note,[e.target.name]: e.target.value})
  }

  return (
    <div>
      <AddNote showAlert={props.showAlert}/>
      <Button variant="primary" ref={ref} onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!
        <form>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} aria-describedby="emailHelp" onChange={onChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange}/>
              </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button ref={refClose} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="row my-3">
        <h1>Your Note</h1>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </div>
  );
}





