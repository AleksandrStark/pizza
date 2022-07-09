import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/pizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = () => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetch('https://62c8018a8c90491c2cac37d7.mockapi.io/items')
			.then((res) => res.json())
			.then((arr) => setItems(arr));
		setIsLoading(false);
		window.scrollTo(0, 0);
	}, []);
	return (
		<>
			<div className="content__top">
				<Categories />
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
					: items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
			</div>
		</>
	);
};
export default Home;
