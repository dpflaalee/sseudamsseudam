import React, { useState, useCallback, useEffect } from 'react';
import { Card, Avatar, Button, List, Comment, Popover } from 'antd';
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined, RetweetOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import ComplainForm from '../admin/ComplainForm';
import TARGET_TYPE from '../../../shared/constants/TARGET_TYPE';

const PostCard = ({ post }) => {
    //const id = useSelector((state) => state.user.user?.id);
    const [open, setOpen] = useState(false);
    return (
        <div style={{ margin: '3%' }}>
            <Card
                actions={[
                    <RetweetOutlined key="retweet" />,
                    <HeartTwoTone twoToneColor="#f00" key="heart" />,
                    <MessageOutlined key="comment" />,
                    <Popover content={(
                        <Button.Group>
                            <><Button onClick={() => setOpen(true)}>신고하기</Button>
                                <ComplainForm open={open} onClose={() => setOpen(false)} targetType={TARGET_TYPE.POST} /></>

                            {/*{id && id === post.User.id ?
                                (<>
                                    <Button>수정</Button>
                                    <Button type="danger">삭제</Button></>)
                                :
                                (<><Button onClick={() => setOpen(true)}>신고하기</Button>
                                    <ComplainForm open={open} onClose={() => setOpen(false)} targetType={TARGET_TYPE.POST} /></>)
                            }*/}
                        </Button.Group>

                    )}>
                        <EllipsisOutlined />
                    </Popover>
                ]}
            >
                <Card.Meta avatar={<Avatar>{''}</Avatar>}
                    title={''}
                    description={''} />
            </Card>
            {(
                <>
                    {/* 댓글폼 */}
                    {/* 댓글리스트 */}
                    <List
                        header={''}
                        itemLayout='horizontal'
                        dataSource={''}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    avatar={<Avatar></Avatar>}
                                    content={''}
                                    author={''}
                                />
                            </li>
                        )
                        }
                    />
                </>
            )}
        </div>
    );
};

export default PostCard;