import styled from 'styled-components';

export const StyledTextInput = styled.input`
    padding: 10px 20px;
    border-radius: 4px;
    border: thin solid #EBEAED;
    background-color: #F5F4F6;
    color: #000;
    outline:none;
    :focus {
        border-color: #DEDCE1;
        background-color: #EBEAED;
    }
    .invalid {
        color: #F95E5A;
        border-color: #F95E5A;
        background-color: #FEEFEE;
    }
`