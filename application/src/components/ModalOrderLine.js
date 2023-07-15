function ModalOrderLine({orderData, clickModalOrderLine}) {

    function getDateFromDateString(dateInput) {
        const date = new Date(dateInput);
        return date.toLocaleDateString();
    }
    function getTimeFromDateString(dateInput) {
        const date = new Date(dateInput);
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

    }

    return (
        <div className={"modal-order-line-container"} onClick={clickModalOrderLine}>
            <div className={"modal-order-line-date"}>
                <label>{getDateFromDateString(orderData.orderDate) + " " + getTimeFromDateString(orderData.orderDate)}</label>
            </div>
            <div className={"modal-order-line-totalPrice"}>
                <label>${orderData.orderTotal}</label>
            </div>
        </div>
    )
}

export default ModalOrderLine;