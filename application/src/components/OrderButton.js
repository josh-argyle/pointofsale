function OrderButton({buttonText, onAddItem}) {

    const handleClick = () => {
        onAddItem(buttonText);
    }

    return (
        <button className={"OrderButton"} onClick={handleClick}>{buttonText}</button>
    )
}
export default OrderButton;