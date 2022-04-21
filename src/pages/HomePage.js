import React, {useState, useContext} from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";

export const HomePage = () => {
    const auth = useContext(AuthContext)
    const { token, userId } = auth;
    const [images, setImages] = useState(null)

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const data = new FormData()
            data.append('img', images)
            data.append('userId', userId)

            await axios.post('/api/auth/upload', data, {
                headers: {
                    'Content-Type': `multipart/form-data;`,
                    'Authorization' : `Bearer ${token}`
                }
            })

        } catch (e) {
            console.log(e)
        }
        // const data = new FormData();
        // console.log(images)
        // images.forEach(image => data.append('images', image))
        // data.append('name', JSON.stringify({ name: ''}))

    }

  return (
      <>
        <Navbar/>
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    name="file"
                    type="file"
                    onChange={e => setImages(e.target.files[0])}
                />
                <button type="submit">Upload</button>
            </form>
        </div>
          {/*{images.map((image, idx) => (*/}
          {/*    <img key={idx} src={URL.createObjectURL(image)} height='400px' width='600px'  alt="img"/>*/}
          {/*))}*/}
      </>
  )
}