import React from "react";
import axios from 'axios';

class UserCard extends React.Component {
	constructor() {
		super();
		this.state = {
			users: [],
		};
	}

	componentDidMount() {
		axios
			.get("https://api.github.com/users/Robert-Lark")
			.then((res) => {
				this.setState({ users: res });
				console.log(res);
			})
			.catch((err) => console.log(err));
	}
}

export default UserCard