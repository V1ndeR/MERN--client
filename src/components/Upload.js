import React, { useContext, useState } from 'react'
import Navbar from "./UI/Navbar";
import Box from "@mui/material/Box";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Button from "@mui/material/Button";

import './Upload.css'

const Upload = () => {
    const auth = useContext(AuthContext);
    const { token, userId } = auth;
    const [ files, setFiles ] = useState(null);
    const [ success, setSuccess] = useState(false);
    const [ input, setInput ] = useState('');
    const [ disableSubmit, setDisableSubmit ] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData()
        data.append('file', files)
        data.append('creatorUserId', userId)
        data.append('createdDate', Date.now().toString())
        data.append('postText', input)

        axios.post('/api/files/upload', data, {
            headers: {
                'Content-Type': `multipart/form-data;`,
                'Authorization' : `Bearer ${token}`
            }
        }).then(() => setSuccess(true))
            .catch(e => console.error(e.message))
    }

    return (
        <>
            <Navbar/>
            {!success ?
                <Box sx={{
                    width: '100%',
                    maxWidth: 500,
                    display: 'flex',
                    margin: '20px auto',
                    backgroundColor: '#22272b',
                    border: '1px solid #6c7073',
                    borderRadius: '5px'
                }}>
                    <form
                        style={{ display: 'flex', margin: '0 auto', flexDirection: 'column', padding: '20px 0' }}
                        onSubmit={handleSubmit}
                    >
                        <div className="input-file-container">
                            <input
                                className="input-file"
                                id="my-file"
                                type="file"
                                accept="image/png, image/jpg, image/jpeg, video/mp4, video/x-m4v, video/*"
                                onChange={e => setFiles(e.target.files[0])}
                            />
                                <label tabIndex="0" htmlFor="my-file" className="input-file-trigger">
                                    Select a file...
                                </label>
                        </div>
                        <p className="file-return"></p>
                        {
                            !files
                            ?
                                <h4 style={{display: 'flex', justifyContent: 'center', color: 'white'}}>File not selected</h4>
                                :
                                <h4 style={{display: 'flex', justifyContent: 'center', color: 'white', maxWidth: 300 }}>{files.name}</h4>
                        }
                        <div>
                            <h3 style={{ display: 'flex', justifyContent: 'center', color: "white" }}>Post description</h3>
                            <textarea
                                onChange={event => setInput(event.target.value)}
                                style={{ minWidth: 300, maxWidth: 300, maxHeight: 300, minHeight: 300, borderRadius: 5}}/>
                        </div>
                        <Button
                            disabled={!files || input.length >= 538 ? disableSubmit : !disableSubmit}
                            type="submit"
                            sx={{ my: 2,
                                color: '#39D2B4',
                                display: 'block',
                                border: '1px solid #6c7073',
                                marginTop: 5,
                                ":disabled" : {
                                color: '#6c7073'
                                }
                            }}
                        >
                            Create post
                        </Button>
                        {
                            input.length >= 538 && <h4 style={{color: 'orange', maxWidth: 300}}>Description cannot be more than 538 characters</h4>
                        }
                    </form>
                </Box>
            :
                <Box sx={{
                    width: '100%',
                    maxWidth: 500,
                    display: 'flex',
                    margin: '20px auto',
                    justifyContent: 'center',
                    backgroundColor: '#2E3B55',
                    color: '#babfbf',
                    border: '1px solid black',
                    borderRadius: '5px'
                }}>
                    <div style={{ height: '100px'}}><h1>Post created</h1></div>
                </Box>
            }
        </>
    )
}

export default Upload;