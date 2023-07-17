// server/server.js

const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get Airtable API token
const airtable_api_token = process.env.AIRTABLE_API_KEY;
// Airtable.
const Airtable = require('airtable');
const path = require("path");
Airtable.configure({
    apiKey: airtable_api_token,
    endpointUrl: 'https://api.airtable.com'
});
// Get the airtable base from env variable.
const base = Airtable.base(process.env.AIRTABLE_BASE_ID);


async function getOrderHistory() {
    const tableName = "fish_and_chip";
    console.log("Getting order history");
    return new Promise((resolve, reject) => {
        const records = [];
        let key = 0;

        base(tableName).select({
            view: "Grid view",
            fields: ['Date', 'Notes', 'Total'],
        }).eachPage(
            function page(pageRecords, fetchNextPage) {
                pageRecords.forEach(function (record) {
                    console.log(key);
                    const recordObj = {
                        orderKey: key,
                        orderDate: record.get('Date'),
                        orderNotes: record.get('Notes'),
                        orderTotal: record.get('Total'),
                    }
                    records.push(recordObj);
                    key++;
                });
                fetchNextPage();
            },
            function done(err) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(records);
                }
            }
        );
    });
}
async function upload_order_data(data) {
    const tableName = "fish_and_chip";
    const currentDate = new Date();
    const dateToISO = currentDate.toISOString();

    // I need to add all the product lines to one string, then get the total price
    // let dataString = "";
    let totalPrice = 0;

    let dataString = data.orders.map(d => `${d.itemQuantity} '${d.itemName}' ${d.itemPrice}`).join(", ");
    data.orders.forEach((d) => {
        totalPrice += d.itemQuantity * d.itemPrice;
    })

    return new Promise((resolve, reject) => {
        base(tableName).create([
            {
                "fields": {
                    "Date": dateToISO,
                    "Notes": dataString,
                    "Total": totalPrice,
                }
            },
        ], function(err) {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
}

async function getMenuItems(menuSection) {
    const tableName = menuSection;
    console.log(`Getting ${menuSection} foods`);
    return new Promise((resolve, reject) => {
        const records = [];

        base(tableName).select({
            view: "Grid view",
            fields: ['id', 'foodName', 'foodPrice'],
        }).eachPage(
            function page(pageRecords, fetchNextPage) {
                pageRecords.forEach(function (record) {
                    const recordObj = {
                        id: record.get("id"),
                        foodName: record.get('foodName'),
                        foodPrice: record.get('foodPrice'),
                    }
                    records.push(recordObj);
                });
                fetchNextPage();
            },
            function done(err) {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(records);
                }
            }
        );
    });
}

app.post("/uploadOrderData", (req, res) => {
    console.log("Uploading order")
    const data = req.body;
    upload_order_data(data)

        .then(result => {
            console.log("Upload succeeded");
            res.status(200);
            res.json(result);
        })
        .catch(error => {
            console.log("Upload failed");

            res.status(500).json({ error: "An error occurred while processing the data." });
        });
});

app.get("/getOrderHistory", async (req, res) => {
    const orderHistory = await getOrderHistory();
    console.log(orderHistory);
    res.json(orderHistory);
})

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

app.get("/getFriedFoods", async (req, res) => {
    const menuItems = await getMenuItems("fried");
    console.log(menuItems);
    res.json(menuItems);
});

app.get("/getChineseFoods", async (req, res) => {
    const menuItems = await getMenuItems("chinese");
    res.json(menuItems);
});

app.get("/getBurgerFoods", async (req, res) => {
    const menuItems = await getMenuItems("burgers");
    res.json(menuItems);
});


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});