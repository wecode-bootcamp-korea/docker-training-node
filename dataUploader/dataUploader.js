const csv = require("csv-parser");
const fs = require("fs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createColor = () => {
  fs.createReadStream("./dataUploader/colors.csv")
    .pipe(csv())
    .on("data", async (c) => {
      try {
        console.log(c);
        await prisma.$queryRaw`
			    INSERT INTO colors(id, name) VALUES (${c.id}, ${c.name})
		  	`;
      } catch (err){
        console.log("error", err);
      }
    })
    .on("end", async () => {
      prisma.$disconnect();
    });
};

const createProduct = () => {
  fs.createReadStream("./dataUploader/productsFalseName.csv")
    .pipe(csv())
    .on("data", async (p) => {
      try {
        console.log(p);
        await prisma.$queryRaw`
		  	  INSERT INTO products(id, name, price) VALUES (${p.id}, ${p.name}, ${p.price})
	  		`;
      } catch (err) {
        console.log("error", err);
      }
    })
    .on("end", async () => {
      prisma.$disconnect();
    });
};

const createProductColor = () => {
  fs.createReadStream("./dataUploader/productColor.csv")
    .pipe(csv())
    .on("data", async (p) => {
      try {
        console.log(p);
        if (p['color id']) {
          await prisma.$queryRaw`
		  	    INSERT INTO product_colors(
              id,
              product_id,
              color_id,
              is_default
            ) VALUES (
              ${p.id},
              ${p['product id']},
              ${p['color id']},
              ${p['is default']}
            )`;
        } else {
          await prisma.$queryRaw`
		  	    INSERT INTO product_colors(
              id,
              product_id,
              is_default
            ) VALUES (
              ${p.id},
              ${p['product id']},
              ${p['is default']}
            )`;
        }
      } catch (err) {
        console.log("error", err);
      }
    })
    .on("end", async () => {
      prisma.$disconnect();
    });
}

const createProductImage = () => {
  fs.createReadStream("./dataUploader/productImagesFalseUrl.csv")
    .pipe(csv())
    .on("data", async (p) => {
      try {
        await prisma.$queryRaw`
		  	  INSERT INTO product_images(
            id,
            image_url,
            product_color_id
          ) VALUES (
            ${p.id},
            ${p['image url']},
            ${p['product color id']}
          )`;
      } catch (err) {
        console.log("error", err);
      }
    })
    .on("end", async () => {
      prisma.$disconnect();
    });
};

createColor();
createProduct();
createProductColor()
// createProductImage()
