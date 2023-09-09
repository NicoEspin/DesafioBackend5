import { Router } from "express";
import { cartModel } from "../models/cart.models.js";

const cartRouter = Router();

cartRouter.get("/id", async (req, res) => {
  productRouter.get("/id", async (req, res) => {
    const { cart } = req.params;

    try {
      const cart = await cartModel.findById(cart);
      if (cart) {
        res.status(200).send({ respuesta: "OK", mensaje: cart });
      } else {
        res
          .status(404)
          .send({ respuesta: "Error al buscar carrito", mensaje: "Not Found" });
      }
    } catch (error) {
      res.status(400).send({ respuesta: "Error", mensaje: error });
    }
  });
});


export default cartRouter;