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
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";

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
		opacity: 1,
		display: "flex",
		flexDirection: "Column",
		justifyContent: "space-around",
		alignItems: "center",
		marginTop: "400px",
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
	form: {
		marginTop: "15%",
		height: "20vh",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
	},
});

class UserCard extends React.Component {
	constructor() {
		super();
		this.state = {
            users: [],
			usersFollowers: [],
			following: [],
			user: [],
		};
	}

	handleSingleClickEventFadeIn = () => {
		this.setState({
			isActive0: !this.state.isActive0,
		});
    };
    searchBarHandleChange = (e) => {
        console.log("changes called")
    }

	componentDidMount() {
		axios
			.get("https://api.github.com/users/robert-lark/followers")
			.then((res) => {
				this.setState({ users: res.data });
				//console.log(this.state);
			})
			.catch((err) => console.log(err));
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevState.user !== this.state.user) {
           console.log(`state has changed ${this.state.user}`);
            console.log(`state has changed ${this.state.usersFollowers}`);
            console.log(`state has changed ${this.state.following}`);
            axios
							.get(`https://api.github.com/users/${this.state.user.login}/followers`)
							.then((res) => {
								this.setState({ usersFollowers: res.data });
							})
							.catch((err) => console.log(err));
						axios
							.get(`https://api.github.com/users/${this.state.user.login}/following`)
							.then((res) => {
								this.setState({ following: res.data });
							})
							.catch((err) => console.log(err));
		}
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
									key={users}
									alt="user"
									src={users.avatar_url}
									className={classes.avatar}
									onClick={() => this.setState({ user: users })}
									// onClick={() => this.getUserID(users)}
									//onClick={console.log(users.login)}
								/>
								<Typography className={classes.name}>{users.login}</Typography>
							</Grid>
						))}
					</Grid>
				</div>
				{/* {this.state.users.map((users) => ( */}
				<Box className={classes.userCardContainer}>
					<Paper variant="outlined" className={classes.paper}>
						<Typography className={classes.nameBold}>
							{this.state.user.login}
						</Typography>
						<img
							src="https://ghchart.rshah.org/AFortune"
							alt="2016rshah's Github chart"
						/>
						<Typography className={classes.name}>
							{this.state.user.html_url}
						</Typography>
						<Typography className={classes.name}>
							ID: {this.state.user.id}
						</Typography>
						<Typography className={classes.name}>
							Node ID: {this.state.user.node_id}
						</Typography>
						<Typography className={classes.name}>
							Type: {this.state.user.type}
						</Typography>
						<Typography className={classes.name}>
							<Button variant="outlined" href="this.state.users[0].repos_url">
								Find {this.state.user.login}'s Repo's Here
							</Button>
						</Typography>
					</Paper>
					<Grid container className={classes.friendsFollowersContainer}>
						<Grid item className={classes.follows}>
							<Typography className={classes.text}>
								{this.state.user.login} Follows
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
								{this.state.user.login} Is Followed By
							</Typography>
						</Grid>
						<Grid container className={classes.friendsFollowingItem}>
							{this.state.following.map((usersfg) => (
								<Grid item className={classes.avatarFollow}>
									<Avatar
										alt="Remy Sharp"
										src={usersfg.avatar_url}
										className={classes.avatar}
										onClick={this.handleSingleClickEventEnlarge}
									/>
									<Typography className={classes.name}>
										{usersfg.login}
									</Typography>
								</Grid>
							))}
						</Grid>
					</Grid>
				</Box>
				{/* ))} */}
				<footer>
					<Box className={classes.form}>
						<FormControl>
							<InputLabel htmlFor="input-with-icon-adornment">
								Search for the best here:
							</InputLabel>
							<Input
								type="text"
								value={this.state.user}
								onChange={this.searchBarHandleChange}
								id="input-with-icon-adornment"
								startAdornment={
									<InputAdornment position="start">
										<AccountCircle />
									</InputAdornment>
								}
							/>
						</FormControl>
					</Box>
				</footer>
			</div>
		);
	}
}

export default withStyles(styles)(UserCard);
