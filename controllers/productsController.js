const productsController = {
    showDetails: (req, res) => {
        res.render('products/details-product');
    },

    showShopCart: (req, res) => {
        res.render('products/shop-cart');
    },

    showAddProduct: (req, res) => {
        res.render('products/addproduct');
    }
};
module.exports = productsController;