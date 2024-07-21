import { auth, cors } from '../../middlewares';

const URL = 'https://osn.culturaguate.com/conciertos-de-la-orquesta/';
const searchTerms = ['Your Name', 'your name', 'YOUR NAME'];

const sendEmail = async () => {
	const response = await fetch('https://sdk.api.diegocornejo.com/v1/mail/ses/send', {
		body: JSON.stringify({
			"from": {
				"name": "OSN Scraper",
				"email": "noreply@diegocornejo.com"
			},
			"to": [
				"diegof.cornejo@gmail.com",
				"mirzailopez@gmail.com"
			],
			"subject": "YOUR NAME is available"
		}),
		headers: {
			"x-api-key": `${process.env.SDK_API_KEY}`,
			"Content-Type": "application/json"
		},
		method: "POST"
	});
	return await response.json();
};

const handler = async (_req, res) => {
	try {
		const response = await fetch(URL);
		const text = await response.text();

		// Check if any of the search terms appear in the text, ignoring case
		const foundTerm = searchTerms.some(term => text.toLowerCase().includes(term.toLowerCase()));

		if (foundTerm) {
			console.info(`One of the search terms appears on the page.`);
			await sendEmail();
			res.status(200).json({ message: `One of the search terms appears on the page.` });
		} else {
			console.info(`None of the search terms appear on the page.`);
			res.status(200).json({ message: `None of the search terms appear on the page.` });
		}
	} catch (error) {
		console.error('Error during the request:', error);
		res.status(500).json({ message: 'Error processing the request' });
	}
};

export default cors(auth(handler));
