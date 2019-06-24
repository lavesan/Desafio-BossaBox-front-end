import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled(FontAwesomeIcon)`
    font-size: 1.7rem;
    animation: ${rotate} 1.5s linear infinite;
`

export const Spinner: React.FunctionComponent<{ style?: object }> = function({ style }) {
    return (<StyledSpinner icon={faSpinner} style={style} />)
}