import React from 'react';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { StyledSpinner } from './styles';

export const Spinner: React.FunctionComponent<{ style?: object }> = function({ style }) {
    return (<StyledSpinner icon={faSpinner} style={style} />)
}