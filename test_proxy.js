const https = require('https');
const agent = new https.Agent({ rejectUnauthorized: false });
https.get('https://api.applik-ni.com/api/v1/auth/login', { agent }, (res) => {
  let body = '';
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log('STATUS:', res.statusCode, 'BODY:', body));
}).on('error', err => console.log('ERROR:', err));
