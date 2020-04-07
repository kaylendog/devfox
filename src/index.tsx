import * as React from 'react';
import * as ReactDOM from 'react-dom';

import './index.less';

import { AppWithHMR } from './components/App';

ReactDOM.render(<AppWithHMR />, document.querySelector('#app-mount'));
