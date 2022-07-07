import React, { useState } from 'react';

function Categories() {
	const [activeIndex, setActiveIndex] = useState(0);

	const categories = [
		'все',
		'мясная',
		'вегетерианская',
		'гриль',
		'острая',
		'закрытая',
	];
	const onClickCategory = (i) => {
		setActiveIndex(i);
	};
	return (
		<div className="categories">
			<ul>
				{categories.map((value, i) => (
					<li
						key={i}
						onClick={() => onClickCategory(i)}
						className={activeIndex === i ? 'active' : ''}
					>
						{value}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Categories;
