import React, { useState } from "react";
import { Link } from "@fluentui/react";
import styled from "styled-components";
import { Orders } from "../components/admin-page/Orders";
import { Inventory } from "../components/admin-page/Inventory";
import { CreateProduct } from "../components/admin-page/CreateProduct";

export const AdminPage = () => {
  // const [iconNameOrder, setIconNameOrder] = useState<string>("ChevronDown");
  // const [products, setProducts] = useState<Product[]>([]);
  // const [id, setId] = useState<string>("");
  // const [category, setCategory] = useState<string>("");
  // const [name, setName] = useState<string>("");
  // const [description, setDescription] = useState<string>("");
  // const [image, setImage] = useState<string>("");
  // const [price, setPrice] = useState<number>(0);
  // const [count, setCount] = useState<number>(0);
  // const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  // const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  // const [isProductCreated, setIsProductCreated] = useState(false);
  // const [isShowInventory, setIsShowInventory] = useState(false);
  // const [isShowOrders, setIsShowOrders] = useState(false);
  // const [inventoryProducts, setInventoryProducts] = useState<
  //   InventoryProduct[]
  // >([]);
  // const [orderDate, setOrderDate] = useState<Date>("");
  // const [userName, setUserName] = useState<string>("");
  // const [totalSum, setTotalSum] = useState<number>(0);
  // const [address, setAddress] = useState<string>("");

  // const addProduct = (e) => {
  //   e.preventDefault();
  //   const newProduct = {
  //     name,
  //     description,
  //     image,
  //     price,
  //     count,
  //   };
  //   setProducts([...products, newProduct]);
  //   // Clear the form inputs
  //   setId("");
  //   setCategory("");
  //   setName("");
  //   setDescription("");
  //   setImage("");
  //   // setPrice("");
  //   // setCount("");
  //   setIsCreatingProduct(false);
  // };

  // const addOrder = (e) => {
  //   e.preventDefault();
  //   const newOrder = {
  //     orderDate,
  //     userName,
  //     totalSum,
  //     address,
  //   };
  //   setOrders([...orders, newOrder]);

  //   setOrderDate("");
  //   setUserName("");
  //   setTotalSum("");
  //   setAddress("");
  // };

  return (
    <div>
      <Wrapper>
        <Title>Admin Page</Title>
        <Link href="/">Home</Link>
      </Wrapper>
      <CreateProduct />
      <Inventory />
      <Orders />
    </div>
  );
};

export const Title = styled.div`
  font-weight: bold;
  font-size: 50px;
  text-align: left;
  color: #cb502e;
  text-align: left;
`;

export const Wrapper = styled.section`
  padding: 1em;
  background: #f4f6f7;
`;

export const StyledDiv = styled.div`
  color: rgb;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: auto;
  flex-wrap: wrap;
  min-width: 100px;
  max-width: 600px;
  display: flex;
  padding: 10;
  justify-content: spaceEvenly;
  align-items: selfEnd;
  flex-grow: 10;
  margin: 5px;
  font-family: "Segoe UI", "Segoe UI Web (West European)", "Segoe UI",
    -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  font-size: 14px;
  font-weight: 600;
`;

export const SubTitle = styled.div`
  padding: 1em;
  color: #886863;
  font-family: Chilanka;
  font-weight: bold;
  font-size: 20px;
  background: #f3d3d8;
`;

export const SuccessMessage = styled.div`
  color: green;
  margin-top: 20px;
  margin-left: 60px;
  font-size: 14px;
  font-weight: 600;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 20px;
  font-size: 14px;
  font-weight: 600;
`;
