import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyledTextInput } from '../../components/inputs/styles';

export const StyledSearchIcon = styled(FontAwesomeIcon)`
    position: absolute;
    left: 20px;
`

export const StyledHomeSearchInput = styled(StyledTextInput)`
    padding-left: 33px;
`

export const StyledHomePage = styled.div`
    margin: 0 auto;
    width: calc(100% - 500px);
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