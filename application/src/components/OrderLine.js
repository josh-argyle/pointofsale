function OrderLine({ itemName, itemQuantity, itemPrice, onDelete}) {
    const handleDelete = () => {
        console.log("OrderLine")

        onDelete();
    };

    return (
        <div className="OrderLine-container">
            <label className="OrderLine-container-itemQuantity">{itemQuantity}</label>
            <label className="OrderLine-container-itemName">{itemName}</label>
            {/*<button className="OrderLine-container-deleteButton"onClick={handleDelete}>delete</button>*/}
            <button className="OrderLine-container-deleteButton"onClick={handleDelete}><img src={"./trashcan_transparent.png"} className={"OrderLine-container-deleteButton-image"}/></button>
            <label className="OrderLine-container-itemPrice">{itemPrice}</label>
            <label className="OrderLine-container-totalPrice">{itemQuantity * itemPrice}</label>
        </div>
    );
}

export default OrderLine;
