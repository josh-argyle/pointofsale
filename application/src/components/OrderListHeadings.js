import ReactModal from 'react-modal';
import {useState} from "react";
import PastOrdersModal from "./PastOrdersModal";
function OrderListHeadings() {

    const [modalActive, setModalActive] = useState(false);

    const openModal = () => {
        setModalActive(true);
    }
    const closeModal = () => {
        setModalActive(false);
    }

    return (
        <div className={"OrderList-heading-container"}>
            <div className={"OrderList-heading-container-heading"}>
                <h1>Order</h1>
                <button className={"OrderList-heading-container-button"} onClick={openModal}>Past Orders</button>
                <PastOrdersModal isOpen={modalActive} onRequestClose={closeModal} />
            </div>
            <div className={"OrderList-heading-subheading-container"}>
                <label className={"OrderList-heading-subheading-container-quantity"}>Q#</label>
                <label className={"OrderList-heading-subheading-container-itemName"}>Item</label>
                <label className={"OrderList-heading-subheading-container-className"}>Price</label>
                <label className={"OrderList-heading-subheading-container-subtotal"}>Subtotal</label>
            </div>
        </div>
    )
}

export default OrderListHeadings;