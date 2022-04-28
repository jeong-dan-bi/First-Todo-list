import React from 'react';
import styled from 'styled-components';
import {
    MdCheckBox,
    MdCheckBoxOutlineBlank,
    MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';


const TodoListItem = ({todo, onRemove, onToggle}) => {
    const {id, text, checked} = todo;
    return (
        <TodoItemWrpper>
            <Checkbox 
                className={cn('checkbox', {checked})} 
                onClick={() => onToggle(id)}
            >
                {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
               <div className='text'>{text}</div>
            </Checkbox>
            <Remove onClick={() => onRemove(id)}>
                <MdRemoveCircleOutline />
            </Remove>
        </TodoItemWrpper>
    );
};

const TodoItemWrpper = styled.div`
    display: flex;
    padding: 1rem;
    align-items: center;
    &:nth-child(even){
        background: #f8f9fa;
    }
    & + & {
        border-top: 1px solid #dee2e6;
    }
`;

const Checkbox = styled.div`
    cursor: pointer;
    display: flex;
    flex: 1;
    align-items: center;
    svg{
        font-size: 1.5rem;
    }
    .text{
        margin-left: 0.5rem;
        flex: 1;
    }
    &.checked{
        svg{
            color: #00BB49;
        }
        .text{
            color: #adb5bd;
            text-decoration: line-through;
        }
    }
`;

const Remove = styled.div`
    display : flex;
    align-items: center;
    font-size: 1.5rem;
    color: #ff6b6b;
    cursor: pointer;
    &:hover{
        color: #ff8787;
    }
`;

export default TodoListItem;