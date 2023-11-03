import { RequestHandler } from "express";
import { Furniture } from "../../../Models/furniture";

export const get: RequestHandler = async (req, res) => {
  const { name, description, price } = req.query;
  console.log(req.query);
  const filter: any = {};

  if (name) {
    filter.name = name;
  }

  if (price) {
    filter.price = price;
  }

  try {
    const furniture = await Furniture.find(filter).exec();
    res.status(200).json(furniture);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении мебели' });
  }
}
// export const get: RequestHandler = (req, res, next) => {
//     const id = req.params.id;

//     res.json({
//         id,
//         key: Math.random().toFixed(5),
//         value: 'HSE rules'
//     })
// }