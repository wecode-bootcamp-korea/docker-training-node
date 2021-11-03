import { productDao } from "../models";

const findProducts = async () => {
  return await productDao.findProducts();
};

export default { findProducts };
