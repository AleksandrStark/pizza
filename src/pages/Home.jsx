import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { SearchContext } from '../App';
import Categories from '../components/Categories';
import Pagination from '../components/pagination';
import PizzaBlock from '../components/pizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';
import Sort from '../components/Sort';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

const Home = () => {
	const { categoryId, sort, currentPage } = useSelector(
		(state) => state.filter
	);
	const dispatch = useDispatch();

	const { searchValue } = useContext(SearchContext);
	const [items, setItems] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};
	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	useEffect(() => {
		setIsLoading(true);
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		axios
			.get(
				`https://62c8018a8c90491c2cac37d7.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`
			)
			.then((res) => {
				setItems(res.data);
				setIsLoading(false);
			});

		window.scrollTo(0, 0);
	}, [categoryId, sort, searchValue, currentPage]);

	const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
	const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
	return (
		<>
			<div className="content__top">
				<Categories
					value={categoryId}
					onChangeCategory={(id) => onChangeCategory(id)}
				/>
				<Sort />
			</div>
			<h2 className="content__title">Все пиццы</h2>
			<div className="content__items">{isLoading ? skeletons : pizzas}</div>
			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</>
	);
};
export default Home;
