import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) =>{
    const notesInitial = [
        {
          "_id": "64b8ff5531527cab418b8baf",
          "user": "64b8dd06bfe56f27373057a3",
          "title": "home work",
          "description": "to be done",
          "tag": "general",
          "date": "2023-07-20T09:33:09.154Z",
          "__v": 0
        },
        {
          "_id": "64ba9ed741b2ea01780c0781",
          "user": "64b8dd06bfe56f27373057a3",
          "title": "maaaaa",
          "description": "to be done",
          "tag": "general",
          "date": "2023-07-21T15:05:59.942Z",
          "__v": 0
        },
        {
          "_id": "64baa1f388ef7e72edcfc1bd",
          "user": "64b8dd06bfe56f27373057a3",
          "title": "maaaaa",
          "description": "to be done",
          "tag": "general",
          "date": "2023-07-21T15:19:15.425Z",
          "__v": 0
        }
      ]
      const [notes,setNotes] = useState(notesInitial)
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;