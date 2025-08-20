import {auth, cors} from '../../middlewares';

const handler = async (req, res) => {
	console.log("Gridia Webhook - Request headers:", req.headers);
	console.log("Gridia Webhook - Request body:", JSON.stringify(req.body, null, 2));
	return res.status(200).json({ message: "Webhook received successfully" });
};

export default cors(auth(handler));