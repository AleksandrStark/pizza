import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props) => (
	<ContentLoader
		speed={2}
		width={280}
		height={500}
		viewBox="0 0 280 500"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}
	>
		<circle cx="124" cy="129" r="118" />
		<rect x="2" y="270" rx="6" ry="6" width="260" height="25" />
		<rect x="97" y="278" rx="0" ry="0" width="27" height="1" />
		<rect x="-1" y="314" rx="6" ry="6" width="267" height="77" />
		<rect x="3" y="422" rx="5" ry="5" width="88" height="29" />
		<rect x="126" y="415" rx="21" ry="21" width="142" height="42" />
	</ContentLoader>
);

export default Skeleton;
