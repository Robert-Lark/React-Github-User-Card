import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Gsap from "./gsap";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

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
	nameBold: {
		marginTop: "10px",
		fontFamily: "Rockwell",
		textAlign: "center",
		fontSize: "3rem",
	},
	name: {
		marginTop: "10px",
		fontFamily: "Rockwell",
		textAlign: "center",
	},
	paper: {
		border: "2px solid black",
		padding: "20px",
	},
	hideEl: {
		opacity: 0,
	},
	userCardContainer: {
		opacity: 0,
		display: "flex",
		flexDirection: "Column",
		justifyContent: "space-around",
		alignItems: "center",
		marginTop: "300px",
		width: "100vw",
		height: "800px",
	},
	friendsFollowersContainer: {
		marginTop: "50px",
		display: "flex",
		width: "90vw",
		flexDirection: "Column",
		justifyContent: "space-around",
		alignItems: "center",
	},
	friendsFollowersItem: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		width: "90vw",
	},
	friendsFollowingItem: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		width: "90vw",
	},
	avatarFollow: {},
	text: {
		fontSize: "2em",
		marginBottom: "20px",
	},
});

class UserCard extends React.Component {
	constructor() {
		super();
		this.state = {
			users: [],
			usersFollowers: [],
			following: [],
			user: "",
		};
	}

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
				//console.log(this.state);
			})
			.catch((err) => console.log(err));
		axios
					.get(`https://api.github.com/users/AFortune/followers`)
					.then((res) => {
						this.setState({ usersFollowers: res.data });
					})
					.catch((err) => console.log(err));
		axios
			.get(`https://api.github.com/users/AFortune/following`)
			.then((res) => {
				this.setState({ following: res.data });
			})
			.catch((err) => console.log(err));
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.user !== this.state.user) {
            console.log("state has changed")
		}
	}

	getUserID = (user) => {
        console.log(user.login);
        
        
		// this.setState({
		// 	...this.state,
		// 	user: user.login
		// });
		console.log(this.state);
	};

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
									key={users}
									alt="user"
									src={users.avatar_url}
									className={classes.avatar}
									onClick={() => this.getUserID(users)}
								/>
								<Typography className={classes.name}>{users.login}</Typography>
							</Grid>
						))}
					</Grid>
				</div>
				{this.state.users.map((users) => (
					<Box className={classes.userCardContainer}>
						<Paper variant="outlined" className={classes.paper}>
							<Typography className={classes.nameBold}>
								{this.state.users[0].login}
							</Typography>
							<Typography className={classes.name}>
								{this.state.users[0].html_url}
							</Typography>
							<Typography className={classes.name}>
								ID: {this.state.users[0].id}
							</Typography>
							<Typography className={classes.name}>
								Node ID: {this.state.users[0].node_id}
							</Typography>
							<Typography className={classes.name}>
								Type: {this.state.users[0].type}
							</Typography>
							<Typography className={classes.name}>
								<Button variant="outlined" href="this.state.users[0].repos_url">
									Find {this.state.users[0].login}'s Repo's Here
								</Button>
							</Typography>
						</Paper>
						<Grid container className={classes.friendsFollowersContainer}>
							<Grid item className={classes.follows}>
								<Typography className={classes.text}>
									{this.state.users[0].login} Follows
								</Typography>
							</Grid>
							<Grid container className={classes.friendsFollowersItem}>
								{this.state.usersFollowers.map((usersfs) => (
									<Grid item className={classes.avatarTop}>
										<Avatar
											alt="Remy Sharp"
											src={usersfs.avatar_url}
											className={classes.avatar}
											onClick={this.handleSingleClickEventEnlarge}
										/>
										<Typography className={classes.name}>
											{usersfs.login}
										</Typography>
									</Grid>
								))}
							</Grid>
						</Grid>
						<Grid container className={classes.friendsFollowersContainer}>
							<Grid item className={classes.follows}>
								<Typography className={classes.text}>
									{this.state.users[0].login} Is Followed By
								</Typography>
							</Grid>
							<Grid container className={classes.friendsFollowingItem}>
								{this.state.following.map((usersfs) => (
									<Grid item className={classes.avatarFollow}>
										<Avatar
											alt="Remy Sharp"
											src={usersfs.avatar_url}
											className={classes.avatar}
											onClick={this.handleSingleClickEventEnlarge}
										/>
										<Typography className={classes.name}>
											{usersfs.login}
										</Typography>
									</Grid>
								))}
							</Grid>
						</Grid>
					</Box>
				))}
			</div>
		);
	}
}

export default withStyles(styles)(UserCard);
