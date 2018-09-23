import React, { Component } from 'react';
import styled from 'styled-components';
import MultiInput from './MultiInput';
import axios from 'axios';

const ROOT_URL = 'http://multiinput-test.com';

export default class TestForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// emails: [],
			emails: ['Amsterdam@hotmail.com', 'mbo@google.com'],
			email: '',
			telephone: '',
			telephones: []
		};
	}
	addSingleValue(stateName, itemName) {
		let item = this.state[itemName];
		let array = this.state[stateName];
		array = array.concat([item]);
		this.setState({ [stateName]: array });
	}
	removeSingleValue = e => {
		let array = this.state[e.target.title].filter(
			word => word !== e.target.getAttribute('item')
		);
		this.setState({ [e.target.title]: array });
	};
	removeLastValue(arrayName) {
		let array = this.state[arrayName];
		array.pop();
		this.setState({ [arrayName]: array });
	}
	resetTempVal(itemName) {
		this.setState({ [itemName]: '' });
	}
	clearAll = e => {
		this.setState({ [e.target.title]: [] });
	};
	handleKey = e => {
		let itemName = e.target.getAttribute('name');
		let arrayName = itemName + 's';
		// when enter key , comma key was pressed
		// comma key code 188, tab code 9
		if (e.key === 'Enter' || e.keyCode === 188 || e.keyCode === 9) {
			if (this.state[itemName].length > 0) {
				e.preventDefault();
				//add value to array  and remove current value
				this.addSingleValue(arrayName, itemName);
				this.resetTempVal(itemName);
			}
		} else if (e.keyCode === 8) {
			// when backspace was pressed
			if (this.state[itemName].length > 0) {
				//when its middle of typing
			} else {
				//when there is no input
				e.preventDefault();
				//remove last value from array and remove current value
				this.removeLastValue(arrayName);
				this.resetTempVal(itemName);
			}
		}
	};
	handleChange = e => {
		this.setState({
			[e.target.getAttribute('name')]: e.target.value
		});
	};
	handleSubmit = e => {
		e.preventDefault();
		axios({
			method: 'post',
			url: ROOT_URL,
			data: {
				emails: this.state.emails,
				telephones: this.state.telephones
			},
			config: { headers: { 'Content-Type': 'multipart/form-data' } }
		})
			.then(function(response) {
				//handle success
				alert('sent');
				console.log(response);
			})
			.catch(function(response) {
				//handle error
				alert('error');
				console.log(response);
			});
	};

	render() {
		const { emails, telephones, email, telephone } = this.state;

		return (
			<div style={container}>
				<div style={inputContainer}>
					<p style={bold}>Uitbetalingen</p>
					<p>
						Bij elke uitbetaling van je tegoden zul je een notification
						ontvangen.
					</p>
					<form onSubmit={this.handleSubmit}>
						<Fieldset>
							<div className="input-form">
								<label>E-mailadressen </label>
								<MultiInput
									title="emails"
									tags={emails}
									tag={email}
									inputName="email"
									handleKey={this.handleKey}
									remove={this.removeSingleValue}
									onChange={this.handleChange}
								/>
								<label> Telefoonnumbers </label>
								<MultiInput
									title="telephones"
									tags={telephones}
									tag={telephone}
									inputName="telephone"
									handleKey={this.handleKey}
									remove={this.removeSingleValue}
									onChange={this.handleChange}
								/>
								<input className="inputBtn" type="submit" value="Submit" />
							</div>
						</Fieldset>
					</form>
				</div>
			</div>
		);
	}
}

const container = {
	padding: '10px',
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
	fontFamily: 'Roboto, Helvetica Neue,Helvetica,Arial,sans-serif',
	color: '#4f4f50',
	fontSize: '0.8em',
	weight: '200'
};
const inputContainer = {
	backgroundColor: '#f9f5f5',
	maxWidth: '500px',
	margin: 'auto',
	border: '1px solid #e4dfdf',
	borderRadius: '4px',
	padding: '15px',
	textAlign: 'left'
};
const inputBox = {
	boxSizing: 'border-box',
	position: 'relative'
};
const input = {
	backgroundColor: '#fff',
	borderRadius: '4px',
	border: '1px solid #ccc',
	color: '#777777',
	display: 'flex',
	borderSpacing: 0,
	fontSize: '12px',
	padding: '1% 3%',
	outline: 'none',
	position: 'relative',
	width: `94%`,
	minHeight: '30px',
	height: 'auto',
	overflow: 'auto'
};
const noBorder = {
	border: 'none'
};
const mgb20 = {
	marginBottom: '20px'
};
const bold = {
	fontWeight: '600'
};
const Fieldset = styled.fieldset`
	border: none;
	padding: 0;
	margin: 0;
`;
