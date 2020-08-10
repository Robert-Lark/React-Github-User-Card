import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Gsap from "./gsap";
import { Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
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
	showEl: {
		transition: "opacity 5.5s",
		opacity: 1,
	},
	userCardContainer: {
		opacity: 1,
		display: "flex",
		flexDirection: "Column",
		justifyContent: "space-around",
		alignItems: "center",
		marginTop: "50px",
		width: "100vw",
		height: "80vh",
	},
	friendsFollowersItem: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		width: "100vw",
	},
	friendsFollowingItem: {
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
		width: "90vw",
	},
	text: {
		fontSize: "2em",
	},
	follows: {
		textAlign: "center",
		width: "50vw",
		display: "flex",
		justifyContent: "space-around",
		alignItems: "center",
	},
	follows2: {
		textAlign: "center",
		marginTop: "5%",
		marginBottom: "5%",
		display: "flex",
		flexDirection: "Column",
		justifyContent: "space-around",
		alignItems: "center",
	},
	formBox: {
		height: "20vh",
		width: "100vw",
		display: "flex",
		flexDirection: "column",
		justifyContent: "space-around",
		alignItems: "center",
	},
	displayNone: {
		display: "none",
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
			search: "",
		};
	}

	handleSingleClickEventFadeIn = () => {
		this.setState({
			...this.state,
			isActive0: !this.state.isActive0,
		});
	};

	searchBarHandleChange = (e) => {
		console.log("changes called");
		this.setState({
			...this.state,
			search: e.target.value,
			isActive2: false,
			isActive1: false,
		});
	};

	searchSubmit = (e) => {
		console.log("changes called");
		axios
			.get(`https://api.github.com/users/${this.state.search}`)
			.then((res) => {
				this.setState({
					...this.state,
					search: res.data,
					isActive1: false,
					isActive2: !this.state.isActive2,
				});
			})
			.catch((err) => console.log(err));
		this.setState({
			...this.state,
			search: "",
		});
	};

	componentDidMount() {
		axios
			.get("https://api.github.com/users/robert-lark/followers")
			.then((res) => {
				this.setState({ ...this.state, users: res.data });
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
					this.setState({ ...this.state, usersFollowers: res.data });
				})
				.catch((err) => console.log(err));
			axios
				.get(`https://api.github.com/users/${this.state.user.login}/following`)
				.then((res) => {
					this.setState({ ...this.state, following: res.data });
				})
				.catch((err) => console.log(err));
		}
		if (prevState.search !== this.state.search) {
			axios
				.get(
					`https://api.github.com/users/${this.state.search.login}/followers`
				)
				.then((res) => {
					this.setState({ ...this.state, usersFollowers: res.data });
				})
				.catch((err) => console.log(err));
			axios
				.get(
					`https://api.github.com/users/${this.state.search.login}/following`
				)
				.then((res) => {
					this.setState({ ...this.state, following: res.data });
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
									onClick={() =>
										this.setState({
											...this.state,
											user: users,
											isActive1: !this.state.isActive1,
											isActive3: true,
										})
									}
								/>
								<Typography className={classes.name}>{users.login}</Typography>
							</Grid>
						))}
					</Grid>
				</div>

				{/* USERCARD */}
				<div
					className={
						this.state.isActive1 === true ? classes.showEl : classes.hideEl
					}
				>
					<div
						className={
							this.state.isActive1 === true
								? classes.showEl
								: classes.displayNone
						}
					>
						<Grid container className={classes.userCardContainer}>
							<Paper variant="outlined" className={classes.paper}>
								<Typography className={classes.nameBold}>
									{this.state.user.login}
								</Typography>
								<img
									src={`https://ghchart.rshah.org/${this.state.user.login}`}
									alt={`${this.state.users.login}'s Github chart`}
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
									<Button variant="outlined" href={this.state.user.repos_url}>
										Find {this.state.user.login}'s Repo's Here
									</Button>
								</Typography>
							</Paper>
							<Grid item className={classes.follows}>
								<Typography className={classes.text}>
									{this.state.user.login} Follows
								</Typography>
							</Grid>
						</Grid>

						<Grid
							container
							justify="center"
							spacing={5}
							className={classes.root}
						>
							{this.state.usersFollowers.map((users) => (
								<Grid item className={classes.avatarTop}>
									<Avatar
										key={users}
										alt="user"
										src={users.avatar_url}
										className={classes.avatar}
									/>
									<Typography className={classes.name}>
										{users.login}
									</Typography>
								</Grid>
							))}
						</Grid>
						<Grid container className={classes.follows2}>
							<Grid item>
								<Typography className={classes.text}>
									{this.state.user.login} Is Followed By
								</Typography>
							</Grid>
						</Grid>
						<Grid
							container
							justify="center"
							spacing={5}
							className={classes.root}
						>
							{this.state.following.map((users) => (
								<Grid item className={classes.avatarTop}>
									<Avatar
										key={users}
										alt="user"
										src={users.avatar_url}
										className={classes.avatar}
									/>
									<Typography className={classes.name}>
										{users.login}
									</Typography>
								</Grid>
							))}

						
						</Grid>
					</div>
				</div>

				{/* SECOND USERCARD FROM SEARCH */}

				<div
					className={
						this.state.isActive2 === true ? classes.showEl : classes.hideEl
					}
				>
					<div
						className={
							this.state.isActive2 === true
								? classes.showEl
								: classes.displayNone
						}
					>
						<Grid container className={classes.userCardContainer}>
							<Paper variant="outlined" className={classes.paper}>
								<Typography className={classes.nameBold}>
									{this.state.search.login}
								</Typography>
								<img
									src={`https://ghchart.rshah.org/${this.state.search.login}`}
									alt={`${this.state.search.login}'s Github chart`}
								/>
								<Typography className={classes.name}>
									{this.state.search.html_url}
								</Typography>
								<Typography className={classes.name}>
									ID: {this.state.search.id}
								</Typography>
								<Typography className={classes.name}>
									Node ID: {this.state.search.node_id}
								</Typography>
								<Typography className={classes.name}>
									Type: {this.state.search.type}
								</Typography>
								<Typography className={classes.name}>
									<Button variant="outlined" href={this.state.user.repos_url}>
										Find {this.state.search.login}'s Repo's Here
									</Button>
								</Typography>
							</Paper>
							<Grid item className={classes.follows}>
								<Typography className={classes.text}>
									{this.state.search.login} Follows
								</Typography>
							</Grid>
						</Grid>

						<Grid
							container
							justify="center"
							spacing={5}
							className={classes.root}
						>
							{this.state.following.map((users) => (
								<Grid item className={classes.avatarTop}>
									<Avatar
										key={users}
										alt="user"
										src={users.avatar_url}
										className={classes.avatar}
									/>
									<Typography className={classes.name}>
										{users.login}
									</Typography>
								</Grid>
							))}
						</Grid>
						<Grid container className={classes.follows2}>
							<Grid item>
								<Typography className={classes.text}>
									{this.state.search.login} Is Followed By
								</Typography>
							</Grid>
						</Grid>
						<Grid
							container
							justify="center"
							spacing={5}
							className={classes.root}
						>
							{this.state.usersFollowers.map((users) => (
								<Grid item className={classes.avatarTop}>
									<Avatar
										key={users}
										alt="user"
										src={users.avatar_url}
										className={classes.avatar}
									/>
									<Typography className={classes.name}>
										{users.login}
									</Typography>
								</Grid>
							))}
						</Grid>
					</div>
				</div>
				<div
					className={
						this.state.isActive3 === true
							? classes.showEl
							: classes.displayNone
					}
				>
				<Grid item className={classes.formBox}>
					<FormControl>
						<InputLabel htmlFor="input-with-icon-adornment">
							Search for the best here:
									</InputLabel>
						<Input
							type="text"
							value={this.state.search}
							onChange={this.searchBarHandleChange}
							id="input-with-icon-adornment"
							startAdornment={
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							}
						/>
					</FormControl>
					<Button onClick={this.searchSubmit}>Search</Button>
				</Grid>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(UserCard);
