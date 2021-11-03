import { productService } from "../services";

const findProducts = async (req, res) => {
  try {
    const products = await productService.findProducts();
    return res.status(200).json({ products });
  } catch (err) {
    console.log(err);
  }
};

export default { findProducts };
