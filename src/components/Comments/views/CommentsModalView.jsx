import React from 'react';
import { Input, Button } from 'antd';
import { SendOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import './CommentsModalView.scss';

function CommentsModalView(props) {
    return (
        <div className={'Comments-view'}>
            <section className='Comments-view__header'>
                <button
                    type='button'
                    onClick={props.onModalClose}
                    className='Comments-view__return-btn'
                >
                    <ArrowLeftOutlined />
                </button>
                <p className='Comments-view__header-text'>{props.title}</p>
            </section>
            <section className='Comments-view__container'>
                {props.comments.map(comment => (
                    <div key={comment.id} className='Comment'>
                        <span className='Comment__user-icon'></span>
                        <p className='Comment__content'>{comment.content}</p>
                    </div>
                ))}
            </section>
            <section className='Comments-view__footer'>
                <Input
                    className='Comments-view__input'
                    bordered={false}
                    placeholder={'Type smth ...'}
                    value={props.commentInputValue}
                    onChange={props.onCommentInputChange}
                />
                <Button
                    loading={props.commentsAreLoading}
                    className='Send-btn'
                    onClick={props.onCommentAdd}
                >
                    <SendOutlined />
                </Button>
            </section>
        </div>
    );
}

export default CommentsModalView;