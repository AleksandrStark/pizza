import React, { useEffect, useState } from 'react';
import Categories from '../components/Categories';
import PizzaBlock from '../components/pizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';
import Sort from '../components/Sort';

const Home = ({ searchValue }) => {
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [categoryId, setCategoryId] = useState(0);
	const [sortType, setSortType] = useState({
		name: 'популярности',
		sortProperty: 'rating',
	});

	useEffect(() => {
		setIsLoading(true);
		const sortBy = sortType.sortProperty.replace('-', '');
		const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		fetch(
			`https://62c8018a8c90491c2cac37d7.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}${search}`
		)
			.then((res) => res.json())
			.then((arr) => setItems(arr));
		setIsLoading(false);
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue]);

	const pizzas = items
		// .filter((obj) => {
		// 	if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
		// 		return true;
		// 	}
		// 	return false;
		// })
		.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
	const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
	return (
		<>
			<div className="content__top">
				<Categories
					value={categoryId}
					onChangeCategory={(id) => setCategoryId(id)}
				/>
				<Sort value={sortType} onChangeSort={(id) => setSortType(id)} />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
		</>
	);
};
export default Home;
