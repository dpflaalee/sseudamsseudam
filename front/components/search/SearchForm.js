import { Input, Space } from 'antd';
import React, { useCallback } from 'react';
import SearchResult from './SearchResult';
import userInput from '@/hooks/userInput';
const { Search } = Input;

const SearchForm = () => {
    const [searchInput, onChangesearchInput] = userInput('');
    const onSearch = useCallback(() => {
        console.log('🦾 onSearch : ', searchInput);
    });

    return (
        <div>
            <Search
                placeholder="input search text"
                onSearch={onSearch}
                value={searchInput}
                onChange={onChangesearchInput}
                style={{
                    width: '100%',
                }}
            />
            <SearchResult />
        </div>
    );
};

export default SearchForm;