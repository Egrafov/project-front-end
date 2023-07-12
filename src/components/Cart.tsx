import ProductCard from "../ProductCard/ProductCard";
import React, { useState } from "react";
import axios from "axios";
import { InventoryProduct } from "../pages/AdminPage";
import { AdminPage } from "../pages/AdminPage";

export const Cart: React.FC = () => {
  return <h2>Cart</h2>;

  const [inventoryProducts, setInventoryProducts] = useState<
    InventoryProduct[]
  >([]);
};
