import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Link,
  SelectionMode,
} from "@fluentui/react";
import { ProductCard } from "../ProductCard/ProductCard";
import React, { useState } from "react";
import axios from "axios";
import { MyFooter } from "../components/MyFooter";
import { SubTitle } from "./AdminPage";

export interface Product {
  id: number;
  name: string;
  price: number;
}

export interface BasketItem extends Product {
  totalPrice: number;
  count: number;
}

var response = [
  {
    category: "Category 1",
    id: 1001,
    imageData: "https://picsum.photos/400?image=680",
    name: "Product 1",
    price: 2345.335,
    available: true,
  },
  {
    category: "Category 4",
    id: 1002,
    imageData: "https://picsum.photos/400?image=907",
    name: "Product 2",
    price: 3880.911,
    available: false,
  },
  {
    category: "Category 1",
    id: 1003,
    imageData: "https://picsum.photos/400?image=880",
    name: "Product 3",
    price: 1196.558,
    available: true,
  },
  {
    category: "Category 3",
    id: 1004,
    imageData: "https://picsum.photos/400?image=993",
    name: "Product 4",
    price: 2428.246,
    available: false,
  },
  {
    category: "Category 2",
    id: 1005,
    imageData: "https://picsum.photos/400?image=920",
    name: "Product 5",
    price: 2258.525,
    available: false,
  },
  {
    category: "Category 4",
    id: 1006,
    imageData: "https://picsum.photos/400?image=790",
    name: "Product 6",
    price: 8.0,
    available: true,
  },
  {
    category: "Category 2",
    id: 1007,
    imageData: "https://picsum.photos/400?image=679",
    name: "Product 7",
    price: 3103.706,
    available: true,
  },
  {
    category: "Category 1",
    id: 1008,
    imageData: "https://picsum.photos/400?image=634",
    name: "Product 8",
    price: 1160.739,
    available: true,
  },
  {
    category: "Category 2",
    id: 1009,
    imageData: "https://picsum.photos/400?image=689",
    name: "Product 9",
    price: 2341.415,
    available: false,
  },
  {
    category: "Category 2",
    id: 1010,
    imageData: "https://picsum.photos/400?image=361",
    name: "Product 10",
    price: 104.444,
    available: false,
  },
];
const basketMap = new Map<Number, BasketItem>();
// const [isSavedSuccess, setIsSavedSuccess] = useState(false);
export const ListOfProductsPage = () => {
  const [isBasketOpen, setIsBasketOpen] = useState(false); // State to track if the basket panel is open or closed
  const [inventory, setInventory] = useState(response); // data from database - ALL ITEMS
  const [basketItems, setBasketItems] = useState([]); // acumulated basker data
  // const fetchAddProductToBasket = () => {
  //   axios
  //     .get("http://localhost:8080/products/inventory")
  //     .then((s) => {
  //       setAddProducts(s.data);
  //       console.log(s);
  //     })
  //     .catch((x) => console.log(x));
  // };

  const handleOpenBasket = () => {
    setIsBasketOpen(true);
  };

  const handleCloseBasket = () => {
    setIsBasketOpen(false);
  };

  const handleAddToBasket = () => {
    console.log("Clicked Add To Basket button");
    // Add your desired functionality or redirect to another page
  };

  const handleFavourite = () => {
    console.log("Clicked Favourite button");
    // Add your desired functionality or redirect to another page
  };
  const calculateTotal = () => {
    return basketItems.reduce(
      (totalPrice, item) => totalPrice + item.totalPrice,
      0
    );
  };

  return (
    <>
      <SubTitle>List Of Products Page</SubTitle>
      <Link href="/">Home</Link>
      <div
        style={{
          flexWrap: "wrap",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {response.map((p) => (
          <div
            className="collectionList"
            style={{
              flexWrap: "wrap",
              display: "flex",
              padding: 10,
              justifyContent: "center",
            }}
          >
            <ProductCard
              product={p}
              onAddProduct={() => {
                if (basketMap.has(p.id)) {
                  const item = { ...basketMap.get(p.id)! };
                  item["count"] = item.count + 1;
                  item["totalPrice"] = item.count * item.price;
                  basketMap.set(p.id, item);
                  basketItems.splice(basketItems.indexOf(item), item);
                  setBasketItems([...basketItems, item]);
                } else {
                  const newObj = { ...p };
                  basketMap.set(p.id, newObj);
                  newObj["totalPrice"] = p.price;
                  newObj["count"] = 1;
                  const tmp = [...basketItems, newObj];
                  basketMap.set(p.id, newObj);
                  setBasketItems(tmp);
                }
              }}
              onRemoveProduct={() => {
                if (basketMap.has(p.id)) {
                  const item = { ...basketMap.get(p.id)! };
                  if (item.count > 0) {
                    item.count = item.count - 1;
                    item.totalPrice = item.count * item.price;
                    basketMap.set(p.id, item);
                    setBasketItems((prevBasketItems) => {
                      const updatedBasketItems = prevBasketItems.map(
                        (prevItem) => {
                          if (prevItem.id === item.id) {
                            return item;
                          }
                          return prevItem;
                        }
                      );
                      return updatedBasketItems.filter(
                        (updatedItem) => updatedItem.count > 0
                      );
                    });
                  }
                }
              }}
            />
          </div>
        ))}
      </div>

      {/* <button className="homeButton">Back to Home</button>
      <button
        className="addButton"
        style={{ backgroundColor: "green", color: "white" }}
        onClick={() => {
          // Handle onClick event for Add To Bag button
          console.log("Clicked Add To Bag button");
          // Add your desired functionality or redirect to another page
        }}
      >
        Add To Bag
      </button>
      <button
        className="favouriteButton"
        style={{ backgroundColor: "pink", color: "white" }}
        onClick={() => {
          // Handle onClick event for Favourite button
          console.log("Clicked Favourite button");
          // Add your desired functionality or redirect to another page
        }}
      >
        Favourite
      </button> */}
      <div>
        <div style={{ position: "fixed", right: 0, top: 0, padding: "20px" }}>
          <button onClick={handleOpenBasket}>Open Basket</button>
        </div>
        {isBasketOpen && (
          <div
            style={{
              position: "fixed",
              right: 0,
              top: 0,
              bottom: 0,
              width: "40%",
              background: "#f9f9f9",
              padding: "20px",
            }}
          >
            <h2>Basket</h2>
            <button onClick={handleCloseBasket}>Close Basket</button>
            {basketItems.length > 0 && (
              <DetailsList
                items={basketItems}
                selectionMode={SelectionMode.none}
                columns={[
                  {
                    key: "name",
                    name: "Name",
                    fieldName: "name",
                    minWidth: 60,
                    maxWidth: 150,
                    isResizable: true,
                  },
                  {
                    key: "count",
                    name: "Count",
                    fieldName: "count",
                    minWidth: 60,
                    maxWidth: 80,
                    isResizable: true,
                  },
                  {
                    key: "price",
                    name: "Price",
                    fieldName: "price",
                    minWidth: 60,
                    maxWidth: 80,
                    isResizable: true,
                  },
                  {
                    key: "totalPrice",
                    name: "Total price",
                    fieldName: "totalPrice",
                    minWidth: 60,
                    maxWidth: 80,
                    isResizable: true,
                  },
                ]}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
                // selection={this._selection}
                selectionPreservedOnEmptyClick={true}
                // onItemInvoked={this._onItemInvoked}
              />
            )}

            <div> Total: {calculateTotal()}</div>
            <DefaultButton
              styles={{ root: { marginTop: "10px" } }}
              text="Place order"
              // onClick={() => {
              //   axios
              //     .post(
              //       "http://localhost:8080/orders",
              //       {
              //         date: orderDate,
              //         userName: userName,
              //         totalSum: totalSum,
              //         address: address,
              //       },
              //       { headers: { "Content-Type": "multipart/form-data" } }
              //     )
              //     .then((s) => {
              //       setIsSavedSuccess(true);
              //       console.log(s);
              //     })
              //     .catch((x) => console.log(x));
              // }}
            />
            {/* Add basket content and functionality */}
          </div>
        )}
      </div>

      <MyFooter />
    </>
  );
};
