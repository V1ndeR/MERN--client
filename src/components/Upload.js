import React, { useContext, useState } from 'react'
import Navbar from "./UI/Navbar";
import Box from "@mui/material/Box";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Button from "@mui/material/Button";
import FileInput from "./UI/FileInput";

const Upload = () => {
    const auth = useContext(AuthContext);
    const { token, userId } = auth;
    const [ files, setFiles ] = useState(null);
    const [ success, setSuccess] = useState(false);
    const [ input, setInput ] = useState('');
    const [disableSubmit, setDisableSubmit] = useState(true);

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
            .catch(e => console.log(e))
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
                    backgroundColor: '#2E3B55',
                    border: '1px solid black',
                    borderRadius: '5px'
                }}>
                    <form
                        style={{ display: 'flex', margin: '0 auto', flexDirection: 'column', padding: '20px 0' }}
                        onSubmit={handleSubmit}
                    >
                        <input
                            style={{ color: 'white' }}
                            name="file"
                            type="file"
                            accept="image/png, image/jpg, image/jpeg, video/mp4, video/x-m4v, video/*"
                            onChange={e => setFiles(e.target.files[0])}
                        />
                        <div>
                            <h3 style={{ color: "white" }}>Описание</h3>
                            <textarea
                                onChange={event => setInput(event.target.value)}
                                style={{ minWidth: 300, maxWidth: 300, maxHeight: 300, minHeight: 300}}/>
                        </div>
                        <Button
                            disabled={!files || input.length >= 538 ? disableSubmit : !disableSubmit}
                            type="submit"
                            sx={{ my: 2,
                                color: 'white',
                                display: 'block',
                                border: '1px solid white',
                                marginTop: 5
                            }}
                        >
                            Создать пост
                        </Button>
                        {
                            input.length >= 538 && <h4 style={{color: 'orange'}}>Описание не может быть больше чем 538 символов</h4>
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
                    <div style={{ height: '100px'}}><h1>Пост создан</h1></div>
                </Box>
            }
        </>
    )
}

export default Upload;