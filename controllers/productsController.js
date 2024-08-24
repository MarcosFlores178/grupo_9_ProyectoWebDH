const fs = require("fs");
const path = require("path");
const dataSource = require("../service/dataSource.js");
const productsController = {
  productsList: null,
  showDetails: (req, res) => {
    res.render("products/details-product");
  },

  showShopCart: (req, res) => {
    if (req.session.user) {
      const usuario = req.session.user;
      return usuario;
    }
    res.render("products/shop-cart", { usuario });
  },

  showAll: async (req, res) => {
    this.productsList = await dataSource.load();
    res.render("products/productos", { productos: this.productsList });
  },
  showById: async function (req, res) {
    const { id } = req.params;
    const productos = await dataSource.load();
    const product = productos.find((p) => p.id === id);
    res.render("products/details-product", { product });
  },
  showBrand: async (req, res) => {
    const { brand } = req.params.brand;
    this.productsList = await dataSource.load();
    res.render("products/brands", {
      productos: this.productsList,
      brand: brand,
    });
    console.log(this.productsList);
  },

  showAddProduct: (req, res) => {
    res.render("products/addproduct");
  },
  addProduct: async (req, res) => {
    const imgProduct = req.file
      ? `${req.file.filename}`
      : "/images/products/default.jpg";
    const { name, description, image, colors, price, size, brand } = req.body;
    const newProduct = {
      id: crypto.randomUUID(),
      name,
      description,
      image: imgProduct,
      colors,
      price,
      size,
      brand,
    };
    this.productsList = await dataSource.load();
    this.productsList.push(newProduct);
    await dataSource.save(this.productsList);
    console.log(newProduct);
    res.redirect("/products");
  },
  showEditForm: async (req, res) => {
    const { id } = req.params;
    const productos = await dataSource.load();
    const product = productos.find((p) => p.id === id);
    res.render("products/editproduct", { product, estilo: "editproduct" });
  },
  editProduct: async (req, res) => {
    let image = "";
    const { name, description, colors, price, size, brand, currentImage } =
      req.body;
    if (req.file?.filename) {
      image = `${req.file.filename}`;
    } else {
      image = req.body.currentImage;
    }
    const { id } = req.params;
    this.productsList = await dataSource.load();
    const updateProduct = this.productsList.map((p) =>
      p.id === id
        ? {
            id,
            name,
            description,
            image,
            colors,
            price,
            size,
            brand,
          }
        : p
    );
    await dataSource.save(updateProduct);
    res.redirect(`/products/detail/${id}`);
  },
  deleteProduct: async (req, res) => {
    // const { id } = req.params;
    // this.productsList = await dataSource.load();
    // const { image } = this.productsList.find((p) => p.id === id);
    // const filterProducts = this.productsList.filter((p) => p.id !== id);
    // await dataSource.save(filterProducts);
    // if (image !== "/images/default.jpg") {
    //   await dataSource.removeFile(image);
    // }

    const { id } = req.params;
    this.productsList = await dataSource.load();

    // Encuentra el producto a eliminar
    const productToDelete = this.productsList.find((p) => p.id === id);
    if (!productToDelete) {
      return res.status(404).send("Producto no encontrado");
    }

    // Filtra la lista de productos para eliminar el producto especificado
    const filteredProducts = this.productsList.filter((p) => p.id !== id);
    await dataSource.save(filteredProducts);

    if (productToDelete.image && productToDelete.image !== "default.jpg") {
      const imagePath = path.join(
        __dirname,
        "..",
        "public",
        "images",
        "products",
        productToDelete.image
      );
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Error al eliminar la imagen: ${err}`);
        }
      });
    }
    res.redirect("/products");
  },
};
module.exports = productsController;
