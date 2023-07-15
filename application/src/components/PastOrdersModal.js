import Modal from 'react-modal';
import {useEffect, useState} from "react";
import ModalHeading from "./ModalHeading";
import axios from "axios";
import ModalOrderLine from "./ModalOrderLine";
import PastOrderDetailsModal from "./PastOrderDetailsModal";

// function PastOrdersModal ({isOpen, onRequestClose, isOrderListEmpty, handleClickModalLine}) {
function PastOrdersModal ({isOpen, onRequestClose, isOrderListEmpty}) {

    /**
     *
     *  ADDING MODAL ETC so we can select the order line and revisit the order
     *
     */
    const [orderHistory, setOrderHistory] = useState([]);

    const defaultPastOrderHistory = {
        orderDate: new Date().toISOString(),
        orderKey: new Date().toISOString().toUpperCase(),
        orderNotes: "0 item 0",
        orderTotal: 0
    }
    const [pastOrderHistory, setPastOrderHistory] = useState(defaultPastOrderHistory);


    const handleClickModalOrderLine = (data) => {
        setPastOrderHistory(data);
        openOrderDetailsModal();
    }

    const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);

    const openOrderDetailsModal = () => {
        setIsOrderDetailModalOpen(true);
    }

    const closeOrderDetailsModal = () => {
        setIsOrderDetailModalOpen(false);
    }

    useEffect(() => {
        if (isOpen) {
            console.log("Fetching order history data");
            axios.get("/getOrderHistory")
                .then((response) => {
                    console.log("Data retrieved successfully")
                    console.log(response.data);
                    setOrderHistory(response.data);
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
    }, [isOpen]);


    return (
        <Modal className={"modal"} isOpen={isOpen} onRequestClose={onRequestClose} appElement={document.getElementById('root') || undefined}>
            <div className={"modal-container"}>
                <ModalHeading headingString={"Order History"} />
                <PastOrderDetailsModal orderData={pastOrderHistory} isOpen={isOrderDetailModalOpen} onRequestClose={closeOrderDetailsModal}/>
                <div className={"modal-orders-container"}>
                    {[...orderHistory].reverse().map((order, index) => (

                        <ModalOrderLine

                            key={`${order.orderDate}_${index}`}
                            orderData={order}
                            clickModalOrderLine={() => handleClickModalOrderLine(order)}
                        />
                    ))}
                </div>
            </div>
        </Modal>
    )
}

export default PastOrdersModal;