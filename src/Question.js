import React, { Component } from 'react';

export default class Question extends Component {
	render() {
		return (
			<div>
				<h1>Question</h1>
				<h1>{this.params}</h1>
			</div>
		);
	}
}
