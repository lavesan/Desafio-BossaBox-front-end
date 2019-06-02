import styled from 'styled-components';

const Button = styled.button`
  padding: 10px 20px;
  font-family: $bossa-font-family;
  color: #FFF;
  border-radius: 4px;
  cursor: pointer;
  outline:none;
  transition: ease 0.4s;
`
// ${props => props.theme.primaryColor}
export const NeutralButton = styled(Button)`
  border: thin solid #365DF0;
  background-color: #365DF0;
  :hover {
    border-color: #2F55CC;
    background-color: #2F55CC;
  }
  :active {
    border-color: #244AA8;
    background-color: #244AA8;
  }
  :disabled {
    border-color: #B9C6FA;
    background-color: #B9C6FA;
  }
`

export const SuccessButton = styled(Button)`
  border: thin solid #0DCB7D;
  background-color: #0DCB7D;
  :hover {
    border-color: #10B26C;
    background-color: #10B26C;
  }
  :active {
    border-color: #0E995D;
    background-color: #0E995D;
  }
  :disabled {
    border-color: #88EDC4;
    background-color: #88EDC4;
  }
`

export const DangerButton = styled(Button)`
  border: thin solid #F95E5A;
  background-color: #F95E5A;
  :hover {
    border-color: #CC4C4C;
    background-color: #CC4C4C;
  }
  :active {
    border-color: #A53F3F;
    background-color: #A53F3F;
  }
  :disabled {
    border-color: #FCAEAC;
    background-color: #FCAEAC;
  }
`

// Button.defaultProps = {
//     theme: {
//       main: "palevioletred"
//     }
// }