import { DefaultButton, DetailsList, SelectionMode } from "@fluentui/react";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { InventoryProduct } from "../components/admin-page/Inventory";
import { ErrorMessage, SuccessMessage } from "../pages/AdminPage";
import { UserContext } from "../Routes";

export interface BasketItem extends InventoryProduct {
  totalPrice: number;
  count: number;
}

export const Basket: React.FC<{
  onCloseClick: () => void;
  basketItems: InventoryProduct[];
}> = ({ basketItems, onCloseClick }) => {
  const loggedInUser = useContext(UserContext);

  const [isOrderCreated, setIsOrderCreated] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [basketList, setBasketList] = useState<BasketItem[]>([]);
  useEffect(() => {
    const basketMap = new Map<Number, BasketItem>();
    let tmpTotoalPrice = 0;
    basketItems.forEach((p) => {
      tmpTotoalPrice += p.price;
      if (!basketMap.has(p.id)) {
        basketMap.set(p.id, { ...p, totalPrice: 0, count: 0 });
      }
      const item = basketMap.get(p.id)!;
      item.count += 1;
      item.totalPrice += p.price;
    });
    setTotalPrice(tmpTotoalPrice);
    setBasketList(Array.from(basketMap.values()));
  }, [basketItems]);

  console.log(loggedInUser);
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        bottom: 0,
        width: "40%",
        zIndex: 1,
        background: "#f9f9f9",
        padding: "20px",
      }}
    >
      <h2>Basket</h2>
      <DefaultButton
        onClick={onCloseClick}
        styles={buttonStyle}
        text="Close Basket"
      />
      {basketList.length > 0 && (
        <DetailsList
          items={basketList}
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
              onRender: (items) => <>{items.price.toFixed(2)}</>,
            },
            {
              key: "totalPrice",
              name: "Total price",
              fieldName: "totalPrice",
              minWidth: 60,
              maxWidth: 80,
              isResizable: true,
              onRender: (items) => <>{items.totalPrice.toFixed(2)}</>,
            },
          ]}
        />
      )}

      <div style={{ paddingTop: 13, paddingBottom: 9 }}>
        Total: {totalPrice.toFixed(2)} $
      </div>
      <DefaultButton
        disabled={!loggedInUser || basketList.length === 0}
        styles={buttonStyle}
        text="Place order"
        onClick={() => {
          axios
            .post("http://localhost:8080/orders/newOrder", {
              orderDate: new Date(),
              userName: loggedInUser?.firstName,
              totalSum: totalPrice,
              address: loggedInUser?.address,
              productQuantities: basketList.map((item) => ({
                productId: item.id,
                quantity: item.count,
              })),
            })
            .then((s) => {
              console.log("Response new order data:", s.data);
              setIsOrderCreated(true);
              alert("Order placed successfully!");
            })
            .catch((x) => {
              console.log(x);
              console.error("Error:", x);
              // Check if there was a response from the server (error.response exists)
              if (x.response) {
                // The request was made, but the server responded with an error status code (4xx or 5xx)
                console.error(
                  "Server responded with status:",
                  x.response.status
                );

                // Example: Show a custom error message based on status code
                if (x.response.status === 404) {
                  alert("Data not found!");
                } else {
                  alert("Server error occurred. Please try again later.");
                }
              } else if (x.request) {
                // The request was made, but no response was received from the server
                console.error("No response received from server.");
                alert(
                  "No response received from the server. Please try again later."
                );
              } else {
                // Something else happened during the request, e.g., network error
                console.error("Error during request:", x.message);
                alert(
                  "An error occurred during the request. Please check your network connection."
                );
              }
            });
        }}
      />
      {!loggedInUser && <ErrorMessage>Please login</ErrorMessage>}
      {isOrderCreated && (
        <SuccessMessage>Order created successfully!</SuccessMessage>
      )}
    </div>
  );
};

const buttonStyle = {
  root: { minWidth: "130px" },
};
