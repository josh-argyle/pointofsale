import OrderButton from "./OrderButton";
import {useState} from "react";

function OrderButtons({handleOrder}) {

    const [friedFoods, setFriedFoods] = useState([
        { id: 1, foodName: 'Chips', foodPrice: 3},
        { id: 2, foodName: 'Fish', foodPrice: 5},
    ]);
    const [chineseFoods, setChineseFoods] = useState([
        { id: 3, foodName: 'Chicken fried rice', foodPrice: 15},
        { id: 4, foodName: 'Egg fried rice', foodPrice: 13},
    ]);
    const [burgers, setBurgers] = useState([
        { id: 5, foodName: 'Cheeseburger', foodPrice: 7},
        { id: 6, foodName: 'Vege burger', foodPrice: 5},
    ]);

    const handleOrderClick = (id, inputName, inputPrice) => {
        console.log("handle order click")

        handleOrder(id, inputName, inputPrice)
    }

    return (
        <div>
            <div className="OrderButtons-container-labels">
                <label>Fried</label>
                <label>Chinese</label>
                <label>Burgers</label>
            </div>
            <div className="OrderButtons-container-buttons">
                <div className="OrderButtons-buttons-container" id="fried">
                    {friedFoods.map((friedFood) => (
                        <OrderButton
                            key = {friedFood.id}
                            buttonText={friedFood.foodName}
                            onAddItem={() => handleOrderClick(friedFood.id, friedFood.foodName, friedFood.foodPrice)}
                        />
                    ))}
                </div>
                <div className="OrderButtons-buttons-container" id="chinese">
                    {chineseFoods.map((chineseFood) => (
                        <OrderButton
                            key = {chineseFood.id}
                            buttonText={chineseFood.foodName}
                            onAddItem={() => handleOrderClick(chineseFood.id, chineseFood.foodName, chineseFood.foodPrice)}
                        />
                    ))}
                </div>
                <div className="OrderButtons-buttons-container" id="burgers">
                    {burgers.map((burger) => (
                        <OrderButton
                            key = {burger.id}
                            buttonText={burger.foodName}
                            onAddItem={() => handleOrderClick(burger.id, burger.foodName, burger.foodPrice)}
                        />
                    ))}
                </div>
            </div>

        </div>

    )
}

export default OrderButtons;