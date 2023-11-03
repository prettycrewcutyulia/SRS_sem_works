import { Router } from "express";
import { get } from "./methods/get";
import { post } from "./methods/post";

const router = Router();

export const furnitureController = {
    get: get,
    post: post,
}

router.get('/', furnitureController.get);

router.post('/', furnitureController.post);
router.get('/example', (req, res) => {
    res.status(200).json({ message: 'Success' });
  });
  

export default router;