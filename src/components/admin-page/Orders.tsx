import React, { useEffect, useState } from "react";
import { DefaultButton } from "@fluentui/react/lib/Button";
import axios from "axios";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode,
} from "@fluentui/react";
import { CollapsibleSectionWithTitle } from "../common/CollapsibleSection";
import {
  Dropdown,
  IDropdownStyles,
  IDropdownOption,
} from "@fluentui/react/lib/Dropdown";
import { Icon } from "@fluentui/react/lib/Icon";

enum OrderStatus {
  New = "New",
  Prepare = "Prepare",
  Transit = "Transit",
  Complete = "Complete",
}

interface Order {
  id: number;
  orderDate: Date;
  userName: string;
  totalSum: number;
  address: string;
  status: OrderStatus;
}

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const fetchOrders = () => {
    axios
      .get("http://localhost:8080/orders")
      .then((s) => {
        setOrders(s.data);
        console.log(s);
      })
      .catch((x) => console.log(x));
  };
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <CollapsibleSectionWithTitle
      title="Orders"
      textOnClosed="Open orders"
      textOnOpen="Close orders"
    >
      {orders.length > 0 && (
        <DetailsList
          items={orders}
          selectionMode={SelectionMode.none}
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
              minWidth: 50,
              maxWidth: 100,
              isResizable: true,
            },
            {
              key: "totalSum",
              name: "Total Sum",
              fieldName: "totalSum",
              minWidth: 50,
              maxWidth: 100,
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
            {
              key: "status",
              name: "Status",
              onRender: (order: Order) => (
                <OrderStatusField
                  order={order}
                  onStatusChange={(newStatus: string) =>
                    (order["status"] = newStatus as OrderStatus)
                  }
                />
              ),
              minWidth: 50,
              maxWidth: 90,
              isResizable: true,
            },
          ]}
          setKey="set"
          layoutMode={DetailsListLayoutMode.justified}
          selectionPreservedOnEmptyClick={true}
        />
      )}
    </CollapsibleSectionWithTitle>
  );
};

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 100, flexGrow: 1 },
};

const options: IDropdownOption[] = [
  { key: OrderStatus.New, text: OrderStatus.New },
  { key: OrderStatus.Prepare, text: OrderStatus[OrderStatus.Prepare] },
  { key: OrderStatus.Transit, text: OrderStatus.Transit },
  { key: OrderStatus.Complete, text: OrderStatus.Complete },
];

const statusIcons = new Map<string, string>();
statusIcons.set(OrderStatus.New, "CirclePlus");
statusIcons.set(OrderStatus.Prepare, "Sync");
statusIcons.set(OrderStatus.Transit, "DeliveryTruck");
statusIcons.set(OrderStatus.Complete, "Completed");

const OrderStatusField: React.FC<{
  order: Order;
  onStatusChange: (status: string) => void;
}> = ({ order, onStatusChange }) => {
  const [status, setStatus] = useState<string>(order.status);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  return (
    <div style={{ display: "flex" }}>
      <Dropdown
        placeholder="Select an option"
        selectedKey={status}
        options={options}
        onChange={(_, e) => {
          if (e?.key !== order.status) {
            setStatus(e?.key as string);
          }
        }}
        styles={dropdownStyles}
      />
      <Icon
        iconName={statusIcons.get(status)}
        style={{ paddingTop: 2, paddingLeft: 5, paddingRight: 5, fontSize: 25 }}
      />
      <DefaultButton
        disabled={status === order.status && !isSaving}
        onClick={() => {
          setIsSaving(true);
          axios
            .post(`http://localhost:8080/orders/${order.id}/${status}`)
            .then(() => {
              onStatusChange(status);
              setIsSaving(false);
            })
            .catch((error) => {
              console.log("Error updating order:", error);
            });
        }}
        text="Save"
      />
    </div>
  );
};
