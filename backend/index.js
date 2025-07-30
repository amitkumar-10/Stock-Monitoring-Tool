require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SEC;
const bcrypt = require("bcrypt");
const { z } = require("zod");
const url = process.env.MONGO_URL;
const flash = require("connect-flash");

const {PositionModel} = require('./Model/PositionModel');
const {HoldingModel} = require('./Model/HoldingModel');
const {OrderModel} = require('./Model/OrderModel');
const {UserModel} = require('./Model/UserModel');

const PORT = process.env.PORT ;
const app = express();
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://stock-monitoring-tool-pink.vercel.app/",
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));


app.use(flash());


app.get("/allHolding", async (req, res) => {  // fetch  holding data 
  try {
    const allHolding = await HoldingModel.find({});
    res.json(allHolding);
    console.log("data fatched")

  }
   catch (err) {
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }

});

app.get("/allPosition", async(req, res)=>{   // fetch position data
  try{
    const allPosition = await PositionModel.find({});
    res.json(allPosition);
    console.log("data fatched");
  }
  catch(err){
    console.error("Error:", err.message);
    res.status(500).json({ error: err.message });
  }
    
})

app.post("/newOrder",async (req, res) => {
  let newOrder = new OrderModel({
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    amount: req.body.amount, 
    mode : req.body.mode,

  });

  newOrder.save();
  res.send("order saved");
});

//buy stock
app.get("/allOrder", async (req, res) => {
  try {
    const allOrders = await OrderModel.find();
    res.json(allOrders);
  } 
  catch (err) {
    console.error(err);
    res.status(500).send("Error fetching orders");
  }

});

// sell stock
app.post("/sellOrder", async (req, res) => {
  try {
    const { id, sellQty } = req.body;
    const order = await OrderModel.findById(id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    if (sellQty >= order.qty) {
      await OrderModel.findByIdAndDelete(id);
    } else {
      order.qty -= sellQty;
      await order.save();
    }
    res.status(200).json({ message: "Sell successful" });
  } catch (err) {
    console.error("Sell error:", err);
    res.status(500).json({ message: "Sell failed", error: err.message });
  }
});

// Add this to your existing backend (anywhere before app.listen)
app.get("/getStockPrice", async (req, res) => {
  try {
    const stockName = req.query.name;
    if (!stockName) return res.status(400).json({ error: "Stock name is required" });

    const stock = await HoldingModel.findOne({ name: stockName });
    if (!stock) return res.status(404).json({ error: `Stock '${stockName}' not found` });

    res.json({ price: stock.price });
  } catch (err) {
    console.error("Error fetching stock price:", err);
    res.status(500).json({ error: "Server error", details: err.message });
  }
});
app.post("/signup", async (req, res) => {
  const schema = z.object({
    email: z.string().email(),
    password: z.string().min(3).max(50),
    name: z.string().min(3).max(50)
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ message: "Invalid input", error: result.error });
  }

  const { email, password, name } = req.body;

  try {
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ email, password: hashedPassword, name });

    res.status(201).json({ message: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SEC, { expiresIn: "2h" });

  res.status(200).json({ token });
});


 

//server
app.listen(8080, () =>{
    console.log("app is listening to port");
    mongoose.connect(url);
    console.log("conected to DB");
})
