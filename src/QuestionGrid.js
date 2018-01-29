import React, { Component } from 'react';
import QuestionScore from './Question';

export default class QuestionGrid extends Component {
	constructor(props) {
		super(props);

		this.showCategories = this.showCategories.bind(this);
	}

	componentDidMount() {
		this.showCategories();
	}

	showCategories() {
		if (this.props.categoryFetchAndSelect) {
			return this.props.activeCategories.map(category => {
				return <h1>{category}</h1>;
			});
		} else {
			console.log('running');
		}
	}

	render() {
		const questions = this.props.questions.filter(question => {
			if (question.name === this.props.category) {
				return question;
			}
		});

		return (
			<div className="game-wrap">
				{/* <div className="sidebar">{this.showCategories()}</div> */}
				<div className="question-grid">
					{questions.map(question => {
						return (
							<QuestionScore
								question={question}
								category={this.props.category}
							/>
						);
					})}
				</div>
			</div>
		);
	}
}
