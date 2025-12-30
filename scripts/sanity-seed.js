/*
  Sanity seed script
  - Uploads images from ./images/products
  - Creates demo product documents named "Demo Product 1", "Demo Product 2", etc.

  Usage:
    SANITY_API_TOKEN=your_token \
    NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id \
    NEXT_PUBLIC_SANITY_DATASET=your_dataset \
    node ./scripts/sanity-seed.js
*/

const fs = require('fs');
const path = require('path');
// Load .env automatically if present (safe, wrapped in try/catch)
try {
    require('dotenv').config();
} catch (e) {
    // dotenv not available; fall back to manual .env parsing
}
// Fallback: manually parse .env in repo root if present (no external dependency required)
const dotenvPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(dotenvPath)) {
    const content = fs.readFileSync(dotenvPath, 'utf8');
    content.split(/\r?\n/).forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const idx = trimmed.indexOf('=');
        if (idx === -1) return;
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1);
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
            val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
    });
}
const sanityClientPkg = require('@sanity/client');
const sanityClient = sanityClientPkg && sanityClientPkg.default ? sanityClientPkg.default : sanityClientPkg;

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;
const DRY_RUN = process.argv.includes('--dry-run');

if (!projectId || !dataset || (!token && !DRY_RUN)) {
    if (!DRY_RUN) {
        console.error('Missing environment variables. Please set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_TOKEN');
        process.exit(1);
    } else {
        console.warn('Running in --dry-run mode: Sanity env vars are missing or incomplete. Proceeding with simulation.');
    }
}

let client = null;
if (!DRY_RUN) {
    client = sanityClient({
        projectId,
        dataset,
        token,
        useCdn: false,
        apiVersion: '2025-01-01',
    });
}

async function uploadImage(filePath, filename) {
    if (DRY_RUN) {
        // Return a fake asset id so we can simulate document creation without contacting Sanity
        return { _id: `drafts.asset-${filename}` };
    }

    const stream = fs.createReadStream(filePath);
    const asset = await client.assets.upload('image', stream, { filename });
    return asset;
}

function slugify(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

async function main() {
    const imagesDir = path.join(__dirname, '..', 'images', 'products');
    if (!fs.existsSync(imagesDir)) {
        console.error('Images directory not found:', imagesDir);
        process.exit(1);
    }

    const files = fs
        .readdirSync(imagesDir)
        .filter((f) => /\.(png|jpe?g|webp)$/i.test(f))
        .sort();

    if (files.length === 0) {
        console.error('No product images found in', imagesDir);
        process.exit(1);
    }

    const maxProducts = Math.min(files.length, 12); // create up to 12 demo products
    console.log(`Found ${files.length} images, creating ${maxProducts} demo products`);

    for (let i = 0; i < maxProducts; i++) {
        const index = i + 1;
        const file = files[i];
        const filePath = path.join(imagesDir, file);
        try {
            console.log(`Uploading image (${index}): ${file}`);
            const asset = await uploadImage(filePath, file);

            const name = `Demo Product ${index}`;
            const slug = slugify(name) + `-${index}`; // ensure unique

            const doc = {
                _id: `product.demo-product-${index}`,
                _type: 'product',
                name,
                slug: { _type: 'slug', current: slug },
                description: 'Dummy description for demo product.',
                price: 19.99 + index,
                discount: 0,
                stock: 10 + index,
                images: [
                    {
                        _type: 'image',
                        asset: { _type: 'reference', _ref: asset._id },
                    },
                ],
            };

            if (DRY_RUN) {
                console.log('--- DRY RUN: would create document ---');
                console.log(JSON.stringify(doc, null, 2));
            } else {
                await client.createOrReplace(doc);
                console.log(`Created product: ${doc._id}`);
            }
        } catch (err) {
            console.error('Error creating demo product for', file, err);
        }
    }

    console.log('Seeding finished');
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
