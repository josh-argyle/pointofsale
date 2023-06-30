function OrderListSubtotal ({ordersTotal}) {

    return (
        <div className={"OrderList-subtotal-container"}>
            <div className={"OrderList-subtotal-heading"}>
                <h1>Subtotal:</h1>
            </div>
            <div className={"OrderList-subtotal-subtotal"}>
                <h1>${ordersTotal}</h1>
            </div>
        </div>
    )
}

export default OrderListSubtotal;