import './scss/app.scss';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import FullPizza from './components/FullPizza';
import MainLayout from './layouts/MainLayout';

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Home />}></Route>
				<Route path="cart" element={<Cart />}></Route>
				<Route path="pizza/:id" element={<FullPizza />}></Route>
				<Route path="*" element={<NotFound />}></Route>
			</Route>
		</Routes>
	);
}

export default App;
