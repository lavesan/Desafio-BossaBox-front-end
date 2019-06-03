import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  color: #FFF;
  border-radius: 4px;
  cursor: pointer;
  outline:none;
  transition: ease 0.4s;
`

export const NeutralButton = styled(Button)`
  border: thin solid ${props => props.theme.primaryNeutralColor};
  background-color: ${props => props.theme.primaryNeutralColor};
  :hover {
    border-color: ${props => props.theme.secondaryNeutralColor};
    background-color: ${props => props.theme.secondaryNeutralColor};
  }
  :active {
    border-color: ${props => props.theme.terciaryNeutralColor};
    background-color: ${props => props.theme.terciaryNeutralColor};
  }
  :disabled {
    border-color: ${props => props.theme.quaternaryNeutralColor};
    background-color: ${props => props.theme.quaternaryNeutralColor};
  }
`

export const SuccessButton = styled(Button)`
  border: thin solid ${props => props.theme.primarySuccessColor};
  background-color: ${props => props.theme.primarySuccessColor};
  :hover {
    border-color: ${props => props.theme.secondarySuccessColor};
    background-color: ${props => props.theme.secondarySuccessColor};
  }
  :active {
    border-color: ${props => props.theme.terciarySuccessColor};
    background-color: ${props => props.theme.terciarySuccessColor};
  }
  :disabled {
    border-color: ${props => props.theme.quaternarySuccessColor};
    background-color: ${props => props.theme.quaternarySuccessColor};
  }
`

export const DangerButton = styled(Button)`
  border: thin solid ${props => props.theme.primaryDangerColor};
  background-color: ${props => props.theme.primaryDangerColor};
  :hover {
    border-color: ${props => props.theme.secondaryDangerColor};
    background-color: ${props => props.theme.secondaryDangerColor};
  }
  :active {
    border-color: ${props => props.theme.terciaryDangerColor};
    background-color: ${props => props.theme.terciaryDangerColor};
  }
  :disabled {
    border-color: ${props => props.theme.quaternaryDangerColor};
    background-color: ${props => props.theme.quaternaryDangerColor};
  }
`