import styled, { StyledFunction, StyledComponent } from 'styled-components';

export const StyledTextInput: any = styled.input`
    padding: 8px 20px;
    border-radius: 4px;
    border: thin solid ${(props: any) => props.invalid ? '#F95E5A' : '#EBEAED'};
    background-color: ${(props: any) => props.invalid ? '#FEEFEE' : '#F5F4F6'};
    color: ${(props: any) => props.invalid ? '#F95E5A' : '#000'};
    outline:none;
    box-sizing: border-box;
    :focus {
        border-color: ${(props: any) => props.invalid ? '#F95E5A' : '#DEDCE1'};
        background-color: ${(props: any) => props.invalid ? '#FEEFEE' : '#EBEAED'};
    }
    ${(props: any) => props.disable && 'pointer-events:none; color: #DEDCE1;'}
`

export const StyledTextArea: any = styled.textarea`
    padding: 5px 20px;
    border-radius: 4px;
    border: thin solid ${(props: any) => props.invalid ? '#F95E5A' : '#EBEAED'};
    background-color: ${(props: any) => props.invalid ? '#FEEFEE' : '#F5F4F6'};
    color: ${(props: any) => props.invalid ? '#F95E5A' : '#000'};
    outline:none;
    box-sizing: border-box;
    :focus {
        border-color: ${(props: any) => props.invalid ? '#F95E5A' : '#DEDCE1'};
        background-color: ${(props: any) => props.invalid ? '#FEEFEE' : '#EBEAED'};
    }
    :invalid {
        color: #F95E5A;
        border-color: #F95E5A;
        background-color: #FEEFEE;
    }
    ${(props: any) => props.disable && 'pointer-events:none; color: #DEDCE1;'}
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