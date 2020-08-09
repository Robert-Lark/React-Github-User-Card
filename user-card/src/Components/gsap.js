
// eslint-disable-next-line
import React, { useRef, useEffect } from "react";
// eslint-disable-next-line
import gsap from "gsap";
import { TweenMax, Power3 } from "gsap";
import { makeStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import NavigationIcon from "@material-ui/icons/Navigation";
import Users from "./Users.png";

const useStyles = makeStyles(() => ({
	header: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100vh",
	},
	logo: {
		height: "20em",
	},
	button: {
		opacity: "1",
        border: "2px solid black",
        marginTop: "-50px",
	},
	extendedIcon: {},
}));

function Gsap(props) {
	let clickHand = useRef(null);
	let buttonOpacity = useRef(null);

const formSubmit = (e) => {

		// clickHand.style.display= "none"
		TweenMax.to(clickHand, { duration: 3, y: "-32%", ease: "bounce" });



		TweenMax.to(buttonOpacity, {
			duration: 3,
			opacity: "0",
			ease: Power3.easeOut,
		});


	props.handleClick();

};


	
	const classes = useStyles();

	return (
		<div
			ref={(el) => {
				clickHand = el;
			}}
		>
			<div className={classes.header}>
				<img alt="company logo" className={classes.logo} src={Users} />
				<Fab
					ref={(el1) => {
						buttonOpacity = el1;
					}}
					variant="extended"
					color="primary"
					aria-label="add"
					className={classes.button}
					onClick={formSubmit}

				>
					<NavigationIcon className={classes.extendedIcon} />
					Get Me The Best
				</Fab>
			</div>
		</div>
	);
}

export default Gsap;
