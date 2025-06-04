import React, { useRef, useState, useCallback } from 'react';
import { Input, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { addAniProfile } from '@/reducers/animal';
import { useRouter } from 'next/router';

const { Option } = Select;

const categoryOptions = [
  { id: 1, name: '강아지' },
  { id: 2, name: '고양이' },
  { id: 3, name: '햄스터' },
  { id: 4, name: '파충류' },
  { id: 5, name: '담수어' },
  { id: 6, name: '해수어' },
  { id: 7, name: '고슴도치' },
];

const AniProfileForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const imageInput = useRef();

  const [form, setForm] = useState({
    aniName: '',
    aniAge: '',
    aniProfile: '',
    previewUrl: '',
    categoryId: null,
  });

  const onClickImageUpload = useCallback(() => {
    imageInput.current?.click();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        aniProfile: reader.result,
        previewUrl: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value) => {
    setForm((prev) => ({
      ...prev,
      categoryId: value,
    }));
  };

  const handleSubmit = () => {
    if (!form.aniProfile) {
      alert('이미지를 업로드하세요!');
      return;
    }
    const payload = {
      aniName: form.aniName,
      aniAge: parseInt(form.aniAge, 10),
      aniProfile: form.aniProfile,
      categoryId: form.categoryId,
    };

    console.log('제출할 데이터',payload);
    dispatch(addAniProfile(payload));
    router.push('/animal/AniProfile');
  };

  return (
    <div style={{
      width: 300,
      margin: 'auto',
      padding: 20,
      border: '1px solid #ddd',
      borderRadius: 10,
      textAlign: 'center',
    }}>
      {form.previewUrl ? (
        <img
          src={form.previewUrl}
          alt="preview"
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: 10,
          }}
        />
      ) : (
        <div style={{
          width: 80,
          height: 80,
          borderRadius: '50%',
          backgroundColor: '#111',
          margin: 'auto',
          marginBottom: 10,
        }} />
      )}

      <Input
        name="aniName"
        value={form.aniName}
        onChange={handleChange}
        placeholder="이름"
        style={{ marginBottom: 10 }}
      />
      <Input
        name="aniAge"
        type="number"
        value={form.aniAge}
        onChange={handleChange}
        placeholder="나이"
        min='0'
        style={{ marginBottom: 10 }}
      />
      <Select
        placeholder="동물 종"
        value={form.categoryId}
        onChange={handleCategoryChange}
        style={{ width: '100%', marginBottom: 10 }}
      >
        {categoryOptions.map((option) => (
          <Option key={option.id} value={option.id}>{option.name}</Option>
        ))}
      </Select>

      <input
        type="file"
        accept="image/*"
        hidden
        ref={imageInput}
        onChange={handleFileChange}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onClickImageUpload}>사진</Button>
        <Button type="primary" onClick={handleSubmit}>프로필 등록하기</Button>
      </div>
    </div>
  );
};

export default AniProfileForm;
