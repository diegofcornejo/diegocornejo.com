import {auth, cors} from '../../middlewares';
import { STSClient, GetCallerIdentityCommand } from "@aws-sdk/client-sts";

const handler = async (req, res) => {
	try {
		const stsClient = new STSClient({ region: 'us-east-1' });
		const stsCommand = new GetCallerIdentityCommand({});
		const stsResponse = await stsClient.send(stsCommand);
		console.log("🚀 ~ file: index.mjs:9 ~ handler ~ stsResponse:", stsResponse)
		return res.status(200).json(stsResponse);
	} catch (error) {
		console.log("🚀 ~ file: index.mjs:11 ~ handler ~ error", error)
		return res.status(500).json(error);
	}
};

export default cors(auth(handler));