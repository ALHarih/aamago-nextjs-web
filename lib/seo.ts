import { Metadata } from "next";
import { Product, Category } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";

// Use environment base URL if provided; fall back to portfolio/default
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://sajidmahamud.vercel.app";

/**
 * Generate metadata for product pages
 */
export function generateProductMetadata(product: any): Metadata {
  const title = product.name || "Product";
  const description =
    product.description ||
    `Buy ${title} online at EasyCom. ${product.price ? `Price: $${product.price}` : ""}`;
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).url()
    : "/og-image.jpg";
  const url = `${BASE_URL}/product/${product.slug?.current}`;

  // Extract brand name if it's populated
  const brandName =
    typeof product.brand === "object" ? product.brand?.name : "";

  return {
    title,
    description,
    keywords: [
      product.name || "",
      brandName || "",
      "buy online",
      "shop",
      "e-commerce",
    ].filter(Boolean),
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: "EasyCom",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate metadata for category pages
 */
export function generateCategoryMetadata(
  category: Category,
  productCount: number = 0
): Metadata {
  const title = category.title || "Category";
  const description =
    category.description ||
    `Browse ${productCount} products in ${title} category at EasyCom.Find the best deals and quality items.`;
  const imageUrl = category.image
    ? urlFor(category.image).url()
    : "/og-image.jpg";
  const url = `${BASE_URL}/category/${category.slug?.current}`;

  return {
    title,
    description,
    keywords: [
      category.title || "",
      "category",
      "shop",
      "buy online",
      "e-commerce",
      "products",
    ].filter(Boolean),
    openGraph: {
      type: "website",
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      siteName: "EasyCom",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
    },
  };
}

/**
 * Generate Product Schema (JSON-LD) for rich snippets
 */
export function generateProductSchema(product: any) {
  const imageUrl = product.images?.[0] ? urlFor(product.images[0]).url() : "";

  // Extract brand name if it's populated
  const brandName =
    typeof product.brand === "object" ? product.brand?.name : "EasyCom";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: imageUrl,
    sku: product._id,
    brand: {
      "@type": "Brand",
      name: brandName,
    },
    offers: {
      "@type": "Offer",
      url: `${BASE_URL}/product/${product.slug?.current}`,
      priceCurrency: "USD",
      price: product.price,
      priceValidUntil: new Date(
        new Date().setFullYear(new Date().getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
      availability:
        product.stock && product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
    ...(product.averageRating && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: product.averageRating,
        reviewCount: product.totalReviews || 0,
        bestRating: 5,
        worstRating: 1,
      },
    }),
  };
}

/**
 * Generate BreadcrumbList Schema (JSON-LD)
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate Organization Schema (JSON-LD)
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "EasyCom",
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      "EasyCom — Capstone e-commerce project by Sajid Mahamud. This project is for demonstration and learning purposes (not production-grade).",
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: "+1-000-000-0000",
        contactType: "customer support",
        areaServed: "Global",
        availableLanguage: "en",
      },
      {
        "@type": "ContactPoint",
        telephone: "+1-555-123-4567",
        contactType: "customer service",
        areaServed: "US",
        availableLanguage: "en",
      },
    ],
    sameAs: [
      "https://sajidmahamud.vercel.app",
      "https://facebook.com/easycom",
      "https://twitter.com/easycom",
      "https://instagram.com/easycom",
      "https://linkedin.com/company/easycom",
    ],
  };
}

/**
 * Generate WebSite Schema (JSON-LD) with search action
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "EasyCom",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/shop?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate ItemList Schema for product listings
 */
export function generateItemListSchema(products: any[], listName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${BASE_URL}/product/${product.slug?.current}`,
      name: product.name,
    })),
  };
}

/**
 * Generate Review Schema for product reviews
 */
export function generateReviewSchema(reviews: any[], product: Product) {
  if (!reviews || reviews.length === 0) return null;

  const reviewSchemas = reviews.map((review) => ({
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.rating,
      bestRating: 5,
      worstRating: 1,
    },
    author: {
      "@type": "Person",
      name: review.userName || "Anonymous",
    },
    reviewBody: review.comment,
    datePublished: review._createdAt,
  }));

  return reviewSchemas;
}

/**
 * Generate FAQ Schema
 */
export function generateFAQSchema(
  faqs: Array<{ question: string; answer: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Helper to create canonical URL
 */
export function getCanonicalUrl(path: string): string {
  return `${BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/**
 * Generate metadata for homepage
 */
export function generateHomeMetadata(): Metadata {
  return {
    title: "EasyCom - Capstone E-Commerce Project",
    description:
      "EasyCom is a capstone e-commerce project (not production-grade). Browse sample products and features while development continues.",
    keywords: [
      "online shopping",
      "e-commerce",
      "buy online",
      "shop online",
      "best deals",
      "electronics",
      "fashion",
      "home goods",
    ],
    openGraph: {
      type: "website",
      url: BASE_URL,
      title: "EasyCom - Capstone E-Commerce Project",
      description:
        "EasyCom is a capstone e-commerce project. Some features are under development.",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "EasyCom - Capstone Project",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "EasyCom - Capstone E-Commerce Project",
      description:
        "EasyCom is a capstone e-commerce project (not production-grade).",
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: BASE_URL,
    },
  };
}
