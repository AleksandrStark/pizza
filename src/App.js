import './scss/app.scss';
import Header from './components/Header';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import { useState } from 'react';

function App() {
	const [searchValue, setSearchValue] = useState('');
	return (
		<div className="App">
			<div className="wrapper">
				<Header searchValue={searchValue} setSearchValue={setSearchValue} />
				<div className="content">
					<div className="container">
						<Routes>
							<Route
								path="/"
								element={<Home searchValue={searchValue} />}
							></Route>
							<Route path="cart" element={<Cart />}></Route>
							<Route path="*" element={<NotFound />}></Route>
						</Routes>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
