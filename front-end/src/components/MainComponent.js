import React, { useEffect, useState } from "react";
import "./MainComponent.css";
import axios from "axios";


const MainSubComponent = () => {
    const [StickyNotes, setStickyNotes] = useState([]);
    useEffect(() => {
        const callTodos = async () => {
            try {
                const response = await axios("https://mobily-1.onrender.com/api/v1");
                if (response.status === 200 || response.status === 201) {
                    setStickyNotes(response?.data.todos)
                } else {
                    throw new Error("Failed to login");
                }
            } catch (error) {
                console.log(error);
            }
        };
        callTodos();
    },[])

	return (
		<>
            <div className='container-note'>
                {StickyNotes && StickyNotes.length > 0 && (
                    <h3>
                        Todo List:
                    </h3>
                )}
                <div className='item-notes'>
                    {StickyNotes && StickyNotes.length > 0 ? (
                        StickyNotes.map(
                            (note) =>
                                note.title && (
                                    
                                        <div className="item-note" key={note._id}>
                                                <div className='item-note-title'>
                                                    <label className='item-title'>{note.title}</label>
                                                </div>
                                                <label className='item-descr'>{note.description}</label>
                                                <div className='item-actions'>
                                                <div className='item-actions-right'>
                                                    <label className='item-actions-date'>Created on {note.dueDate}</label>
                                                </div>
                                            </div>
                                        </div>
                                     
                                )
                        )
                    ) : (
                        <h1 className='empty-label'>
                            Nothing is created yet. Please add sticky note.
                        </h1>
                    )}
                </div>
                <div className='space-4rem'></div>
            </div>

		</>
	);
};

export default MainSubComponent;