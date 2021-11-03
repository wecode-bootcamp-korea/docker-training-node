import prisma from "../prisma";

const findProducts = async (ordering) => {
  const a = await prisma.$queryRaw`
    SELECT * FROM products;
  `

  console.log('a', a)
  return a
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
