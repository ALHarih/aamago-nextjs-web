// Sanity check script - lists product docs
require('dotenv').config();
const { createClient } = require('@sanity/client');
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;
if (!projectId || !dataset || !token) {
    console.error('Missing required env vars (NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_READ_TOKEN or SANITY_API_TOKEN)');
    process.exit(1);
}
const client = createClient({ projectId, dataset, apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01', token, useCdn: false });
(async () => {
    try {
        const products = await client.fetch('*[_type=="product"]{_id,name,slug}');
        console.log('Found', products.length, 'products');
        console.log(products.slice(0, 10));
    } catch (err) {
        console.error('Error querying products', err);
        process.exit(1);
    }
})();