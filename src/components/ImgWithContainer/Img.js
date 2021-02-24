import React from "react";
import PropTypes from "prop-types";

const Img = (props) => {
	return (
		<div
			className={props.containerStyle}
			onClick={props.onClickProp}
			style={props.style}
		>
			<img src={props.source} className={props.imgStyle} alt="" />
			{props.children}
		</div>
	);
};

Img.propTypes = {
	source: PropTypes.string,
	containerStyle: PropTypes.string,
	imgStyle: PropTypes.string,
	onClickProp: PropTypes.func,
	children: PropTypes.element,
	style: PropTypes.object,
};

export default Img;
