import React, { Component } from 'react';
import QuestionsGrid from './QuestionGrid';
import Question from './Question';
import MainNav from './MainNav';
import CatNav from './CatNav';

import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect
} from 'react-router-dom';

import data from './questions.json';

import './App.css';

class App extends Component {
	constructor() {
		super();

		this.state = {
			questions: [],
			activeCategories: [],
			categoryFetchAndSelect: false,
			categories: [],
			random: true
		};

		this.handleCategorySelectAndFetch = this.handleCategorySelectAndFetch.bind(
			this
		);

		this.reset = this.reset.bind(this);
		this.getCategories = this.getCategories.bind(this);
	}

	componentDidMount() {
		// picks random categories, sets categories state
		this.getCategories();
	}

	getCategories() {
		let x = 1;
		let y = 90;
		let z = Math.floor(Math.random() * (y - x + 1) + x);
		console.log(z);
		const url = `http://jservice.io/api/categories?count=10&offset=${z}`;
		fetch(url)
			.then(data => {
				return data.json();
			})
			.then(data => {
				return this.setState({
					categories: data
				});
			});
	}

	reset() {
		return this.setState({
			categoryFetchAndSelect: false,
			questions: [],
			activeCategories: []
		});
	}

	handleCategorySelectAndFetch() {
		if (
			!this.state.categoryFetchAndSelect &&
			document.getElementsByClassName('selected').length > 0
		) {
			let categories = document.getElementsByClassName('selected');
			console.log('cat', categories);

			let activeCategories = [];

			for (var i = 0; i < categories.length; i++) {
				activeCategories.push(categories[i].textContent);
			}

			let questions = [];

			const processFetching = async id => {
				await fetch(`http://jservice.io/api/clues?category=${id}
			`)
					.then(data => {
						return data;
					})
					.then(data => {
						return data.json();
					})
					.then(data => {
						const categories = data.slice(0, 5).map(data => data);

						this.setState({
							questions: this.state.questions.concat(categories)
						});
					});
			};

			Promise.all(
				Array.from(categories).map(category => {
					this.setState({
						categories: this.state.categories.concat(category.textContent)
					});
					processFetching(parseFloat(category.dataset.category));
				})
			);

			this.setState({
				activeCategories: activeCategories,
				categoryFetchAndSelect: true
			});
		}
	}
	render() {
		return (
			<div className="App">
				<Router>
					<div>
						<MainNav
							reset={this.reset}
							random={this.state.random}
							getCategories={this.getCategories}
						/>
						<Route
							exact
							path="/"
							render={props => (
								<CatNav
									handleCategorySelectAndFetch={
										this.handleCategorySelectAndFetch
									}
									categoryFetchAndSelect={this.state.categoryFetchAndSelect}
									categories={this.state.categories}
									questions={this.state.questions}
								/>
							)}
						/>
						<Route
							exact
							path="/game/:id"
							render={props => (
								<QuestionsGrid
									questions={this.state.questions}
									categories={this.state.categories}
									activeCategories={this.state.activeCategories}
									categoryFetchAndSelect={this.state.categoryFetchAndSelect}
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
