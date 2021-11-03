import prisma from "../prisma";

const findProducts = async (ordering) => {
  return await prisma.$queryRaw`
    SELECT * FROM products;
  `
};

const findOneProduct = async (productId) => {
  return await prisma.product.findUnique({
    where: {
      id: productId,
    },
    select: {
      id: true,
      name: true,
      price: true,
      weight: true,
      productSize: {
        select: {
          name: true,
        },
      },
      productImage: {
        select: {
          imageUrl: true,
        },
      },
    },
  });
};
export default { findProducts, findOneProduct };
