import * as React from 'react';
import { hot } from 'react-hot-loader/root';
import { Splash } from './Splash';

const App = () => {
  return (
    <>
      <Splash />
    </>
  );
};

export const AppWithHMR = hot(App);
