import React from 'react';

const Post = ({value}) => {
    return (
        <div
             style={{
                 display: 'flex',
                 justifyContent: 'flex-start',
                 alignItems: 'flex-start',
                 flexDirection: 'column',
                 margin: '20px auto',
                 background: '#22272b',
                 maxWidth: 600,
                 height: 600,
                 border: '1px solid #6c7073',
                 borderRadius: '5px',
                 color: '#babfbf'
             }}>
            <div style={{paddingLeft: 20, paddingBottom: 20}}><h4>{value.createdBy}</h4></div>
            <img style={{ maxWidth: 600, height: 400}} src={`http://localhost:5000/api/images/img/${value.image}`} alt=""/>
        </div>
    );
};

export default Post;