import Modal from 'react-modal';
import {useEffect, useState} from "react";
import ModalHeading from "./ModalHeading";
import axios from "axios";
import ModalOrderLine from "./ModalOrderLine";

function PastOrdersModal ({isOpen, onRequestClose}) {

    /**
     *  NEED TO ADD THE CORRECT PATH AND GET ORDER HISTORY RETRIEVAL WORKING
     *
     *
     */
    const [orderHistory, setOrderHistory] = useState([]);

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
    }, []);

    return (
        <Modal className={"modal"} isOpen={isOpen} onRequestClose={onRequestClose} appElement={document.getElementById('root') || undefined}>
            <div className={"modal-container"}>
                <ModalHeading/>
                <div className={"modal-orders-container"}>
                    {orderHistory.map((order) => (
                        <ModalOrderLine
                            orderData={order}
                        />
                    ))}
                </div>
            </div>
        </Modal>
    )
}

export default PastOrdersModal;