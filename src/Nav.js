import React, { Component } from 'react';

export default class Nav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			categories: this.props.categories
		};
	}

	render() {
		const links = this.state.categories.map(category => {
			return (
				<li>
					<a
						className="category"
						onClick={this.props.categoryChange}
						data-cat={category.name}
						href="#"
					>
						{category.name}
					</a>
				</li>
			);
		});

		return (
			<div>
				<ul className="cat-list">{links}</ul>
			</div>
		);
	}
}
