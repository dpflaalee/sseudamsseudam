import React, { useState, useCallback } from 'react';

const UserInput = (initialValue = null) => {
    const [value, setValue] = useState(initialValue);
    const handler = useCallback((e) => {
        //console.log("..........." + e.target.value);
        setValue(e.target.value);
    }, [setValue]);
    return [value, handler, setValue];
}

export default UserInput;

/*
const [id, setId] = useState('');
const onChangeId = useCallback((e) => {
    setId(e.target.value);
}, []);

const [nickname, setNickname] = useState('');
const onChangeNickname = useCallback((e) => {
    setNickname(e.target.value);
}, []);
*/
