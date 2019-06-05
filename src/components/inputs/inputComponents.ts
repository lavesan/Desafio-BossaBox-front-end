import styled from 'styled-components';

export const StyledTextInput = styled.input`
    padding: 10px 20px;
    border-radius: 4px;
    border: thin solid #EBEAED;
    background-color: #F5F4F6;
    color: #000;
    outline:none;
    box-sizing: border-box;
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

export const StyledTextArea = styled.textarea`
    padding: 10px 20px;
    border-radius: 4px;
    border: thin solid #EBEAED;
    background-color: #F5F4F6;
    color: #000;
    outline:none;
    box-sizing: border-box;
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

export const StyledCheckbox = styled.div`
    input[type="checkbox"] {
        opacity: 0;
    }
    
    label {
        position: relative;
    }
    
    label::before,
    label::after {
        position: absolute;
        display: inline-block;
    }
    
    label::before {
        content: "";
        width: 15px;
        height: 15px;
        left: -25px;
        border: thin solid #EBEAED;
        background-color: #F5F4F6;
        border-radius: 2px;
    }
    
    label::after {
        width: 4px;
        height: 14px;
        left: -19px;
        border: 2px solid #FFF;
        border-top: none;
        border-left: none;
        transform: rotate(45deg); 
    }

    input[type="checkbox"] {
        margin: 0 15px;
    }
    
    input[type="checkbox"]:checked + label::before {
        border-color: #365DF0;
        background-color: #365DF0;
    }

    input[type="checkbox"]:checked:disabled + label::before {
        border-color: #9AAEF7;
        background-color: #9AAEF7;
    }

    input[type="checkbox"]:checked + label::after {
        content: "";
    }
`