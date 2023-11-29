const { getAll, create, getOne, remove, update, postPurchase } = require('../controllers/purchase.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const purchaseRouter = express.Router();

purchaseRouter.route('/')
    .get(verifyJWT,getAll)
    .post(verifyJWT, postPurchase)


module.exports = purchaseRouter;