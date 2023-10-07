import { DefaultButton, Link, initializeIcons } from "@fluentui/react";
import { ProductCard } from "../ProductCard/ProductCard";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MyFooter } from "../components/MyFooter";
import { SubTitle, SuccessMessage, Title } from "./AdminPage";
import { FaSearch } from "react-icons/fa";
import { SearchComponent } from "../components/SearchComponent";
import { styled } from "styled-components";
import { InventoryProduct } from "../components/admin-page/Inventory";
import { Basket, BasketItem } from "../components/Basket";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Routes";
import { ImUser } from "react-icons/im";

export const ListOfProductsPage = () => {
  // const [isSavedSuccess, setIsSavedSuccess] = useState(false);
  const loggedInUser = useContext(UserContext);

  const [inventory, setInventory] = useState<InventoryProduct[]>([]);
  const fetchInventory = () => {
    axios
      .get("http://localhost:8080/products/inventory")
      .then((res) => {
        setInventory(res.data);
        setFilteredProducts(res.data);
        console.log(res);
      })
      .catch((x) => console.log(x));
  };
  useEffect(() => {
    fetchInventory();
  }, []);

  const [isBasketOpen, setIsBasketOpen] = useState(false); // State to track if the basket panel is open or closed
  // const [inventory, setInventory] = useState(response); // data from database - ALL ITEMS
  const [basketItems, setBasketItems] = useState<InventoryProduct[]>([]); // acumulated basker data
  const [filteredProducts, setFilteredProducts] =
    useState<InventoryProduct[]>(inventory);

  // Function to filter products based on search query
  const onSearchChange = (filterValue: string) => {
    setFilteredProducts(
      inventory.filter((product) =>
        product.name.toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  };

  const handleOpenBasket = () => {
    setIsBasketOpen(true);
  };

  const handleCloseBasket = () => {
    setIsBasketOpen(false);
  };

  const buttonStyle = {
    root: { minWidth: "130px" },
  };

  return (
    <div style={{ flexDirection: "column", justifyContent: "space-between" }}>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          background: "#f3d3d8",
          padding: "10px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            flexDirection: "row",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Title style={{ paddingRight: "20px" }}>Gelix</Title>
          <SearchComponent onSearchChange={onSearchChange} />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {loggedInUser ? (
            <div style={{ paddingLeft: 10, paddingRight: 15, fontSize: 18 }}>
              Hello {loggedInUser.firstName}
              {loggedInUser.isAdmin && (
                <NavLink to={"/admin"}>Admin page</NavLink>
              )}
            </div>
          ) : (
            <div
              style={{
                paddingLeft: 10,
                paddingRight: 15,
                fontSize: 18,
                display: "flex",
                alignItems: "center",
              }}
            >
              <NavLink to="/login" color="#886863" style={{ paddingRight: 5 }}>
                Login/Register
              </NavLink>
              <ImUser />
            </div>
          )}
          <DefaultButton
            onClick={handleOpenBasket}
            text="Open Basket"
            styles={buttonStyle}
          />
        </div>
      </div>
      {isBasketOpen && (
        <Basket basketItems={basketItems} onCloseClick={handleCloseBasket} />
      )}
      <div
        style={{
          flexWrap: "wrap",
          display: "flex",
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        {filteredProducts.map((p) => (
          <div
            key={p.id}
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
              currentlySelected={
                basketItems.filter((i) => i.id === p.id).length
              }
              onAddProduct={() => {
                setBasketItems([...basketItems, p]);
                if (!isBasketOpen) {
                  setIsBasketOpen(true);
                }
              }}
              onRemoveProduct={() => {
                const index = basketItems.indexOf(p);
                if (index < 0) {
                  // the item wasn't added yet
                  return;
                }
                basketItems.splice(index, 1);
                setBasketItems([...basketItems]);
                if (!isBasketOpen) {
                  setIsBasketOpen(true);
                }
              }}
            />
          </div>
        ))}
      </div>

      <MyFooter />
    </div>
  );
};
// const CategoryTitle = styled.div`
//   padding: 1em;
//   color: #886863;
//   font-family: Chilanka;
//   font-weight: bold;
//   font-size: 20px;
// `;
