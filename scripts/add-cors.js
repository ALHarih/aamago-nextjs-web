// Script to add CORS origin to Sanity project
require('dotenv').config();
const https = require('https');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
    console.error('Missing project ID or token');
    process.exit(1);
}

// Sanity Management API to add CORS origin
const options = {
    hostname: 'api.sanity.io',
    port: 443,
    path: `/v2021-06-07/projects/${projectId}/cors`,
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
    }
};

const data = JSON.stringify({
    origin: 'http://localhost:3000',
    allowCredentials: true
});

const req = https.request(options, (res) => {
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
        if (res.statusCode === 200 || res.statusCode === 201) {
            console.log('✓ Successfully added CORS origin: http://localhost:3000');
            console.log('Response:', body);
        } else {
            console.error(`✗ Failed to add CORS origin. Status: ${res.statusCode}`);
            console.error('Response:', body);
        }
    });
});

req.on('error', (error) => {
    console.error('✗ Error adding CORS origin:', error.message);
});

req.write(data);
req.end();
