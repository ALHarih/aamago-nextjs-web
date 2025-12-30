import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";
import { urlFor } from "@/sanity/lib/image";
import { Star } from "lucide-react";
import { Product } from "@/sanity.types";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <div className="border border-gray-200 bg-white rounded-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full group relative">

      {/* Image Area */}
      <div className="relative w-full h-52 bg-gray-50 p-4 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
        <Link href={`/product/${product?.slug?.current}`} className="w-full h-full relative">
          {product?.images?.[0] && (
            <Image
              src={urlFor(product.images[0]).url()}
              alt={product.name || "Product Image"}
              fill
              className="object-contain"
              priority
            />
          )}
        </Link>
        {/* Quick batch badge simulation */}
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-sm">
          Bulk Deal
        </div>
      </div>

      {/* Content Area - Dense Amazon Style */}
      <div className="p-3 flex flex-col flex-1 gap-1">

        {/* Brand / Meta */}
        <div className="text-xs text-gray-500 uppercase tracking-wider">{product?._type || "Generic"}</div>

        {/* Title */}
        <Link href={`/product/${product?.slug?.current}`} className="line-clamp-2 text-sm text-[#0F1111] hover:text-[#C7511F] hover:underline leading-snug mb-1 font-medium group-hover:text-[#C7511F] transition-colors">
          {product?.name}
        </Link>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-1">
          <div className="flex text-[#FFA41C]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-current" />
            ))}
          </div>
          <span className="text-xs text-blue-600 hover:text-red-700 hover:underline cursor-pointer">
            {product?.totalReviews || 120}
          </span>
        </div>

        {/* Price Section */}
        <div className="mt-auto">
          <PriceView
            price={product?.price}
            discount={product?.discount}
            className="text-lg font-medium text-[#0F1111]"
          />

          {/* Batch / Bulk Pricing Text */}
          <div className="text-xs text-gray-500 mt-1">
            Min. Order: 100 Pieces
          </div>
          <div className="text-xs font-bold text-green-700">
            In Stock
          </div>
        </div>

        {/* Action Button - Mobile friendly but subtle on Desktop */}
        <div className="mt-2">
          <AddToCartButton product={product} className="w-full bg-[#FFD814] hover:bg-[#F7CA00] text-black border border-[#FCD200] hover:border-[#F2C200] rounded-full py-1.5 text-xs font-normal shadow-sm" />
        </div>

      </div>
    </div>
  );
};

ProductCard.displayName = "ProductCard";

export default ProductCard;
