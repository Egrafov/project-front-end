import { DefaultButton } from "@fluentui/react";
import { ProductCard } from "../ProductCard/ProductCard";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { MyFooter } from "../components/MyFooter";
import { SearchComponent } from "../components/SearchComponent";
import { InventoryProduct } from "../components/admin-page/Inventory";
import { Basket } from "../components/Basket";
import { NavLink } from "react-router-dom";
import { UserContext } from "../Routes";
import { MainTitle } from "../components/MainTitle";
import { NavBar } from "../components/NavBar";
import {
  StyledLink,
  defaultSecondaryButtonStyle,
} from "../components/common/Styles";
import { LoginLink } from "../components/LoginLink";

export const ListOfProductsPage: React.FC<{ onLogOut: () => void }> = ({
  onLogOut,
}) => {
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

  return (
    <div style={{ flexDirection: "column", justifyContent: "space-between" }}>
      <div
        style={{
          flexDirection: "row",
          display: "flex",
          justifyContent: "space-between",
          background: "#f3d3d8",
          padding: "10px",
          paddingLeft: "0px",
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
          <MainTitle />
          <SearchComponent onSearchChange={onSearchChange} />
          <NavBar />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            fontSize: 19,
          }}
        >
          {loggedInUser ? (
            <>
              Hello {loggedInUser.firstName}
              {loggedInUser.isAdmin && (
                <StyledLink>
                  <NavLink to={"/admin"}>Admin page</NavLink>
                </StyledLink>
              )}
              <DefaultButton
                iconProps={{ iconName: "SignOut" }}
                onClick={onLogOut}
                text="Sign out"
                styles={{ root: { minWidth: "50px" } }}
              />
            </>
          ) : (
            <LoginLink />
          )}
          <DefaultButton
            onClick={handleOpenBasket}
            text="Open Basket"
            styles={defaultSecondaryButtonStyle}
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
