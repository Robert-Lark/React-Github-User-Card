import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Gsap from "./gsap";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const styles = (theme) => ({
	top: {
		width: "100vw",
		height: "40vh",
	},
	root: {
		flexGrow: 1,
		display: "flex",
	},
	root1: {
		flexGrow: 1,
		display: "flex",
		flexDirection: "Column",
		justifyContent: "space-around",
		alignItems: "center",
		transition: "opacity 5.5s",
		opacity: 1,
	},
	avatar: {
		border: "2px solid black",
		height: "7em",
		width: "7em",
	},
	name: {
		marginTop: "10px",
		fontFamily: "Rockwell",
		textAlign: "center",
	},
	hideEl: {
		opacity: 0,
	},
});

class UserCard extends React.Component {
	constructor() {
		super();
		this.state = {
            users: [],
            user: "",
		};
	}
	handleSingleClickEventEnlarge = () => {
	this.setState({
		isActive1: !this.state.isActive1,
	});
	};
	handleSingleClickEventFadeIn = () => {
		this.setState({
			isActive0: !this.state.isActive0,
		});

	};

	componentDidMount() {
		axios
			.get("https://api.github.com/users/robert-lark/followers")
			.then((res) => {
				this.setState({ users: res.data });
				console.log(this.state);
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { classes } = this.props;
		return (
			<div>
				<div className={classes.top}>
					<Gsap handleClick={this.handleSingleClickEventFadeIn} />
				</div>
				<div
					className={
						this.state.isActive0 === true ? classes.root1 : classes.hideEl
					}
				>
					<Grid container justify="center" spacing={5} className={classes.root}>
						{this.state.users.map((users) => (
							<Grid item className={classes.avatarTop}>
								<Avatar
									alt="Remy Sharp"
									src={users.avatar_url}
									className={classes.avatar}
									onClick={this.handleSingleClickEventEnlarge}
								/>
								<Typography className={classes.name}>{users.login}</Typography>
							</Grid>
						))}
					</Grid>
				</div>
				<div
					className={
						this.state.isActive1 === true ? classes.root1 : classes.hideEl
					}
				>
					<img
						alt="Remy Sharp"
						src={this.state.avatar_url}
						className={classes.avatar}
						onClick={this.handleSingleClickEvent1}
					/>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(UserCard);
