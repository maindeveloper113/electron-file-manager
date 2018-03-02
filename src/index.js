import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route} from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './reducers';

import FileExplorer from './containers/FileExplorer'

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<div className="app">
				<Route path="" component={FileExplorer} />
			</div>
		</Router>
	</Provider>,
	document.getElementById('root')
);
