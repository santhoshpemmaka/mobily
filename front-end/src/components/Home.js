import React, {useState} from "react";
import axios from "axios";
import "./Home.css";

import {v4 as uuid} from "uuid";
import { useNavigate } from "react-router-dom";
import MainSubComponent from "./MainComponent";


const Home = () => {
	const navigate = useNavigate();
	const [keepNote, setkeepNote] = useState({
		title: "",
		description: "",
	
	});
    const btnHandler = async() => {
        try {
			const response = await axios.post("https://mobily-1.onrender.com/api/v1", {
                title: keepNote.title,
                description: keepNote.description,
                dueDate : new Date().toLocaleDateString()
			});
			if (response.status === 200 || response.status === 201) {
			} else {
				throw new Error("Failed to login");
			}
		} catch (error) {
            console.log(error);
		}
		setkeepNote({
			title: "",
            description: "",
            data: ""
		});
	};
    return (
        <div className="container-todo">
		    <div className='container'>
                <div
                    className='main-container'
                    style={{
                        backgroundColor: keepNote.noteColor,
                    }}>
                    <div className='input-tags'>
                        <div className='input-tag-container'>
                            <input
                                className='input-tag-title'
                                type='text'
                                placeholder='Title'
                                value={keepNote.title}
                                onChange={(e) =>
                                    setkeepNote((prev) => ({...prev, title: e.target.value}))
                                }
                            />
                            <i
                                className='fas fa-thumbtack thumbtack-icon'
                                style={{
                                    color: `${keepNote.pinned ? "#202135" : "#0000008a"}`,
                                }}
                                onClick={() =>
                                    setkeepNote((prev) => ({...prev, pinned: !prev.pinned}))
                                }></i>
                        </div>

                        <input
                            type='text'
                            value={keepNote.description}
                            placeholder='Take a note...'
                            onChange={(e) =>
                                setkeepNote((prev) => ({...prev, description: e.target.value}))
                            }
                        />
                        
                    </div>
                    <button className='nav-add-button' onClick={() => btnHandler()}>
						Add Note
					</button> 
                </div>
                           
            </div>
        <MainSubComponent/>
        </div>
	);
};

export default Home;