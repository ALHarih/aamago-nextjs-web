// Test script to fetch products directly
require('dotenv').config();
const { createClient } = require('@sanity/client');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-09';

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion,
});

async function testFetch() {
    try {
        console.log('Testing product fetch with full data...');
        const query = `*[_type == "product"] | order(_createdAt desc) {
            _id,
            _type,
            name,
            "slug": slug,
            price,
            description,
            "images": images,
            discount,
            stock,
            category->{name, slug},
            brand->{name, slug}
        }`;

        const products = await client.fetch(query);
        console.log(`\n✓ Found ${products.length} products`);
        console.log('\nFirst product:', JSON.stringify(products[0], null, 2));
    } catch (err) {
        console.error('✗ Error fetching products:', err);
    }
}

testFetch();
