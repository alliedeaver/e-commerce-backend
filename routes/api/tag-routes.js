const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags

  try {
    const tagData = await Tag.findAll ({
      include: [{ model: Product }],
    });
    if (tagData.length === 0) {
        return res.status(404).json({ message: 'No tag found!' });
    }
   return res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated tag data
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`

try {
    const tagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product}, { model: ProductTag}]
  });


  if (!tagData) {
    return res.status(404).json({ 
      message: 'No tag found by that id'
     })
    
    }
     return res.status(200).json(tagData);
  }  catch (err) {
     res.status(500).json(err);
  }

  // be sure to include its associated tag data
});

router.post('/', async (req, res) => {
  // create a new tag

  try {
    const { tag_name } = req.body

    if (!tag_name) {
      res.status(400).json({ message: 'Please pass correct structure of tag' });
      return;
    }

      const newTag = Tag.create(req.body);

      return res.status(200).json(tag_name);
  }   catch (err) {
      res.status(500).json(err);
  }

})

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  
  try {
    const { tag_name } = req.body

    if (!tag_name) {
      res.status(400).json({ message: 'Please pass correct structure of the tag' });
      return;
    }

    const updatedTag = Tag.update(req.body,
      {
        where: {
          id: req.params.id
        }
      });

    return res.status(200).json(Tag_name);
  } catch (err) {
    res.status(500).json(err);
  }
});


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },

    })
    if (!TagCategory) {
      res.status(404).json({
        message: 'No tag is deleted!'
    })
      return;
    }
    return res.status(200).json(deletedTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
