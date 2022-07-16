import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza = () => {
	const [pizza, setPizza] = useState();
	const { id } = useParams();
	const navigate = useNavigate();
	useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get(
					`https://62c8018a8c90491c2cac37d7.mockapi.io/items/` + id
				);
				setPizza(data);
			} catch (error) {
				alert('Такой пиццы нет!');
				navigate('/');
			}
		}
		fetchPizza();
	}, []);

	if (!pizza) {
		return 'Загрузка...';
	}
	return (
		<div className="container">
			<img src={pizza.imageUrl} alt="pizza" />
			<h2>{pizza.name}</h2>
			<h4>{pizza.price} P</h4>
		</div>
	);
};
export default FullPizza;
