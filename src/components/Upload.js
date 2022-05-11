import React, { useContext, useState } from 'react'
import Navbar from "./UI/Navbar";
import Box from '@mui/material/Box';
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Button from "@mui/material/Button";

const Upload = () => {
    const auth = useContext(AuthContext)
    const { token, userId } = auth;
    const [ images, setImages ] = useState(null)
    const [ success, setSuccess] = useState(false)

    console.log(userId)

    function handleSubmit(e) {
        e.preventDefault();

        const data = new FormData()
        data.append('img', images)
        data.append('creatorUserId', userId)

        axios.post('/api/images/upload', data, {
            headers: {
                'Content-Type': `multipart/form-data;`,
                'Authorization' : `Bearer ${token}`
            }
        }).catch(e => console.log(e))
        setSuccess(true)

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
                            accept="image/png, image/jpg, image/jpeg"
                            onChange={e => setImages(e.target.files[0])}
                        />
                        <Button
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

export default Upload