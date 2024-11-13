const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const port = 3000;

const cors = require("cors");
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting", error);
  });

app.listen(port, () => {
  console.log("Server is running on port = " + port);
});

const Menu = require("./models/menu");

app.post("/menu/addDish", async (req, res) => {
  try {
    const { date, name, type, mealType } = req.body;
    let menuItem = await Menu.findOne({ date });

    if (!menuItem) {
      menuItem = new Menu({ date });
    }

    menuItem.items.push({ name, type, mealType });
    await menuItem.save();
    res.status(200).json({ message: "Added", menuItem });
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/menu/all", async (req, res) => {
  try {
    const allMenuData = await Menu.find({});

    if (!allMenuData || allMenuData.length == 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(allMenuData);
  } catch (error) {
    console.log("Error", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.delete("/deleteItems/:date", async (req, res) => {
  const dateToDelete = req.params.date;

  try {
    const deletedItem = await Menu.findOneAndDelete({ date: dateToDelete });
    if (deletedItem) {
      res.status(200).json({ message: "Item deleted" });
    } else {
      res.status(404).json({ message: "error deleting the items" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
