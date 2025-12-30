// Fix products to use categories[] array instead of category field
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

async function main() {
    const products = await client.fetch('*[_type=="product"]{_id,name,category}');
    console.log(`Found ${products.length} products to fix`);

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const categorySlug = categories[i % categories.length];
        const categoryId = `category.${categorySlug}`;

        try {
            // Remove old category field and add categories[] array
            await client
                .patch(product._id)
                .unset(['category']) // Remove old single category field
                .set({
                    categories: [{ _type: 'reference', _ref: categoryId, _key: `cat-${i}` }]
                })
                .commit();
            console.log(`✓ Fixed ${product.name} - now has categories[]`);
        } catch (err) {
            console.error(`✗ Failed to fix ${product.name}:`, err.message);
        }
    }

    console.log('\\nProducts fixed! They now use categories[] array.');
}

main().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});
