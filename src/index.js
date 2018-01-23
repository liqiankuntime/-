/**
 * Created by liqiankun on 2017/11/17.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore,applyMiddleware,compose} from 'redux';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
//,Route,Redirect,Switch
import reducers from './redux/reducers';
import config from './config';
import RootRouters from './RootRouters';
import './index.css'
//创建store
const store = createStore(reducers,compose(
	applyMiddleware(thunk),
	window.devToolsExtension?window.devToolsExtension():f=>f
));




ReactDOM.render(
	(<Provider store={store}>
		<BrowserRouter>
			<RootRouters />
		</BrowserRouter>
	</Provider>),
	document.getElementById('root')
);