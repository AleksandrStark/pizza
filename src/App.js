import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import React, { useState } from 'react';

export const SearchContext = React.createContext();

function App() {
	const [searchValue, setSearchValue] = useState('');
	return (
		<div className="wrapper">
			<SearchContext.Provider value={{ searchValue, setSearchValue }}>
				<Header />
				<div className="content">
					<div className="container">
						<Routes>
							<Route path="/" element={<Home />}></Route>
							<Route path="cart" element={<Cart />}></Route>
							<Route path="*" element={<NotFound />}></Route>
						</Routes>
					</div>
				</div>
			</SearchContext.Provider>
		</div>
	);
}

export default App;
