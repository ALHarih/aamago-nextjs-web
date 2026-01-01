/*
  Sanity Master Seed Script
  - Loads env vars safely.
  - Seeds Categories & Brands.
  - Uploads images from ./images/products.
  - Creates Demo Products with proper references (Category, Brand).
  - Cleans up old demo data (optional/implicit via overwrite).
*/

const fs = require('fs');
const path = require('path');
const sanityClientPkg = require('@sanity/client');
const sanityClient = sanityClientPkg && sanityClientPkg.default ? sanityClientPkg.default : sanityClientPkg;

// --- 1. ENV CONFIGURATION ---
try { require('dotenv').config(); } catch (e) { }
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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;
const DRY_RUN = process.argv.includes('--dry-run');

if (!projectId || !dataset || (!token && !DRY_RUN)) {
    console.error('Missing required env vars: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_TOKEN');
    process.exit(1);
}

const client = DRY_RUN ? null : sanityClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2025-01-01',
});

// --- 2. DATA CONSTANTS ---
const CATEGORIES = [
    { _id: 'category.electronics', _type: 'category', name: 'Electronics', slug: { _type: 'slug', current: 'electronics' }, description: 'Latest electronics and gadgets' },
    { _id: 'category.fashion', _type: 'category', name: 'Fashion & Apparel', slug: { _type: 'slug', current: 'fashion' }, description: 'Trendy clothing and accessories' },
    { _id: 'category.home', _type: 'category', name: 'Home & Garden', slug: { _type: 'slug', current: 'home-garden' }, description: 'Everything for your home' },
    { _id: 'category.sports', _type: 'category', name: 'Sports & Outdoors', slug: { _type: 'slug', current: 'sports' }, description: 'Sports equipment and outdoor gear' },
    { _id: 'category.toys', _type: 'category', name: 'Toys', slug: { _type: 'slug', current: 'toys' } },
];

const BRANDS = [
    { _id: 'brand.samsung', _type: 'brand', name: 'Samsung', slug: { _type: 'slug', current: 'samsung' } },
    { _id: 'brand.apple', _type: 'brand', name: 'Apple', slug: { _type: 'slug', current: 'apple' } },
    { _id: 'brand.sony', _type: 'brand', name: 'Sony', slug: { _type: 'slug', current: 'sony' } },
    { _id: 'brand.nike', _type: 'brand', name: 'Nike', slug: { _type: 'slug', current: 'nike' } },
    { _id: 'brand.adidas', _type: 'brand', name: 'Adidas', slug: { _type: 'slug', current: 'adidas' } },
    { _id: 'brand.generic', _type: 'brand', name: 'Generic', slug: { _type: 'slug', current: 'generic' } },
];

// --- 3. HELPER FUNCTIONS ---
function slugify(name) {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

async function uploadImage(filePath, filename) {
    if (DRY_RUN) return { _id: `drafts.asset-${filename}` };
    const stream = fs.createReadStream(filePath);
    return await client.assets.upload('image', stream, { filename });
}

// --- 4. MAIN LOGIC ---
async function main() {
    console.log(`Starting seed for project ${projectId} (dataset: ${dataset})`);

    // A. Seed Categories & Brands
    for (const cat of CATEGORIES) {
        if (!DRY_RUN) await client.createOrReplace(cat);
        console.log(`✓ Category: ${cat.name}`);
    }
    for (const brand of BRANDS) {
        if (!DRY_RUN) await client.createOrReplace(brand);
        console.log(`✓ Brand: ${brand.name}`);
    }

    // B. Scan Images for Products
    const imagesDir = path.join(__dirname, '..', 'images', 'products');
    if (!fs.existsSync(imagesDir)) {
        console.error('Images directory not found:', imagesDir);
        return;
    }
    const files = fs.readdirSync(imagesDir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f)).sort();

    console.log(`Found ${files.length} images. Creating products...`);

    // C. Create Products
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const index = i + 1;
        const filePath = path.join(imagesDir, file);

        try {
            // Upload Image
            const asset = await uploadImage(filePath, file);

            // Generate Product Data
            const name = `Demo Product ${index}`;
            // Simplify slug: use name only. If name is unique, slug is unique.
            // If duplicate names existed, we'd need index. 
            // We use index to guarantee uniqueness for "Demo Product X" anyway.
            const slug = slugify(name);

            // Randomly assign category and brand
            const randomCategory = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
            const randomBrand = BRANDS[Math.floor(Math.random() * BRANDS.length)];

            const doc = {
                _id: `product.demo-product-${index}`,
                _type: 'product',
                name,
                slug: { _type: 'slug', current: slug },
                description: `This is a high-quality demo product (${name}). Perfect for your daily needs. Features premium build quality and modern design.`,
                price: parseFloat((19.99 + (i * 5)).toFixed(2)),
                discount: i % 3 === 0 ? 10 : 0, // 10% discount on every 3rd item
                stock: 15 + i,
                status: i % 5 === 0 ? 'hot' : 'new',
                isFeatured: i < 4, // Feature first 4
                rating: 4 + (i % 10) / 10, // 4.0 to 4.9
                images: [
                    {
                        _type: 'image',
                        asset: { _type: 'reference', _ref: asset._id },
                    },
                ],
                categories: [
                    {
                        _type: 'reference',
                        _ref: randomCategory._id,
                        _key: `${randomCategory._id}-${index}`
                    }
                ],
                brand: {
                    _type: 'reference',
                    _ref: randomBrand._id
                }
            };

            if (DRY_RUN) {
                console.log(`(Dry Run) Create: ${name} [${slug}]`);
            } else {
                await client.createOrReplace(doc);
                console.log(`✓ Product: ${name} -> /product/${slug}`);
            }

        } catch (err) {
            console.error(`✗ Error creating ${file}:`, err.message);
        }
    }

    console.log('Seeding completed successfully!');
}

main().catch((err) => {
    console.error(err);
    process.exit(1);
});
