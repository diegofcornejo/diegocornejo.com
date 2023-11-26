import { cors } from '../middlewares'
import createRedisClient from "../utils/redis"

const DEFAULT_URL = process.env.DEFAULT_URL;

const handler = async (req, res) => {
	let client;
	try {
		client = await createRedisClient();
		const { host } = req.headers;
		const subdomain = host.split('.')[0];
		const redirectUrl = await client.get(`domain:${subdomain}`) || DEFAULT_URL;
		return res.redirect(redirectUrl);
	} catch (error) {
		console.error('Error handling redirect:', error);
		return res.redirect(DEFAULT_URL);
	} finally {
		if (client) client.quit();
	}
};

export default cors(handler);
