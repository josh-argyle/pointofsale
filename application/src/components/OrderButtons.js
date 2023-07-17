import OrderButton from "./OrderButton";
import {useEffect, useState} from "react";
import axios from "axios";

function OrderButtons({handleOrder}) {

    const [friedFoods, setFriedFoods] = useState([
        // { id: 1, foodName: 'Chips', foodPrice: 3},
        // { id: 2, foodName: 'Fish', foodPrice: 5},
    ]);
    const [chineseFoods, setChineseFoods] = useState([
        // { id: 3, foodName: 'Chicken fried rice', foodPrice: 15},
        // { id: 4, foodName: 'Egg fried rice', foodPrice: 13},
    ]);
    const [burgers, setBurgerFoods] = useState([
        // { id: 5, foodName: 'Cheeseburger', foodPrice: 7},
        // { id: 6, foodName: 'Vege burger', foodPrice: 5},
    ]);

    useEffect(() => {
        console.log("Fetching fried food data.")
        axios.get("/getFriedFoods")
            .then((response) => {
                console.log("Fried foods retrieved successfully");
                console.log(response.data);
                setFriedFoods(response.data);
            })
            .catch((error) => {
                console.log("Error fetching fried foods: ", error)
            });
    }, []);

    useEffect(() => {
        console.log("Fetching chinese food data.")
        axios.get("/getChineseFoods")
            .then((response) => {
                console.log("Chinese foods retrieved successfully");
                console.log(response.data);
                setChineseFoods(response.data);
            })
            .catch((error) => {
                console.log("Error fetching chinese foods: ", error)
            });
    }, []);

    useEffect(() => {
        console.log("Fetching burger food data.")
        axios.get("/getBurgerFoods")
            .then((response) => {
                console.log("Burger foods retrieved successfully");
                console.log(response.data);
                setBurgerFoods(response.data);
            })
            .catch((error) => {
                console.log("Error fetching burger foods: ", error)
            });
    }, []);




    const handleOrderClick = (inputName, inputPrice) => {
        console.log("handle order click")

        handleOrder(inputName, inputPrice)
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
                            buttonText={friedFood.foodName}
                            onAddItem={() => handleOrderClick(friedFood.foodName, friedFood.foodPrice)}
                        />
                    ))}
                </div>
                <div className="OrderButtons-buttons-container" id="chinese">
                    {chineseFoods.map((chineseFood) => (
                        <OrderButton
                            buttonText={chineseFood.foodName}
                            onAddItem={() => handleOrderClick(chineseFood.foodName, chineseFood.foodPrice)}
                        />
                    ))}
                </div>
                <div className="OrderButtons-buttons-container" id="burgers">
                    {burgers.map((burger) => (
                        <OrderButton
                            buttonText={burger.foodName}
                            onAddItem={() => handleOrderClick(burger.foodName, burger.foodPrice)}
                        />
                    ))}
                </div>
            </div>

        </div>

    )
}

export default OrderButtons;