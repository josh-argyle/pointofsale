function ModalOrderLine({orderData, clickModalOrderLine}) {

    return (
        <div className={"modal-order-line-container"} onClick={clickModalOrderLine}>
            <div className={"modal-order-line-date"}>
                <label>{orderData.orderDate}</label>
            </div>
            <div className={"modal-order-line-totalPrice"}>
                <label>{orderData.orderTotal}</label>
            </div>
        </div>
    )
}

export default ModalOrderLine;