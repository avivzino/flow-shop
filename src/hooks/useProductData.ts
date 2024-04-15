import { useState, useEffect } from "react";
import axios from "axios";
import { ProductData } from "../types/app.types";

interface UseProductDataReturn {
  products: ProductData[];
  isLoading: boolean;
  error: string;
  handleSizeChange: (productId: number, newSize: string) => void;
}

export const useProductData = (): UseProductDataReturn => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError("");
      try {
        const womenResponse = await axios.get<ProductData[]>(
          "https://fakestoreapi.com/products/category/women's clothing"
        );
        const menResponse = await axios.get<ProductData[]>(
          "https://fakestoreapi.com/products/category/men's clothing"
        );

        const combinedProducts = [...womenResponse.data, ...menResponse.data];
        const productsWithSize = combinedProducts.map((product) => ({
          ...product,
          size: "S",
        }));
        setProducts(productsWithSize);
      } catch (error) {
        setError("Failed to fetch products. Please try again later.");
        console.error(error);
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleSizeChange = (productId: number, newSize: string) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === productId ? { ...product, size: newSize } : product
      )
    );
  };

  return { products, isLoading, error, handleSizeChange };
};
