import React, { useEffect, useState } from "react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import axios from "axios";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from "@fluentui/react";
import { CollapsibleSectionWithTitle } from "../common/CollapsibleSection";
import { SpinButton, ISpinButtonStyles } from "@fluentui/react/lib/SpinButton";

export interface InventoryProduct {
  id: number;
  description: string;
  name: string;
  available: number;
  price: number;
  imageData: string;
}

export const Inventory: React.FC = () => {
  const [inventory, setInventory] = useState<InventoryProduct[]>([]);
  const fetchInventory = () => {
    axios
      .get("http://localhost:8080/products/inventory")
      .then((res) => {
        setInventory(res.data);
        console.log(res);
      })
      .catch((x) => console.log(x));
  };
  useEffect(() => {
    fetchInventory();
  }, []);

  return (
    <CollapsibleSectionWithTitle
      title="Inventory"
      textOnClosed="Open inventory"
      textOnOpen="Close inventory"
    >
      {inventory.length > 0 && (
        <DetailsList
          selectionMode={SelectionMode.none}
          items={inventory}
          columns={[
            {
              key: "id",
              name: "Id",
              fieldName: "id",
              minWidth: 50,
              maxWidth: 100,
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
              minWidth: 100,
              maxWidth: 200,
              isResizable: true,
            },
            {
              key: "count",
              name: "Count",
              fieldName: "available",
              minWidth: 100,
              maxWidth: 200,
              isResizable: true,
              onRender: (inventoryProduct: InventoryProduct) => (
                <InventoryCountField
                  inventoryProduct={inventoryProduct}
                  onCountChange={(newCount: number) => {
                    inventoryProduct["available"] = newCount;
                  }}
                />
              ),
            },
            {
              key: "delete",
              name: "Delete product",
              minWidth: 100,
              maxWidth: 200,
              onRender: (item: InventoryProduct) => {
                return (
                  <DefaultButton
                    onClick={() => {
                      axios
                        .delete(`http://localhost:8080/products/${item.id}`)
                        .then((response) => {
                          if (response.status === 204) {
                            setInventory([]);
                            fetchInventory();
                            console.log("Product deleted successfully");
                          }
                        })
                        .catch((error) => {
                          console.log("Error deleting product:", error);
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
        />
      )}
    </CollapsibleSectionWithTitle>
  );
};

const styles: Partial<ISpinButtonStyles> = { spinButtonWrapper: { width: 75 } };

const InventoryCountField: React.FC<{
  inventoryProduct: InventoryProduct;
  onCountChange: (status: number) => void;
}> = ({ inventoryProduct, onCountChange }) => {
  const [available, setAvailable] = useState<number>(
    inventoryProduct.available
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);

  return (
    <div style={{ display: "flex" }}>
      {/* <img
        src={`data:image/png;base64,${inventoryProduct.imageData}`}
        alt="Red dot"
      />
      <img alt="not found" width={"250px"} src={inventoryProduct.imageData} /> */}
      <SpinButton
        defaultValue={String(available)}
        min={0}
        max={1000}
        step={1}
        incrementButtonAriaLabel="Increase value by 1"
        decrementButtonAriaLabel="Decrease value by 1"
        styles={styles}
        onChange={(_, newValue) => setAvailable(Number(newValue))}
      />

      <DefaultButton
        disabled={available === inventoryProduct.available && !isSaving}
        onClick={() => {
          setIsSaving(true);
          axios
            .post(
              `http://localhost:8080/inventory/${inventoryProduct.id}/${available}`
            )
            .then(() => {
              onCountChange && onCountChange(available);
              setIsSaving(false);
            })
            .catch((error) => {
              console.log("Error updating inventory:", error);
            });
        }}
        text="Save"
      />
    </div>
  );
};
