import Shop from "@/components/shopPage/Shop";
import { getAllBrands, getAllProducts, getCategories } from "@/sanity/queries";
import { Suspense } from "react";

const ShopPage = async () => {
  const categories = await getCategories();
  const brands = await getAllBrands();
  const products = await getAllProducts();

  return (
    <div className="bg-white min-h-screen">
      <Suspense
        fallback={
          <div className="min-h-96 bg-gray-50 animate-pulse rounded-lg" />
        }
      >
        <Shop categories={categories} brands={brands} initialProducts={products} />
      </Suspense>
    </div>
  );
};

export default ShopPage;

