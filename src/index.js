import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/users.routes.js";
import productRouter from "./routes/products.routes.js";
import cartRouter from "./routes/cart.routes.js";
import { __dirname } from "./path.js";
import multer from "multer";
import exphbs from "express-handlebars";

const app = express();
const PORT = 4000;

mongoose
  .connect(
    "mongodb+srv://NicoEspin:password@cluster0.anyqwms.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("BDD Conectada"))
  .catch(() => console.log("Error en coneccion a BDD"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const hbs = exphbs.create();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.resolve(__dirname, "./views"));
const upload = multer({ storage: storage });
app.use("/chat", express.static(path.join(__dirname, "/public")));

app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.listen(PORT, () => {
  console.log(`server on PORT :${PORT}`);
});
