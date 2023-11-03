import { RequestHandler } from "express";
import { Furniture } from "../../../Models/furniture";

export const post: RequestHandler = async (req, res) => {
  try {

    const { name, description, price } = req.query;

    if (name == "" || description == "" || price == null) {
      res.status(400).json({ error: 'Ошибка при сохранении мебели' });
    } else {

    const newFurniture = new Furniture({
      name,
      description,
      price
    });

    await newFurniture.save();

    res.status(201).json(newFurniture);
  }
  } catch (err) {
    res.status(400).json({ error: 'Ошибка при сохранении мебели' });
  }
}
