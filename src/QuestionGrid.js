import React, { Component } from 'react';
import QuestionScore from './QuestionScore';

export default class QuestionGrid extends Component {
	render() {
		const questions = this.props.questions.filter(question => {
			if (question.name === this.props.category) {
				return question;
			}
		});

		return (
			<div className="question-grid">
				{questions.map(question => {
					return question.questions.map(question => {
						return (
							<QuestionScore
								question={question}
								category={this.props.category}
							/>
						);
					});
				})}
			</div>
		);
	}
}
