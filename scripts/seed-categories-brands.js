// Sanity categories and brands seeding script
require('dotenv').config();
const { createClient } = require('@sanity/client');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
    console.error('Missing required env vars');
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2024-11-09',
});

const categories = [
    { _id: 'category.electronics', _type: 'category', name: 'Electronics', slug: { _type: 'slug', current: 'electronics' }, description: 'Latest electronics and gadgets' },
    { _id: 'category.fashion', _type: 'category', name: 'Fashion & Apparel', slug: { _type: 'slug', current: 'fashion' }, description: 'Trendy clothing and accessories' },
    { _id: 'category.home', _type: 'category', name: 'Home & Garden', slug: { _type: 'slug', current: 'home-garden' }, description: 'Everything for your home' },
    { _id: 'category.sports', _type: 'category', name: 'Sports & Outdoors', slug: { _type: 'slug', current: 'sports' }, description: 'Sports equipment and outdoor gear' },
    { _id: 'category.books', _type: 'category', name: 'Books & Media', slug: { _type: 'slug', current: 'books' }, description: 'Books, music, and movies' },
    { _id: 'category.toys', _type: 'category', name: 'Toys & Games', slug: { _type: 'slug', current: 'toys' }, description: 'Fun for all ages' },
];

const brands = [
    { _id: 'brand.samsung', _type: 'brand', name: 'Samsung', slug: { _type: 'slug', current: 'samsung' } },
    { _id: 'brand.apple', _type: 'brand', name: 'Apple', slug: { _type: 'slug', current: 'apple' } },
    { _id: 'brand.nike', _type: 'brand', name: 'Nike', slug: { _type: 'slug', current: 'nike' } },
    { _id: 'brand.adidas', _type: 'brand', name: 'Adidas', slug: { _type: 'slug', current: 'adidas' } },
    { _id: 'brand.sony', _type: 'brand', name: 'Sony', slug: { _type: 'slug', current: 'sony' } },
    { _id: 'brand.lg', _type: 'brand', name: 'LG', slug: { _type: 'slug', current: 'lg' } },
];

async function main() {
    console.log('Creating categories...');
    for (const category of categories) {
        try {
            await client.createOrReplace(category);
            console.log(`✓ Created category: ${category.name}`);
        } catch (err) {
            console.error(`✗ Failed to create category ${category.name}:`, err.message);
        }
    }

    console.log('\\nCreating brands...');
    for (const brand of brands) {
        try {
            await client.createOrReplace(brand);
            console.log(`✓ Created brand: ${brand.name}`);
        } catch (err) {
            console.error(`✗ Failed to create brand ${brand.name}:`, err.message);
        }
    }

    console.log('\\nSeeding categories and brands completed!');
}

main().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});
