import axios from 'axios';
export const POST_MULTIINPUT = 'postMultiInput';

const ROOT_URL = 'http://multiinput-test.com';

export function postMultiInput(values, callback) {
	const request = axios
		.post(`${ROOT_URL}/inputs`, values)
		.then(() => callback());

	return {
		type: POST_MULTIINPUT,
		payload: request
	};
}
