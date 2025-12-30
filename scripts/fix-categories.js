// Fix categories to use 'title' field instead of 'name'
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

async function main() {
    const categories = await client.fetch('*[_type=="category"]{_id, name, title}');
    console.log(`Found ${categories.length} categories to check`);

    for (const category of categories) {
        // If category has 'name' but not 'title', fix it
        if (category.name && !category.title) {
            try {
                await client
                    .patch(category._id)
                    .set({ title: category.name })
                    .unset(['name'])
                    .commit();
                console.log(`✓ Fixed category ${category._id}: "${category.name}" -> title`);
            } catch (err) {
                console.error(`✗ Failed to fix ${category._id}:`, err.message);
            }
        } else if (category.title) {
            console.log(`✓ Category ${category._id} already has title: "${category.title}"`);
        }
    }

    console.log('\\nCategories fixed!');
}

main().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});
