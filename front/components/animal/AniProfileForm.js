import React, { useRef, useState, useCallback } from 'react';
import { Input, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { addAniProfile } from '@/reducers/animal';
import { useRouter } from 'next/router';
import axios from 'axios';

const { Option } = Select;

const categoryOptions = [
  { id: 1, name: '강아지' },
  { id: 2, name: '고양이' },
  { id: 3, name: '햄스터' },
  { id: 4, name: '파충류' },
];

const AniProfileForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const imageInput = useRef();

  const [form, setForm] = useState({
    aniName: '',
    aniAge: '',
    previewUrl: '',
    file: null,
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
        aniProfile: file,
        previewUrl: URL.createObjectURL(file),                     
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

  const handleSubmit = async() => {
    
    const formData = new FormData();
    formData.append('aniName', form.aniName);
    formData.append('aniAge', form.aniAge);
    formData.append('categoryId', form.categoryId);
    formData.append('aniProfile', form.aniProfile); // 파일 전송

    try {
      const res = await axios.post('/animal/animalform', formData); // 서버에 프로필 등록 요청
      const newAnimalId = res.data.id;
      router.push(`/animal/${newAnimalId}`); // 상세 페이지로 이동
    } catch (error) {
      console.error('프로필 등록 중 오류:', error);
      alert('등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <div
      style={{
        width: 300,
        margin: 'auto',
        padding: 20,
        border: '1px solid #ddd',
        borderRadius: 10,
        textAlign: 'center',
      }}
    >
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
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            backgroundColor: '#111',
            margin: 'auto',
            marginBottom: 10,
          }}
        />
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
        min="0"
        style={{ marginBottom: 10 }}
      />
      <Select
        placeholder="동물 종"
        value={form.categoryId}
        onChange={handleCategoryChange}
        style={{ width: '100%', marginBottom: 10 }}
      >
        {categoryOptions.map((option) => (
          <Option key={option.id} value={option.id}>
            {option.name}
          </Option>
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
        <Button type="primary" onClick={handleSubmit}>
          프로필 등록하기
        </Button>
      </div>
    </div>
  );
};

export default AniProfileForm;
