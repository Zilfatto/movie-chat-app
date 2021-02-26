import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import CommentsModalView from './views/CommentsModalView'
import './Comments.css';

function Comments({visible, ...restProps}) {
    // Comments of a particular movie from the server
    const [comments, setComments] = useState([]);
    // For comment input field
    const [commentValue, setCommentValue] = useState('');

    // Handle comment input field value change
    function handleCommentInputChange(value) {
        setCommentValue(value);
    }

    return (
        <Modal
            visible={visible}
            centered
            modalRender={() => (
                <CommentsModalView
                    {...restProps}
                    commentValue={commentValue}
                    onCommentInputChange={handleCommentInputChange}
                />
                )}
        />
    );
}

export default Comments;