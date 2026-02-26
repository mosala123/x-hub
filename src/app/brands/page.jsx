import CollectionPage from "@/components/shop/CollectionPage";

const BrandsPage = () => {
  return (
    <CollectionPage
      title="Brands"
      subtitle="Shop trusted brands and compare their top items quickly."
      endpoint="https://dummyjson.com/products?limit=24"
      emptyText="No brand products found."
      highlight="brand"
    />
  );
};

export default BrandsPage;
