import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import FontAwesome from 'react-fontawesome';

export default class QuestionScore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			answered: false,
			answeredCorrectly: false
		};
		this.toggle = this.toggle.bind(this);
		this.answer = this.answer.bind(this);
	}

	toggle() {
		this.setState({
			modal: !this.state.modal
		});
	}

	answer() {
		this.setState({
			answered: !this.state.answered
		});
	}

	render() {
		const content = () => {
			if (!this.state.answered) {
				return <p>{this.props.question.question}</p>;
			} else {
				return <p>{this.props.question.answer}</p>;
			}
		};

		const isAnswered = () => {
			if (this.state.answered) {
				return <FontAwesome name="check" />;
			} else {
				return (
					<div>
						{this.props.question.value || '1000'}
						<span>{this.props.question.category.title}</span>
					</div>
				);
			}
		};
		return (
			<div className="score-wrap--outer" onClick={this.toggle}>
				<div className="score-wrap">
					<div className="score-wrap--text">{isAnswered()}</div>
				</div>

				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
				>
					<ModalHeader toggle={this.toggle}>
						{this.props.question.category.title} for{' '}
						{this.props.question.value || '1000'}{' '}
					</ModalHeader>
					<ModalBody>{content()}</ModalBody>
					<ModalFooter>
						<Button color="primary" onClick={this.answer}>
							Show Answer
						</Button>{' '}
						<Button color="secondary" onClick={this.toggle}>
							Cancel
						</Button>
					</ModalFooter>
				</Modal>
			</div>
		);
	}
}
