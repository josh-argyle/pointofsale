import axios from 'axios';
import {useState} from "react";
function OrderListSubtotal ({ordersTotal, handleButtonClick}) {



    return (
        <div className={"OrderList-subtotal-container"}>
            <div className={"OrderList-subtotal-heading"}>
                <h1>Total:</h1>
            </div>
            <div className={"OrderList-subtotal-subtotal"}>
                <h1>${ordersTotal}</h1>
            </div>
            <button className={"OrderList-subtotal-submitButton"} onClick={handleButtonClick}>Submit</button>
        </div>
    )
}

export default OrderListSubtotal;