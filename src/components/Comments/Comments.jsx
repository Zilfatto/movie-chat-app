import React, { useState } from 'react';
import { Modal } from 'antd';
import CommentsModalView from './views/CommentsModalView'

function Comments({visible, ...restProps}) {
    // For comment input field
    const [commentInputValue, setCommentInputValue] = useState('');

    // Handle comment input field value change
    function handleCommentInputChange(event) {
        setCommentInputValue(event.target.value);
    }

    // Add a new comment
    function handleCommentSend() {
        // In case if a comments is empty just ignore this sending
        if (!commentInputValue) {
            return;
        }

        const { onMovieCommentAdd, movie } = restProps;
        // Update movie comments
        onMovieCommentAdd({content: commentInputValue}, movie.id);

        // Clear out an input filed for a new comment
        setCommentInputValue('');
    }

    return (
        <Modal
            visible={visible}
            centered
            modalRender={() => (
                <CommentsModalView
                    {...restProps}
                    commentInputValue={commentInputValue}
                    onCommentInputChange={handleCommentInputChange}
                    onCommentSend={handleCommentSend}
                />
            )}
        />
    );
}

export default Comments;