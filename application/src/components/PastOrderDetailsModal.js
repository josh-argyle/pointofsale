import Modal from "react-modal";
import ModalHeading from "./ModalHeading";
import PastOrderLine from "./PastOrderLine";

function PastOrderDetailsModal ({ orderData, isOpen, onRequestClose }) {

    function getSeparatedLines() {
        const itemsList = orderData.orderNotes;
        console.log(itemsList);
        const removedPunctuation = itemsList.replace(/'/g, " ");
        console.log(removedPunctuation);
        const listParts = removedPunctuation.split(", ");

        const items = [];
        listParts.forEach((item, index) => {
            const currentItem = {
                quantity: item[0],
                itemName: item.slice(1, item.length - 2),
                totalPrice: item[item.length - 1],
            }
            items.push(currentItem);
        })

        return items;
    }

    function getDateFromDateString(dateInput) {
        const date = new Date(dateInput);
        return date.toLocaleDateString();
    }
    function getTimeFromDateString(dateInput) {
        const date = new Date(dateInput);
        return  date.toLocaleTimeString();
    }

    return (
        <div>
            <Modal className={"past-modal"} isOpen={isOpen} onRequestClose={onRequestClose} appElement={document.getElementById('root') || undefined}>
                <div className={"modal-container past-order-modal-container"}>
                    <ModalHeading headingString={"Order Details"} />
                    <div className={"modal-past-orders-container"}>
                        <label>{getTimeFromDateString(orderData.orderDate)}</label>
                        <label>{getDateFromDateString(orderData.orderDate)}</label>

                        <div className={"modal-past-orders-container-items-list"}>
                            {getSeparatedLines().map((item) => (
                                <PastOrderLine key={item.itemName + orderData.orderDate} orderLineData={item} />
                            ))}
                            {/*<label>{orderData.orderNotes}</label>*/}
                        </div>
                        <label className={"past-order-line-total"}>Total: ${orderData.orderTotal}</label>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default PastOrderDetailsModal;