const express = require("express");
const saleRouter = express.Router();

const { 
        createSale,
        getSales,
        getSale,
        updateSale,
        deleteSale
    } = require('./src/controllers/sale.js');
saleRouter.get('/', getSales);
saleRouter.get('/:saleID', getSale);
saleRouter.post('/', createSale);
saleRouter.put('/:saleID', updateSale);
saleRouter.delete('/:saleID', deleteSale);

module.exports = saleRouter;