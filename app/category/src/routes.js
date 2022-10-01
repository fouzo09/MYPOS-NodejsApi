const express = require("express");
const categorieRouter = express.Router();

const { 
        createCategorie,
        getCategories,
        getCategorie,
        updateCategorie,
        deleteCategorie
    } = require('./controllers/categorie.js');
categorieRouter.get('/', getCategories);
categorieRouter.get('/:categorieID', getCategorie);
categorieRouter.post('/', createCategorie);
categorieRouter.put('/:categorieID', updateCategorie);
categorieRouter.delete('/:categorieID', deleteCategorie);

module.exports = categorieRouter;