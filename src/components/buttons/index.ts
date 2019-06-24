import styled from 'styled-components';

interface IButtonOptions {
  disable?: boolean
}

const Button = styled.button`
  padding: 8px 20px;
  color: #FFF;
  border-radius: 4px;
  cursor: pointer;
  outline:none;
  transition: ease 0.4s;
`

export const NeutralButton = styled(Button)`
  border: thin solid ${({ theme }) => theme.neutral.primaryColor};
  background-color: ${({ theme }) => theme.neutral.primaryColor};
  :hover {
    border-color: ${({ theme }) => theme.neutral.secondaryColor};
    background-color: ${({ theme }) => theme.neutral.secondaryColor};
  }
  :active {
    border-color: ${({ theme }) => theme.neutral.terciaryColor};
    background-color: ${({ theme }) => theme.neutral.terciaryColor};
  }
  :disabled {
    border-color: ${({ theme }) => theme.neutral.quaternaryColor};
    background-color: ${({ theme }) => theme.neutral.quaternaryColor};
  }
`

export const SuccessButton = styled(Button)<IButtonOptions>`
  border: thin solid ${({ theme }) => theme.success.primaryColor};
  background-color: ${({ theme }) => theme.success.primaryColor};
  :hover {
    border-color: ${({ theme }) => theme.success.secondaryColor};
    background-color: ${({ theme }) => theme.success.secondaryColor};
  }
  :active {
    border-color: ${({ theme }) => theme.success.terciaryColor};
    background-color: ${({ theme }) => theme.success.terciaryColor};
  }
  ${({ theme, disable }) => disable && `
    pointer-events:none; 
    border-color: ${theme.success.quaternaryColor}; 
    background-color: ${theme.success.quaternaryColor}`}
`

export const DangerButton = styled(Button)<IButtonOptions>`
  border: thin solid ${({ theme }) => theme.danger.primaryColor};
  background-color: ${({ theme }) => theme.danger.primaryColor};
  :hover {
    border-color: ${({ theme }) => theme.danger.secondaryColor};
    background-color: ${({ theme }) => theme.danger.secondaryColor};
  }
  :active {
    border-color: ${({ theme }) => theme.danger.terciaryColor};
    background-color: ${({ theme }) => theme.danger.terciaryColor};
  }
  ${({ theme, disable }) => disable && `
    pointer-events:none; 
    border-color: ${theme.danger.quaternaryColor}; 
    background-color: ${theme.danger.quaternaryColor}`}
`