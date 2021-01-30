import React from 'react';
import { render } from 'react-dom';
import './src/styles/style.scss';
const App = () => {
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
};

render(<App />, document.getElementById('root'));
