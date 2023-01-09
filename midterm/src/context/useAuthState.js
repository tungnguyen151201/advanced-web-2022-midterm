import { globalStateContext, dispatchStateContext } from './authProvider';
import React from 'react';

const useGlobalState = () => [
  React.useContext(globalStateContext),
  React.useContext(dispatchStateContext),
];

export default useGlobalState;
