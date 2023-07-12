import ProductCard from "../ProductCard/ProductCard";
import React, { useState } from "react";
import { DefaultButton, PrimaryButton } from "@fluentui/react/lib/Button";
import axios from "axios";
import { DetailsListBasicExample } from "../components/InventoryList";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Icon,
} from "@fluentui/react";
import styled from "styled-components";
import { ChevronUpIcon } from "@fluentui/react";

export interface InventoryProduct {
  id: number;
  title: string;
  price: number;
  // ...
}
export interface Order {
  id: number;
  orderDate: Date;
  userName: string;
  totalSum: number;
  address: string;
}
export const AdminPage = () => {
  const [iconNameInventory, setIconNameInventory] =
    useState<string>("ChevronDown");
  const [iconNameOrder, setIconNameOrder] = useState<string>("ChevronDown");
  const [products, setProducts] = useState<Product[]>([]);
  const [id, setId] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const [isProductCreated, setIsProductCreated] = useState(false);
  const [isShowInventory, setIsShowInventory] = useState(false);
  const [isShowOrders, setIsShowOrders] = useState(false);
  const [inventoryProducts, setInventoryProducts] = useState<
    InventoryProduct[]
  >([]);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [orderDate, setOrderDate] = useState<Date>("");
  const [userName, setUserName] = useState<string>("");
  const [totalSum, setTotalSum] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const fetchInventory = () => {
    axios
      .get("http://localhost:8080/products/inventory")
      .then((s) => {
        setInventoryProducts(s.data);
        console.log(s);
      })
      .catch((x) => console.log(x));
  };

  const fetchOrders = () => {
    axios
      .get("http://localhost:8080/orders")
      .then((s) => {
        setOrders(s.data);
        console.log(s);
      })
      .catch((x) => console.log(x));
  };
  const toggleInventory = () => {
    setIsShowInventory(!isShowInventory);
    setIconNameInventory(isShowInventory ? "ChevronDown" : "ChevronUp");
  };

  const toggleOrders = () => {
    setIsShowOrders(!isShowOrders);
    setIconNameOrder(isShowOrders ? "ChevronDown" : "ChevronUp");
  };
  const addProduct = (e) => {
    e.preventDefault();
    const newProduct = {
      name,
      description,
      image,
      price,
      count,
    };
    setProducts([...products, newProduct]);
    // Clear the form inputs
    setId("");
    setCategory("");
    setName("");
    setDescription("");
    setImage("");
    // setPrice("");
    // setCount("");
    setIsCreatingProduct(false);
  };

  const addOrder = (e) => {
    e.preventDefault();
    const newOrder = {
      orderDate,
      userName,
      totalSum,
      address,
    };
    setOrders([...orders, newOrder]);

    setOrderDate("");
    setUserName("");
    setTotalSum("");
    setAddress("");
  };

  return (
    <div>
      <Wrapper>
        {isSavedSuccess}
        <Title>Admin Page</Title>
      </Wrapper>
      <form onSubmit={addProduct}>
        <SubTitle>Add Product</SubTitle>
        {!isCreatingProduct && (
          <DefaultButton
            styles={{
              root: {
                marginTop: "10px",
                minWidth: "80px",
                maxWidth: "600px",
                flex: "auto",
                width: "100%",
                margin: "5px",
              },
            }}
            // styles={{ root: { marginTop: "10px" } }}

            text="For Create product"
            onClick={() => setIsCreatingProduct(true)}
          ></DefaultButton>
        )}
        {isCreatingProduct && (
          <ProductCategory
            style={{
              flexWrap: "wrap",
              display: "flex",
              flexDirection: "column",
              justifyContent: "spaceBetween",
              alignItems: "selfEnd",
              flexGrow: 10,
            }}
          >
            <label>
              Category:
              <StyledInput
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>
            <label>
              Name:
              <StyledInput
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Description:
              <StyledInput
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label>
              Image URL:
              <StyledInput
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
            <label>
              Price:
              <StyledInput
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <DefaultButton
              styles={{ root: { marginTop: "10px" } }}
              text="Create product"
              onClick={() => {
                axios
                  .post(
                    "http://localhost:8080/products",
                    {
                      name: name,
                      description: description,
                      price: price,
                      category: category,
                    },
                    { headers: { "Content-Type": "multipart/form-data" } }
                  )
                  .then((s) => {
                    setIsSavedSuccess(true);
                    setIsProductCreated(true);
                    setIsCreatingProduct(false);
                    fetchInventory();
                    console.log(s);
                  })
                  .catch((x) => console.log(x));
              }}
            />
          </ProductCategory>
        )}
        {isProductCreated && (
          <SuccessMessage>Product created successfully!</SuccessMessage>
        )}
        <div>
          <SubTitle>Inventory Products</SubTitle>
          <div>
            <DefaultButton
              iconProps={{ iconName: iconNameInventory }}
              styles={{
                root: {
                  marginTop: "10px",
                  minWidth: "80px",
                  maxWidth: "600px",
                  flex: "auto",
                  width: "100%",
                  margin: "5px",
                },
              }}
              text={isShowInventory ? "Hide inventory" : "Show inventory"}
              onClick={() => {
                if (inventoryProducts.length === 0) {
                  fetchInventory();
                }
                toggleInventory();
              }}
            />
          </div>

          {inventoryProducts.length > 0 && isShowInventory && (
            <DetailsList
              items={inventoryProducts}
              columns={[
                {
                  key: "id",
                  name: "Id",
                  fieldName: "id",
                  minWidth: 100,
                  maxWidth: 200,
                  isResizable: true,
                },
                {
                  key: "name",
                  name: "Name",
                  fieldName: "name",
                  minWidth: 100,
                  maxWidth: 200,
                  isResizable: true,
                },
                {
                  key: "description",
                  name: "Description",
                  fieldName: "description",
                  minWidth: 200,
                  maxWidth: 300,
                  isResizable: true,
                },
                {
                  key: "count",
                  name: "Count",
                  fieldName: "available",
                  minWidth: 100,
                  maxWidth: 200,
                  isResizable: true,
                },
                {
                  key: "column3",
                  name: "Actions",
                  fieldName: "",
                  minWidth: 100,
                  maxWidth: 200,
                  onRender: (item?: any, index?: number, column?: IColumn) => {
                    // console.log(item);
                    return (
                      <DefaultButton
                        onClick={() => {
                          axios
                            .delete(`http://localhost:8080/products/${item.id}`)
                            .then((response) => {
                              if (response.status === 204) {
                                fetchInventory();

                                console.log("Product deleted successfully");
                                // Perform any additional actions if needed
                              }
                            })
                            .catch((error) => {
                              console.log("Error deleting product:", error);
                              // Handle error or display an error message
                            });
                        }}
                        text="Delete"
                      />
                    );
                  },
                },
              ]}
              setKey="set"
              layoutMode={DetailsListLayoutMode.justified}
              // selection={this._selection}
              selectionPreservedOnEmptyClick={true}
              // onItemInvoked={this._onItemInvoked}
            />
          )}
        </div>

        <div>
          <SubTitle>Orders Data</SubTitle>
          <div>
            <DefaultButton
              iconProps={{ iconName: iconNameOrder }}
              styles={{
                root: {
                  marginTop: "10px",
                  minWidth: "80px",
                  maxWidth: "600px",
                  flex: "auto",
                  width: "100%",
                  margin: "5px",
                },
              }}
              text={isShowOrders ? "Hide orders" : "Show orders"}
              onClick={() => {
                if (orders.length === 0) {
                  fetchOrders();
                }
                toggleOrders();
              }}
            />
          </div>

          {orders.length > 0 && isShowOrders && (
            <DetailsList
              items={orders}
              columns={[
                {
                  key: "id",
                  name: "Id",
                  fieldName: "id",
                  minWidth: 100,
                  maxWidth: 200,
                  isResizable: true,
                },
                {
                  key: "orderDate",
                  name: "Order Date",
                  fieldName: "orderDate",
                  minWidth: 100,
                  maxWidth: 200,
                  isResizable: true,
                },
                {
                  key: "userName",
                  name: "User Name",
                  fieldName: "userName",
                  minWidth: 200,
                  maxWidth: 300,
                  isResizable: true,
                },
                {
                  key: "totalSum",
                  name: "Total Sum",
                  fieldName: "totalSum",
                  minWidth: 100,
                  maxWidth: 200,
                  isResizable: true,
                },
                {
                  key: "address",
                  name: "Address",
                  fieldName: "address",
                  minWidth: 100,
                  maxWidth: 200,
                  isResizable: true,
                },
              ]}
              setKey="set"
              layoutMode={DetailsListLayoutMode.justified}
              selectionPreservedOnEmptyClick={true}
            />
          )}
        </div>
      </form>
    </div>
  );
};

export const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
  text-align: left;
  color: #cb502e;
`;

export const Wrapper = styled.section`
  padding: 1em;
  background: #f4f6f7;
`;

export const ProductCategory = styled.div`
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

export const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  padding: 5px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;
export const SuccessMessage = styled.div`
  color: green;
  margin-top: 20px;
  margin-left: 60px;
  font-size: 14px;
  font-weight: 600;
`;
