import ReactModal from 'react-modal';
import {useState} from "react";
import PastOrdersModal from "./PastOrdersModal";
function OrderListHeadings({isOrderListEmpty, modalOrderLineClick}) {

    const [modalActive, setModalActive] = useState(false);

    const openModal = () => {
        setModalActive(true);
    }
    const closeModal = () => {
        setModalActive(false);
    }

    // const passModalLineClick = () => {
    //     modalOrderLineClick();
    // }

    return (
        <div className={"OrderList-heading-container"}>
            <div className={"OrderList-heading-container-heading"}>
                <h1>Order</h1>
                <button className={"OrderList-heading-container-button"} onClick={openModal}>Past Orders</button>
                {/*<PastOrdersModal isOpen={modalActive} onRequestClose={closeModal} isOrderListEmpty={isOrderListEmpty} handleClickModalLine={passModalLineClick} />*/}
                <PastOrdersModal isOpen={modalActive} onRequestClose={closeModal} isOrderListEmpty={isOrderListEmpty} />
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