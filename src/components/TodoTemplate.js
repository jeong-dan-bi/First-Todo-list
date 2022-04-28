import React from 'react';
import styled from 'styled-components';

const TodoTemplate = ({children}) => {
    return (
        <TodoWrapper>
             <AppTitle>Todo List</AppTitle>
             <Content>{children}</Content>
        </TodoWrapper>
    );
};

const TodoWrapper = styled.div `
    width: 512px;
    margin: 6rem auto 0;
    border-radius: 4px;
    overflow: hidden;
`;

const AppTitle = styled.div`
    background: #00BB49;
    color: #fff;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Content = styled.div`
    background: #fff;
`;

export default TodoTemplate;