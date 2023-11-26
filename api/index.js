import { cors } from '../middlewares'
import createRedisClient from "../utils/redis"

const handler = async (req, res) => {

	let client;
	let REDIRECT_URL = process.env.DEFAULT_URL;
	try {
		client = await createRedisClient();
		const { host } = req.headers;
		const subdomain = host.split('.')[0];
		const REDIRECT_URL_VALUE = await client.get(`domain:${subdomain}`);
		if (REDIRECT_URL_VALUE) REDIRECT_URL = REDIRECT_URL_VALUE;
	} catch (error) {
	} finally {
		client.quit();
		return res.redirect(REDIRECT_URL);
	}
};

export default cors(handler);