import { Router } from "express";
import { productModel } from "../models/products.models";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const { limit } = req.query;

  try {
    const prods = await productModel.find().limit(limit);
    res.status(200).send({ respuesta: "OK", mensaje: prods });
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
});

productRouter.get("/id", async (req, res) => {
  const { id } = req.params;

  try {
    const prod = await productModel.findById(id);
    if (prod) {
      res.status(200).send({ respuesta: "OK", mensaje: prod });
    } else {
      res.status(404).send({ respuesta: "Error", mensaje: "Not Found" });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
});

productRouter.put("/id", async (req, res) => {
  const { id } = req.params;
  const { title, description, code, price, category, stock, status } = req.body;

  try {
    const prod = await productModel.findByIdAndUpdate(id, {
      title,
      description,
      code,
      price,
      category,
      stock,
      status,
    });
    if (prod) {
      res
        .status(200)
        .send({ respuesta: "OK", mensaje: "Producto Actualizado" });
    } else {
      res.status(404).send({
        respuesta: "Error en actualizar el producto",
        mensaje: "Not Found",
      });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
});

productRouter.delete("/id", async (req, res) => {
  try {
    const prod = await productModel.findByIdAndDelete(id, {
      title,
      description,
      code,
      price,
      category,
      stock,
    });
    if (prod) {
      res.status(200).send({ respuesta: "OK", mensaje: "Producto Elminado" });
    } else {
      res.status(404).send({
        respuesta: "Error en eliminar el producto",
        mensaje: "Not Found",
      });
    }
  } catch (error) {
    res.status(400).send({ respuesta: "Error", mensaje: error });
  }
});

productRouter.post("/", async (req, res) => {
  const { title, description, stock, code, price, category } = req.body;
  try {
    const prod = await productModel.create({
      title,
      description,
      stock,
      code,
      price,
      category,
    });
    res.status(200).send({ respuesta: "OK", mensaje: prod });
  } catch (error) {
    res
      .status(400)
      .send({ respuesta: "Error en crear productos", mensaje: error });
  }
});

export default productRouter;
