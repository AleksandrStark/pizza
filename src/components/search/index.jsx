import React from 'react';
import styles from './Search.module.scss';

const Search = ({ searchValue, setSearchValue }) => {
	return (
		<div className={styles.root}>
			<svg
				className={styles.icon}
				xmlns="http://www.w3.org/2000/svg"
				enable-background="new 0 0 139 139"
				height="139px"
				id="Find"
				version="1.1"
				viewBox="0 0 139 139"
				width="139px"
			>
				<path d="M127.558,111.961L100.249,84.65c4.64-7.387,7.333-16.118,7.333-25.488c0-26.509-21.49-47.996-47.998-47.996  c-26.508,0-47.996,21.487-47.996,47.996c0,26.51,21.487,47.995,47.996,47.995c10.197,0,19.642-3.188,27.414-8.605l26.984,26.986  c1.875,1.873,4.333,2.806,6.788,2.806c2.458,0,4.913-0.933,6.791-2.806C131.308,121.787,131.308,115.711,127.558,111.961z   M59.584,91.607c-17.917,0-32.443-14.525-32.443-32.443S41.667,26.72,59.584,26.72c17.918,0,32.443,14.526,32.443,32.444  S77.502,91.607,59.584,91.607z" />
			</svg>
			<input
				className={styles.input}
				placeholder="Поиск пиццы"
				value={searchValue}
				onChange={(e) => setSearchValue(e.target.value)}
			/>
			{searchValue && (
				<svg
					onClick={() => setSearchValue('')}
					className={styles.clear}
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
				</svg>
			)}
		</div>
	);
};

export default Search;
