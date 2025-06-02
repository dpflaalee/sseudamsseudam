import { Input, Space } from 'antd';
import React, { useCallback, useMemo, useState } from 'react';
import SearchResult from './SearchResult';
import userInput from '@/hooks/userInput';
import Router from 'next/router';
import axios from 'axios';
const { Search } = Input;

const SearchForm = () => {
    const [searchInput, setSearchInput] = useState('');
    const [searchResult, setSearchResult] = useState({ post: [], group: [], member: [] });

    const onSearch = useCallback(async () => {
        console.log('🦾 onSearch : ', searchInput);
        try {
            const res = await axios.get(`http://localhost:3065/search/${searchInput}`);
            setSearchResult(res.data);
            console.log('🎯 검색 결과: ', res.data);
        } catch (err) {
            console.error('검색 실패:', err);
        }
    }, [searchInput]);


    const filteredData = useMemo(() => {
        if (!searchInput.trim()) return { post: [], group: [], member: [] };

        const lowerKeyword = searchInput.toLowerCase();
        return {
            post: searchResult.post.filter((item) => item.content?.toLowerCase().includes(lowerKeyword)),
            group: searchResult.group.filter((item) => item.title?.toLowerCase().includes(lowerKeyword)),
            member: searchResult.member.filter((item) => item.nickname?.toLowerCase().includes(lowerKeyword)),
        };
    }, [searchInput, searchResult]);



    return (
        <div>
            <Search
                placeholder="검색하실 단어를 입력해주세요"
                onSearch={onSearch}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{
                    width: '100%',
                }}
            />
            <SearchResult results={filteredData} />
        </div>
    );
};

export default SearchForm;