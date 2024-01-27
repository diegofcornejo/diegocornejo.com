import { cors } from '../middlewares'

const handler = async (req, res) => {
	const response = {
		status: "success",
		data: {
			online: false,
		},
	};
	res.status(200).json(response);
};

export default cors(handler);
