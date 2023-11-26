const auth = fn => async (req, res) => {
	const apikey = req.headers['x-api-key'] || req.query['x-api-key'];
	if (!apikey) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
	if(apikey !== process.env.API_KEY) {
		return res.status(401).json({ error: 'Unauthorized' });
	}
	return await fn(req, res);
}

export default auth;