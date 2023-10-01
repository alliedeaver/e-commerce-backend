const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories

  try {
    const ecommerceData = await Category.findAll({
      include: [{ model: Product }],
    });
    if (ecommerceData.length === 0) {
      return res.status(404).json({ message: 'No category found!' });
      
    }
    return res.status(200).json(ecommerceData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const ecommerceData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });

    if (!ecommerceData) {
     return res.status(404).json({
        message: 'No category by id is found!'
      })
    
    }
    return res.status(200).json(ecommerceData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Products
});

router.post('/', async (req, res) => {
  //create a new category


  try {
    const { category_name } = req.body

    if (!category_name) {
      res.status(400).json({ message: 'Please pass correct structure of name' });
      return;
    }

    const newCategory = Category.create(req.body);

    return res.status(200).json(category_name);
  } catch (err) {
    res.status(500).json(err);
  }

})


// update a category by its `id` value

router.put('/:id', async (req, res) => {

  try {
    const { category_name } = req.body

    if (!category_name) {
      res.status(400).json({ message: 'Please pass correct structure of name' });
      return;
    }

    const updatedCategory = Category.update(req.body,
      {
        where: {
          id: req.params.id
        }
      });

    return res.status(200).json(category_name);
  } catch (err) {
    res.status(500).json(err);
  }
});



router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCategory = await Category.destroy({
      where: {
        id: req.params.id,
      },

    })
    if (!deletedCategory) {
      res.status(404).json({
        message: 'No category is deleted!'
    })
      return;
    }
    return res.status(200).json(deletedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
