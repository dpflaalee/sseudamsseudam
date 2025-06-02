import React, { useCallback,useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

const PostImages = ({images}) => {
  if (!images || images.length === 0) {
    return null; // 이미지가 없으면 아무것도 렌더링 안 함
  }

  if (images.length === 1 && images[0]?.src) {  
    return (
    <>
          <img role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} />
        </>
      );
  }
  if (images.length === 2 && images[0]?.src && images[1]?.src) {
    return (
      <>
        <img role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} 
             style={{ width:'50%', display:'inline-block' }} />
        <img role="presentation" src={`http://localhost:3065/${images[1].src}`} alt={images[1].src}
             style={{ width:'50%', display:'inline-block' }} />
      </>
    ); 
  }   
  return (
    <>
      <div>
        <img role="presentation" src={`http://localhost:3065/${images[0].src}`} alt={images[0].src} width="50%" />
        <div role="presentation"
             style={{display:'inline-block' , width:'50%', textAlign:'center', verticalAlign:'middle'}}
        >
          <PlusOutlined />
          <br/>
          {images.length-1} 개의 사진 더보기
        </div>
      </div>
    </>
  );
};

PostImages.propTypes = {
 // images : PropTypes.arrayOf(PropTypes.object).isRequired
 images : PropTypes.arrayOf(PropTypes.shape({
  src: PropTypes.string
 })).isRequired
};
export default PostImages;