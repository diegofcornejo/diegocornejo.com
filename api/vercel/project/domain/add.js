import { auth, cors } from '../../../../middlewares';
import createRedisClient from "../../../../utils/redis";

const VERCEL_PROJECT_ID = process.env.VERCEL_PROJECT_ID;
const VERCEL_API_TOKEN = process.env.VERCEL_API_TOKEN;

const addDomainToProject = async (domain) => {
	try {
		const response = await fetch(`https://api.vercel.com/v10/projects/${VERCEL_PROJECT_ID}/domains`, {
			body: JSON.stringify({ "name": domain }),
			headers: {
				"Authorization": `Bearer ${VERCEL_API_TOKEN}`,
				"Content-Type": "application/json"
			},
			method: "POST"
		});

		return await response.json();
	} catch (error) {
		console.error('Error adding domain to Vercel:', error);
		throw error;  // Re-throw to handle in the outer try-catch block
	}
}

const handler = async (req, res) => {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' });
	}

	let client;
	try {
		client = await createRedisClient();
		let { domain, redirect } = req.body;
		await addDomainToProject(domain);
		const subdomain = domain.split('.')[0];
		const response = await client.set(`domain:${subdomain}`, redirect);
		return res.status(200).json(response);
	} catch (error) {
		console.error('Error in handler:', error);
		return res.status(500).json({ message: 'An error occurred' });
	} finally {
		if (client) client.quit();
	}
};

export default cors(auth(handler));
