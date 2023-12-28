import fs from 'fs';
import path from 'path';
import {cors} from '../../middlewares';

const handler = async (req, res) => {
	const filePath = path.join(process.cwd(), 'api', 'profile', 'profile.jpeg');
	fs.readFile(filePath, function(err, data) {
		if (err) throw err;
		res.writeHead(200, {'Content-Type': 'image/jpeg'});
		res.end(data);
	});
};

export default cors(handler);