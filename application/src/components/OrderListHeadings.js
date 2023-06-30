function OrderListHeadings() {

    return (
        <div className={"OrderList-heading-container"}>
            <div className={"OrderList-heading-container-heading"}>
                <h1>Order</h1>
            </div>
            <div className={"OrderList-heading-subheading-container"}>
                <label>Quantity</label>
                <label className={"OrderList-heading-subheading-container-itemName"}>Item</label>
                <label className={"OrderList-heading-subheading-container-className"}>Price</label>
                <label className={"OrderList-heading-subheading-container-subtotal"}>Subtotal</label>
            </div>
        </div>
    )
}

export default OrderListHeadings;