import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export default class QuestionScore extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modal: false,
			answered: false
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
		return (
			<div className="score-wrap--outer" onClick={this.toggle}>
				<div className="score-wrap">
					<div className="score-wrap--text">{this.props.question.value}</div>
				</div>

				<Modal
					isOpen={this.state.modal}
					toggle={this.toggle}
					className={this.props.className}
				>
					<ModalHeader toggle={this.toggle}>
						{this.props.category} for {this.props.question.value}{' '}
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
