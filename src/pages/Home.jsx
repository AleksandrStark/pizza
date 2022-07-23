import React, { useContext, useEffect, useRef } from 'react';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import Categories from '../components/Categories';
import Pagination from '../components/pagination';
import PizzaBlock from '../components/pizzaBlock';
import Skeleton from '../components/pizzaBlock/Skeleton';
import Sort, { sortList } from '../components/Sort';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, selectPizzaData } from '../redux/slices/pizzaSlice';

const Home = () => {
	const { categoryId, sort, currentPage, searchValue } =
		useSelector(selectFilter);
	const { items, status } = useSelector(selectPizzaData);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const isSearching = useRef(false);
	const isMounted = useRef(false);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};
	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};
	const getPizzas = async () => {
		const sortBy = sort.sortProperty.replace('-', '');
		const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
		const category = categoryId > 0 ? `category=${categoryId}` : '';
		const search = searchValue ? `&search=${searchValue}` : '';

		dispatch(
			fetchPizzas({
				sortBy,
				order,
				category,
				search,
				currentPage,
			})
		);
	};

	// Если был первый рендер, то проверяем Url параметры и сохраняем в Redux
	useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = sortList.find(
				(obj) => obj.sortProperty === params.sortProperty
			);
			dispatch(
				setFilters({
					...params,
					sort,
				})
			);
			isSearching.current = true;
		}
	}, []);
	// Если был первый рендер, запрашиваем пиццы
	useEffect(() => {
		getPizzas();
	}, [categoryId, sort, searchValue, currentPage]);

	// Если был первый рендер и были изменены параметры
	useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort, currentPage]);

	const pizzas = items.map((pizza) => <PizzaBlock {...pizza} key={pizza.id} />);
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
			{status === 'error' ? (
				<div className="content__error-info">
					<h2>
						Произошла ошибка <icon>😕</icon>
					</h2>
					<p>
						Не удалось получить пиццы.
						<br />
						Попробуйте повторить попытку позже.
					</p>
				</div>
			) : (
				<div className="content__items">
					{status === 'loading' ? skeletons : pizzas}
				</div>
			)}

			<Pagination currentPage={currentPage} onChangePage={onChangePage} />
		</>
	);
};
export default Home;
