// Update products with categories and brands
require('dotenv').config();
const { createClient } = require('@sanity/client');

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2024-11-09',
});

const categories = ['electronics', 'fashion', 'home', 'sports', 'books', 'toys'];
const brands = ['samsung', 'apple', 'nike', 'adidas', 'sony', 'lg'];

async function main() {
    const products = await client.fetch('*[_type=="product"]{_id,name}');
    console.log(`Found ${products.length} products to update`);

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const categorySlug = categories[i % categories.length];
        const brandSlug = brands[i % brands.length];

        try {
            await client
                .patch(product._id)
                .set({
                    category: { _type: 'reference', _ref: `category.${categorySlug}` },
                    brand: { _type: 'reference', _ref: `brand.${brandSlug}` }
                })
                .commit();
            console.log(`✓ Updated ${product.name} with category and brand`);
        } catch (err) {
            console.error(`✗ Failed to update ${product.name}:`, err.message);
        }
    }

    console.log('\\nProducts updated successfully!');
}

main().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});
