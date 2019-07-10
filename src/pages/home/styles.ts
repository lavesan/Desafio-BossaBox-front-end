import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const StyledSearchIcon = styled(FontAwesomeIcon)`
    position: absolute;
    left: 20px;
`

export const StyledHomeSearchInput ={
    paddingLeft: '33px'
}

export const StyledHomePage = styled.div`
    margin: 0 auto;
    width: calc(100% - 500px);
    min-width: 500px;
    padding: 10px;
    color: ${props => props.theme.primaryFontColor};
    position: relative;
`

export const StyledActionsBox = styled.div`
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    user-select: none;
`

// Styles customizados
export const box = {
    display: 'flex',
    justifyContent: 'flex-end',
    flex: 1
}

export const loadingHome = {
    position: 'fixed',
    left: '50%',
    top: '380px'
}