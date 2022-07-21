import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import React, { useState } from 'react';
import FullPizza from './components/FullPizza';
import MainLayout from './layouts/MainLayout';

export const SearchContext = React.createContext();

function App() {
	const [searchValue, setSearchValue] = useState('');
	return (
		<SearchContext.Provider value={{ searchValue, setSearchValue }}>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="" element={<Home />}></Route>
					<Route path="cart" element={<Cart />}></Route>
					<Route path="pizza/:id" element={<FullPizza />}></Route>
					<Route path="*" element={<NotFound />}></Route>
				</Route>
			</Routes>
		</SearchContext.Provider>
	);
}

export default App;
