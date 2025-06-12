import { Avatar, List,Card, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
const FollowList = ({follower}) => {
  console.log('FollowList',follower);
  const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;
  const [data, setData] = useState([]);
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };
  //const {followerList} = useSelector(state => state.user);
  
   useEffect(() => {
     appendData();
   }, []);
  const onScroll = (e) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };
  return (
            <Card>
              <Card.Meta 
                avatar={<Avatar>{follower.username}</Avatar>}
                title={<a href="https://ant.design"></a>}
                description={''}
              />
            </Card>
  );
};
export default FollowList;