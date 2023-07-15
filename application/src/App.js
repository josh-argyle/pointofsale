import logo from './logo.svg';
import './App.css';
import OrderList from "./components/OrderList";
import OrderButtons from "./components/OrderButtons";
import {useState} from "react";

function App() {

    const [orderLines, setOrderLines] = useState([
        { id: 123, itemName: 'Item 1', itemQuantity: 3, itemPrice: 4 },
        { id: 122, itemName: 'Item 2', itemQuantity: 1, itemPrice: 4 },
    ]);

    const addItemHandler = (id, itemName, itemPrice) => {
        const newItem = {id:id, itemName: itemName, itemQuantity: 1, itemPrice: itemPrice };
        const existingItem = orderLines.find((item) => item.itemName === newItem.itemName);

        if (existingItem) {
            const updatedOrderLines = orderLines.map((item) => {
                if (item.itemName === newItem.itemName) {
                    return {
                        ...item,
                        itemQuantity: item.itemQuantity + newItem.itemQuantity,
                    };
                }
                return item;
            });

            setOrderLines(updatedOrderLines);
        } else {
            setOrderLines((prevOrderLines) => [...prevOrderLines, newItem]);
        }
        console.log(orderLines)
    };

    const handleOrderButtonClick = (id, inputName, inputPrice) => {
        console.log("handle order button click " + id + " " + inputName + "   " + inputPrice)
        addItemHandler(id, inputName, inputPrice)

    };

    const updateItemsHandler = (updatedOrderLines) => {
        setOrderLines(updatedOrderLines);
        console.log("update items handler")

    };

    const handleModalLineClick = () => {

    }

    return (
        <div className="App">
            <header className="App-header">

            </header>

            <div className="App-body">
                <div className="OrderList-container">
                    <OrderList orderLines={orderLines} updateItemsHandler={updateItemsHandler} passModalLineClick={handleModalLineClick} />
                </div>
                <div className="OrderButtons-container">
                    <OrderButtons handleOrder={handleOrderButtonClick}/>
                </div>
            </div>

            <footer className="App-footer">

            </footer>
        </div>
    );
}

export default App;