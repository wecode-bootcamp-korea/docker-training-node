import prisma from "../prisma";

const findProducts = async () => {
  return await prisma.$queryRaw`
    SELECT * FROM products;
  `
};

export default { findProducts };
