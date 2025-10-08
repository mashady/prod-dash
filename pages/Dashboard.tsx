import React, { useEffect, useState } from "react";
import { fetchProducts, fetchCategories, type Product, type Category } from "../apis/products";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import SortDropdown, { type SortOption } from "../components/SortDropdown";
import Spinner from "../components/Spinner";

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<Category | "">("");
  const [sort, setSort] = useState<SortOption>("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const [prods, cats] = await Promise.all([
        fetchProducts(),
        fetchCategories(),
      ]);
      setProducts(prods);
      setFiltered(prods);
      setCategories(cats);
      setLoading(false);
    };
    loadData();
  }, []);

  useEffect(() => {
    let data = [...products];
    if (search)
      data = data.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    if (category) data = data.filter((p) => p.category === category);

    if (sort === "priceLow") data.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") data.sort((a, b) => b.price - a.price);
    if (sort === "az") data.sort((a, b) => a.title.localeCompare(b.title));

    setFiltered(data);
  }, [search, category, sort, products]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold mb-2">Product Explorer</h1>
          <p className="text-blue-100">Discover amazing products at great prices</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:w-1/3">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">Search Products</h2>
              <SearchBar value={search} onChange={setSearch} />
            </div>
            <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <CategoryFilter
                  categories={categories}
                  selectedCategory={category || ''}
                  onCategoryChange={(cat) => setCategory(cat as Category)}
                  placeholder="All Categories"
                />
              </div>
              <div className="w-full md:w-1/2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
                <SortDropdown selected={sort} onChange={setSort} />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {filtered.length} {filtered.length === 1 ? 'Product' : 'Products'} Found
          </h2>
          {sort && (
            <div className="text-sm text-gray-500">
              Sorted by: {
                sort === 'priceLow' ? 'Price: Low to High' :
                sort === 'priceHigh' ? 'Price: High to Low' :
                'Name: A to Z'
              }
            </div>
          )}
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={() => setSelectedProduct(product)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-sm">
            <h3 className="text-lg font-medium text-gray-700">No products found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </main>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;
