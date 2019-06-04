import styled from 'styled-components';

export const StyledHomePage = styled.div`
    margin: 0 auto;
    width: calc(100% - 500px);
    padding: 10px;
    color: ${props => props.theme.primaryFontColor};
    font-family: ${props => props.theme.bossaFontFamily};
`

export const StyledActionsBox = styled.div`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    user-select: none;
`