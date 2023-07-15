function PastOrderLine({orderLineData}) {

    return (
        <div  className={"past-order-line-container"}>
            <label className={"past-order-line-element"}>{orderLineData.quantity}x</label>
            <label className={"past-order-line-element"}>{orderLineData.itemName}</label>
            <label className={"past-order-line-element"}>${orderLineData.totalPrice}</label>
        </div>
    )
}

export default PastOrderLine;