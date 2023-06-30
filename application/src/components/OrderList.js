import OrderLine from "./OrderLine";
import { useState } from "react";
import OrderListHeadings from "./OrderListHeadings";
import OrderListSubtotal from "./OrderListSubtotal";

function OrderList({ orderLines, updateItemsHandler }) {
    const handleDeleteOrderLine = (itemName) => {
        const updatedOrderLines = orderLines.map((orderLine) => {
            if (orderLine.itemName === itemName) {
                if (orderLine.itemQuantity > 1) {
                    return {
                        ...orderLine,
                        itemQuantity: orderLine.itemQuantity - 1,
                    };
                }
                // If itemQuantity is 1, skip adding it to the updated array (effectively deleting it)
                return null;
            }
            return orderLine;
        }).filter(Boolean);

        console.log(updatedOrderLines);
        updateItemsHandler(updatedOrderLines);
    };

    function getSubtotal () {
        let total = 0;
        orderLines.forEach(i => ( total += i.itemQuantity * i.itemPrice));
        return total;
    }


    return (
        // <div>
        <div className={"OrderList"}>
            <OrderListHeadings />
            <div className={"OrderList-lines-container"}>
                {orderLines.map((orderLine) => (
                    <OrderLine
                        itemName={orderLine.itemName}
                        itemQuantity={orderLine.itemQuantity}
                        itemPrice={orderLine.itemPrice}
                        onDelete={() => handleDeleteOrderLine(orderLine.itemName)}
                    />
                ))}
            </div>

            <OrderListSubtotal ordersTotal={getSubtotal()} />
        </div>
    );
}

export default OrderList;
