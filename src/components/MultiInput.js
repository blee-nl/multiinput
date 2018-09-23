import React, { Component } from 'react';
import styled from 'styled-components';
export default class MultiInput extends Component {
	constructor(props) {
		super(props);
		this.focusInput = this.focusInput.bind(this);
	}
	focusInput() {
		this.refs[this.props.inputName].focus();
	}
	render() {
		const props = this.props;
		const group = props.tags;
		const item = props.tag;
		return (
			<div className="Select multiInput">
				<div className="mutltiInputBox" onClick={this.focusInput}>
					<span className="itemsWrapper inlineBlock">
						{props.tags.length > 0
							? group.map(function(x) {
									return (
										<div className="itemBox" key={group.indexOf(x)}>
											<span className="itemVal">{x}</span>
											<span
												title={props.title}
												item={x}
												className="removeIcon"
												onClick={props.remove}
											>
												×
											</span>
										</div>
									);
							  })
							: ''}

						<div className="inputSection inlineBlock">
							<input
								value={item}
								name={props.inputName}
								item={item}
								ref={props.inputName}
								size={item.length + 3}
								onKeyDown={props.handleKey}
								onChange={props.onChange}
							/>
						</div>
					</span>
				</div>
			</div>
		);
	}
}
