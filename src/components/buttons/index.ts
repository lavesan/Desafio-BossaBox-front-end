import styled from 'styled-components';

const Button = styled.button`
  padding: 8px 20px;
  color: #FFF;
  border-radius: 4px;
  cursor: pointer;
  outline:none;
  transition: ease 0.4s;
`

export const NeutralButton = styled(Button)`
  border: thin solid ${props => props.theme.neutral.primaryColor};
  background-color: ${props => props.theme.neutral.primaryColor};
  :hover {
    border-color: ${props => props.theme.neutral.secondaryColor};
    background-color: ${props => props.theme.neutral.secondaryColor};
  }
  :active {
    border-color: ${props => props.theme.neutral.terciaryColor};
    background-color: ${props => props.theme.neutral.terciaryColor};
  }
  :disabled {
    border-color: ${props => props.theme.neutral.quaternaryColor};
    background-color: ${props => props.theme.neutral.quaternaryColor};
  }
`

export const SuccessButton: any = styled(Button)`
  border: thin solid ${props => props.theme.success.primaryColor};
  background-color: ${props => props.theme.success.primaryColor};
  :hover {
    border-color: ${props => props.theme.success.secondaryColor};
    background-color: ${props => props.theme.success.secondaryColor};
  }
  :active {
    border-color: ${props => props.theme.success.terciaryColor};
    background-color: ${props => props.theme.success.terciaryColor};
  }
  ${(props: any) => props.disable && `
    pointer-events:none; 
    border-color: ${props.theme.success.quaternaryColor}; 
    background-color: ${props.theme.success.quaternaryColor}`}
`

export const DangerButton: any = styled(Button)`
  border: thin solid ${props => props.theme.danger.primaryColor};
  background-color: ${props => props.theme.danger.primaryColor};
  :hover {
    border-color: ${props => props.theme.danger.secondaryColor};
    background-color: ${props => props.theme.danger.secondaryColor};
  }
  :active {
    border-color: ${props => props.theme.danger.terciaryColor};
    background-color: ${props => props.theme.danger.terciaryColor};
  }
  ${(props: any) => props.disable && `
    pointer-events:none; 
    border-color: ${props.theme.danger.quaternaryColor}; 
    background-color: ${props.theme.danger.quaternaryColor}`}
`