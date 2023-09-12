const cors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true)
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    // res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res)
}

const subdomains = {
    blog: process.env.BLOG_URL,
    meet: process.env.MEET_URL,
    calendar: process.env.CALENDAR_URL,
};

const handler = (req, res) => {
    const { host } = req.headers;
    const subdomain = host.split('.')[0];

    if (subdomains[subdomain]) {
        return res.redirect(subdomains[subdomain]);
    }

    return res.redirect(process.env.BLOG_URL);
};

module.exports = handler;