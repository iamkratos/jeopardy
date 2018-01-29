import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import uuidv1 from 'uuid';

export default class CatNav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			error: '',
			questions: this.props.questions
		};
		this.categorySelect = this.categorySelect.bind(this);
	}

	categorySelect(e) {
		e.preventDefault();

		if (document.getElementsByClassName('selected').length < 5) {
			e.target.classList.toggle('selected');
			console.log('selected');
		} else if (e.target.classList.contains('selected')) {
			e.target.classList.toggle('selected');
			this.setState({
				error: ''
			});
		} else {
			this.setState({
				error: 'Only 5 can be selected'
			});
		}
	}

	printErrorMessage() {
		if (this.state.error) {
			return <p>{this.state.error}</p>;
		}
	}

	render() {
		const categoryBar = () => {
			const gameId = `/game/${uuidv1()}`;
			if (!this.props.categoryFetchAndSelect) {
				return (
					<div className="categoryBar">
						<p className="App-intro">Pick 5 Categories</p>
						<div className="error">{this.printErrorMessage()}</div>
						<ul className="cat-list">{links}</ul>
						<div className="btn-wrap">
							<Link
								to={gameId}
								onClick={this.props.handleCategorySelectAndFetch}
								className="btn btn-blue"
							>
								Go
							</Link>
						</div>
					</div>
				);
			}
		};
		const links = this.props.categories.map(category => {
			return (
				<li>
					<a
						className="category"
						onClick={this.categorySelect}
						data-category={category.id}
						href="#"
					>
						{category.title}
					</a>
				</li>
			);
		});

		return <div>{categoryBar()}</div>;
	}
}
