import React, { Component } from 'react';
import {
	Dropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	Button
} from 'reactstrap';

import firebase from './base';

import { Link } from 'react-router-dom';

import logo from './logo.svg';

export default class MainNav extends Component {
	constructor(props) {
		super(props);

		this.toggle = this.toggle.bind(this);
		this.renderLogin = this.renderLogin.bind(this);

		this.state = {
			dropdownOpen: false,
			uid: null,
			owner: null,
			random: this.props.random
		};
	}

	componentDidMount() {
		this.buttonCheck;
	}

	toggle() {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	}

	renderLogin() {
		return (
			<div className="dropdown-wrap">
				<Button onClick={this.props.getCategories} color="secondary">
					Random
				</Button>{' '}
				<Link to="/" onClick={this.props.reset}>
					<Button color="secondary">Reset</Button>{' '}
				</Link>
			</div>
		);
	}

	render() {
		const logout = <button>Logout</button>;
		// Check if they are logged in
		const loginProcess = () => {
			if (!this.state.uid) {
				return <div>{this.renderLogin()}</div>;
			}

			if (this.state.uid !== this.state.owner) {
				return (
					<div>
						<p>Sorry, but this isn't your game baby!</p>
						{logout}
					</div>
				);
			}
		};
		return (
			<header className="App-header">
				<div className="logo-wrap">
					<Link to="/">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">Bob's Jeopardy</h1>
					</Link>
				</div>
				<div className="link-wrap">
					<div className="login-wrap">{loginProcess()}</div>
				</div>
			</header>
		);
	}
}
