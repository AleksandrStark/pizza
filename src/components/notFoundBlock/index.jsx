import React from 'react';
import styles from './NotFoundBlock.module.scss';

const NotFoundBlock = () => {
	return (
		<h1 className={styles.root}>
			<span>&#128532;</span>
			<br />
			<div>Ничего не найдено</div>
			<p className={styles.description}>
				К сожалению, данная страница отсутствует в нашем интернет магазине
			</p>
		</h1>
	);
};

export default NotFoundBlock;
