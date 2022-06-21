import React, {forwardRef} from 'react';

const Post = forwardRef(({file}, ref) => {
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
            }}
            ref={ref}
        >
            <div style={{paddingLeft: 20, paddingBottom: 20}}><h4>{file.createdBy}</h4></div>
            {
                file.type === 'mp4'
                    ?
                    <video width="600" controls>
                        <source src={`http://localhost:5000/api/files/file/${file.file}`}/>
                    </video>
                    :
                    <img style={{ maxWidth: 600, height: 400}} src={`http://localhost:5000/api/files/file/${file.file}`} alt=""/>
            }
            <div style={{ paddingTop: 20, margin: "0 20px" }}>
                {file.postText}
            </div>
        </div>
    );
});

export default Post;