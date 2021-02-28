import React, { useState, useEffect } from 'react';
import { entityExists } from '../../utils/common';
import { Modal } from 'antd';
import CommentsModalView from './views/CommentsModalView'

function Comments({visible, ...restProps}) {
    // Comments of a particular movie from the server
    const [comments, setComments] = useState([]);
    // For comment input field
    const [commentInputValue, setCommentInputValue] = useState('');
    const [commentsAreLoading, setCommentsAreLoading] = useState(true);

    // TODO change to actual movie ID
    // Load comments for a particular movie
    useEffect(() => {
        if (!entityExists(restProps.movie?.key)) {
            return;
        }

        // TODO Load comments from firebase
        setTimeout(() => {
            const comments = [
                { id: 1, content: 'I hate it' },
                { id: 2, content: 'Not bad but I wish it was longer. 2h is too short!' },
                { id: 3, content: 'Hello 2' }
            ];
            // Update comments
            setComments(comments);
            // Hide a loader after receiving the data
            setCommentsAreLoading(false);
        }, 2000);

        return () => {
            // Empty the comments of a previously selected movie
            setComments([]);
            // Show a loader during fetching the comments data for a new movie
            setCommentsAreLoading(true);
        }
    }, [restProps.movie?.key]);

    // Handle comment input field value change
    function handleCommentInputChange(event) {
        setCommentInputValue(event.target.value);
    }

    // Add a new comment
    function handleCommentAdd() {
        setComments([...comments, { content: commentInputValue }]);
        setCommentInputValue('');
    }

    return (
        <Modal
            visible={visible}
            centered
            modalRender={() => (
                <CommentsModalView
                    {...restProps}
                    comments={comments}
                    commentsAreLoading={commentsAreLoading}
                    commentInputValue={commentInputValue}
                    onCommentInputChange={handleCommentInputChange}
                    onCommentAdd={handleCommentAdd}
                />
                )}
        />
    );
}

export default Comments;