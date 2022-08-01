import './scss/app.scss';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import React, { Suspense } from 'react';

// import Cart from './pages/Cart';
// import FullPizza from './components/FullPizza';
// import NotFound from './pages/NotFound';

const Cart = React.lazy(
	() => import(/*webpackChankName: "Cart" */ './pages/Cart')
);
const FullPizza = React.lazy(
	() => import(/*webpackChankName: "FullPizza" */ './components/FullPizza')
);
const NotFound = React.lazy(
	() => import(/*webpackChankName: "NotFound" */ './pages/NotFound')
);

function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route path="" element={<Home />}></Route>
				<Route
					path="cart"
					element={
						<Suspense fallback={<div>Идет зарузка корзины...</div>}>
							<Cart />
						</Suspense>
					}
				></Route>
				<Route
					path="pizza/:id"
					element={
						<Suspense fallback={<div>Идет зарузка пиццы...</div>}>
							<FullPizza />
						</Suspense>
					}
				></Route>
				<Route
					path="*"
					element={
						<Suspense fallback={<div>Идет зарузка...</div>}>
							<NotFound />
						</Suspense>
					}
				></Route>
			</Route>
		</Routes>
	);
}

export default App;
