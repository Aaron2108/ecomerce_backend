const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const Image = require('../models/Image');

const getAll = catchError(async(req, res) => {
    const userId = req.user.id
    const results = await Purchase.findAll({where: {userId},
        include: [{
            model:Product,
            include: [Image]
        }]
    });
    return res.json(results);
});

const postPurchase = catchError(async(req, res) => {
    const userId = req.user.id
        const cart = await Cart.findAll({
            where: {userId: req.user.id},
            attributes: ['userId', 'productId', 'quantity'],
            raw: true,
        });

if(cart.length === 0) return res.json({message: "The cart is empty"})

    const purchase = await Purchase.bulkCreate(cart);
    await Cart.destroy({where: {userId}})
    return res.json(purchase);
});

module.exports = {
    getAll,
    postPurchase
}