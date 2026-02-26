import CollectionPage from '@/components/shop/CollectionPage';

const TopSelling = () => {
  return (
    <CollectionPage
      title="Top Sale"
      subtitle="Best discounts and most wanted products this week."
      endpoint="https://dummyjson.com/products?limit=30"
      emptyText="No sale products found right now."
      highlight="sale"
    />
  );
};

export default TopSelling
