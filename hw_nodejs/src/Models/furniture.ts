import mongoose, {Model, Schema } from "mongoose";

interface IFurniture extends Document {
    name: string;
    description: string;
    price: number;
  }
  
  const furnitureSchema = new Schema<IFurniture>({
    name: String,
    description: String,
    price: Number,
  });
  
  export const Furniture: Model<IFurniture> = mongoose.model('Furniture', furnitureSchema);