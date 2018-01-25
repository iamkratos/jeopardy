import React, { Component } from 'react';
import logo from './logo.svg';

import QuestionsGrid from './QuestionGrid';
import Question from './Question';
import Nav from './Nav';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import data from './questions.json';

import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			questions: data.jeopardy,
			category: 'ROBOTS'
		};

		this.categoryChange = this.categoryChange.bind(this);
	}

	categoryChange(e) {
		console.log(e.target.dataset.cat);

		this.setState({
			category: e.target.dataset.cat
		});
	}
	render() {
		console.log('data', data);

		const questions = this.state.questions.filter(question => {
			if (question.name === this.state.category) {
				return question;
			}
		});
		console.log('Questions', questions);

		return (
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Bob's Jeopardy</h1>
				</header>

				<p className="App-intro">Regular Jeopardy</p>
				<p className="App-intro">Categories</p>
				<Nav
					categories={this.state.questions}
					categoryChange={this.categoryChange}
				/>
				<p className="App-intro">Current Category: {this.state.category}</p>

				<Router>
					<div>
						<Route
							exact
							path="/"
							render={props => (
								<QuestionsGrid
									questions={this.state.questions}
									category={this.state.category}
								/>
							)}
						/>
						<Route exact path="/question/:question" component={Question} />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
