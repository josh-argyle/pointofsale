import logo from './logo.svg';
import './App.css';
import OrderList from "./components/OrderList";
import OrderButtons from "./components/OrderButtons";
import {useState} from "react";

function App() {

    const [orderLines, setOrderLines] = useState([
        { itemName: 'Item 1', itemQuantity: 3, itemPrice: 4 },
        { itemName: 'Item 2', itemQuantity: 1, itemPrice: 4 },
    ]);

    const addItemHandler = (itemName, itemPrice) => {
        const newItem = { itemName: itemName, itemQuantity: 1, itemPrice: itemPrice };
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

    const handleOrderButtonClick = (inputName, inputPrice) => {
        console.log("handle order button click " + inputName + "   " + inputPrice)
        addItemHandler(inputName, inputPrice)

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

            <body className="App-body">
                <div className="OrderList-container">
                    <OrderList orderLines={orderLines} updateItemsHandler={updateItemsHandler} passModalLineClick={handleModalLineClick} />
                </div>
                <div className="OrderButtons-container">
                    <OrderButtons handleOrder={handleOrderButtonClick}/>
                </div>
            </body>

            <footer className="App-footer">

            </footer>
        </div>
    );
}

export default App;