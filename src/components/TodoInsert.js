import React, { useCallback, useState } from 'react';
import { MdAdd } from 'react-icons/md';
import styled from 'styled-components';

const TodoInsert = ({onInsert}) => {
    const [value, setValue] = useState('');

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    //onSubmit 이벤트 설정
    const onSubmit = useCallback(
        (e) => {
            onInsert(value);
            setValue('');
            e.preventDefault();
        },
        [onInsert, value]
    )

    return (
        <TodoInsertWrapper onSubmit={onSubmit}>
            <input 
            type="text" 
            placeholder='할 일을 입력하세요'
            value={value}
            onChange={onChange}
            />
            <button type="submit"><MdAdd /></button>
        </TodoInsertWrapper>
    );
};

const TodoInsertWrapper = styled.form`
    display: flex;
    background: #fff;
    border: 2px solid #98A949;
    input{
        background: none;
        outline: none;
        border: none;
        padding: 0.5rem;
        font-size: 1.125rem;
        color: #fff;
        line-height: 1.5;
        &::placeholder{
            color: #495057;
        }
        flex: 1;
    }

    button{
        background: #98A949;
        outline: none;
        border: none;
        padding: 0 1rem;
        font-size: 1.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: background 0.1s ease-in;
        cursor: pointer;
        &:hover{
            background: #adb5bd;
        }
    }
`;

export default TodoInsert;