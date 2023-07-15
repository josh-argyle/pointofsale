import OrderLine from "./OrderLine";
import {useEffect, useState} from "react";
import OrderListHeadings from "./OrderListHeadings";
import OrderListSubtotal from "./OrderListSubtotal";
import axios from "axios";
import PastOrderDetailsModal from "./PastOrderDetailsModal";

function OrderList({ orderLines, updateItemsHandler, passModalLineClick}) {

    const [isOrderListEmpty, setIsOrderListEmpty] = useState(false);


    useEffect(() => {
        if (orderLines.size > 0) {
            setIsOrderListEmpty(false);
        } else {
            setIsOrderListEmpty(true);
        }
    }, [orderLines])

    const uploadOrderData = async () => {
        console.log("upload order data");
        try {
            const orders = [];
            orderLines.forEach(l => {
                const order = {
                    itemQuantity: l.itemQuantity,
                    itemName: l.itemName,
                    itemPrice: l.itemPrice,
                };
                orders.push(order);
            });

            const response = await axios.post('/uploadOrderData', { orders });
            console.log("Res status ");

            const statusCode = response.status;
            console.log("Res status " + statusCode);

            if (response.status === 200) {
                console.log("Response status 200");
                // Request was successful
                const empty = [];
                updateItemsHandler(empty);
            } else {
                // Request was not successful
                console.log('Request failed:', response);
            }
        } catch (error) {
            console.error("Error posting to endpoint: ", error);
        }
    };

    // const handleModalLineClick = () => {
    //     passModalLineClick();
    // }

    const handleModalLineClick = () => {
        passModalLineClick();
    }

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
            <OrderListHeadings isOrderListEmpty={isOrderListEmpty} modalOrderLineClick={handleModalLineClick()}/>
            {/*<OrderListHeadings isOrderListEmpty={isOrderListEmpty} modalOrderLineClick={handleModalLineClick()}/>*/}
            <div className={"OrderList-lines-container"}>
                {orderLines.map((orderLine) => (
                    <OrderLine
                        key={orderLine.id}
                        itemName={orderLine.itemName}
                        itemQuantity={orderLine.itemQuantity}
                        itemPrice={orderLine.itemPrice}
                        onDelete={() => handleDeleteOrderLine(orderLine.itemName)}
                    />
                ))}
            </div>

            <OrderListSubtotal ordersTotal={getSubtotal()} handleButtonClick={uploadOrderData}/>
        </div>
    );
}

export default OrderList;
