import React, { useState, useEffect, useRef, createRef } from "react";
import Navbar from "../components/UI/Navbar";
import axios from "axios";
import Post from "../components/Post";
import { Loader } from "../components/UI/Loader";

export const HomePage = (props) => {
    const { mode } = props;
    const [posts, setPosts] = useState([]);
    const [postPages, setPostPages] = useState(1)
    const [loading, setLoading] = useState(true);
    // const [sortNewPosts, setSortNewPosts] = useState([]);

    const portion = 5;
    const totalPages = Math.ceil(100 / portion);

    const lastItem = createRef();
    const observerLoader = useRef();

    useEffect(() => {
        setPosts([]);
        setPostPages(1);
    }, [mode]);

    useEffect(() => {
        if(posts.length === 0 && postPages === 1) {
            getNextPosts(mode)
        }
    }, [posts, postPages])

    const getNextPosts = (mode) => {
        axios
            .get(`/api/files/${mode}?page=${postPages}&limit=${portion}`)
            .then((res) => {
                setPosts([...posts, ...res.data])
                setPostPages(postPages + 1)
                setLoading(false);
            }).catch(error => console.error(error.message));
    };

    const actionInSight = (entries) => {
        if (entries[0].isIntersecting && postPages <= totalPages) {
            getNextPosts(mode);
        }
    };

    useEffect(() => {
        if (observerLoader.current) {
            observerLoader.current.disconnect();
        }

        observerLoader.current = new IntersectionObserver(actionInSight);
        if (lastItem.current) {
            observerLoader.current.observe(lastItem.current);
        }
    }, [lastItem]);

  return (
      <>
        <Navbar/>
        {
            loading
            ?
            <Loader/>
            :
            <div style={{ padding: '20px', background: '#171c20'}}>
                {posts.map((el, index) => {
                    if (index + 1 === posts.length) {
                        return <Post key={el.createdDate} file={el} ref={lastItem}/>;
                    }
                    return <Post key={el.createdDate} file={el}/>;
                })}
            </div>
        }
      </>
  )
}