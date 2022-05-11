import React, {useState, useEffect} from "react";
import Navbar from "../components/UI/Navbar";
import axios from "axios";
import Post from "../components/Post";

export const HomePage = () => {
    const [postInfo, setPostInfo] = useState([])

    useEffect(() => {
        axios.get('/api/images/all')
            .then(res => setPostInfo(res.data))
            .catch(e => console.log(e))
        console.log('TEST')
    }, [])

  return (
      <>
        <Navbar/>
        <div style={{ padding: '20px', background: '#171c20'}}>
            {postInfo.map((el, idx) => (
                <Post key={idx} value={el}/>
            ))}
        </div>
      </>
  )
}