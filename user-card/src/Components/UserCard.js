import React from "react";
import axios from "axios";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
	root: {
        flexGrow: 1,
        display: 'flex',
        justifyContent: "center",
        
	},
	avatar: {
		border: "2px solid black",
        borderRadius: "250px",
        height: "13em"
	},
});

class UserCard extends React.Component {
	constructor() {
		super();
		this.state = {
			users: [],
		};
	}

	componentDidMount() {
		axios
			.get("https://api.github.com/users/robert-lark/followers")
			.then((res) => {
				this.setState({ users: res.data });
				console.log(this.state.users);
			})
			.catch((err) => console.log(err));
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root}>
				{this.state.users.map((users) => (
					<Grid item xs={3}>
						<img
							className={classes.avatar}
                            alt="avatar"
                            key={users}
							src={users.avatar_url}
						/>
					</Grid>
				))}
			</div>
		);
	}
}

export default withStyles(styles)(UserCard);
