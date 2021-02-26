import React from 'react';
import { Input, Button } from 'antd';
import './CommentsModalView.css';

function CommentsModalView(props) {
    const comments = [
        { id: 1, content: 'I hate it' },
        { id: 2, content: 'Not bad but I wish it was longer. 2h is too short!' },
        { id: 3, content: 'Hello 2' }
    ];

    return (
        <div className={'comments-view'}>
            <section className='comments-header'>
                <button type='button' className='comments-return-btn'>
                    <i className='fas fa-arrow-left'></i>
                </button>
                <p className='comments-header-text'>Pro Comments</p>
            </section>
            <section className='comments-container'>
                {comments.map(comment => (
                    <div key={comment.id} className='comment'>
                        <span className='user-icon'></span>
                        <p className='content'>{comment.content}</p>
                    </div>
                ))}
            </section>
            <section className='comments-footer'>
                <Input className='comment-input' placeholder={'...'} />
                <Button className='comments-send-btn'>
                    <i className='fas fa-angle-double-right'></i>
                </Button>
            </section>
        </div>
    );
}

export default CommentsModalView;