import styled from 'styled-components';
import { ErrorMessage } from 'formik';

export const StyledFormBox = styled.form`
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    div {
        width: 80%;
    }
`

export const StyledDescription = styled.span`
    font-size: 0.8rem;
    color: #646566;
`

export const StyledErrorMessage = styled(ErrorMessage)`
    color: ${props => props.theme.danger.primaryColor};
    font-size: 0.9rem;
    margin: 2px 0;
    text-align: right;
`

export const SpinnerStyle = { 
    position: 'absolute', 
    left: '50%', 
    top: '50%' 
}