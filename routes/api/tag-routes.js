const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags

  try {
    const tagData = await Tag.finAll ({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
  // be sure to include its associated Product data

});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`

try {
  const tagData = await Tag.findByPk(req.params.id, {
    include: [{ model: Product}, { model: ProductTag}]
  });
  if (!tagData) {
    res.status(404).json({ message: 'No tag found by that id'});
    return;
  }
  req.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}

  // be sure to include its associated Product data
});

router.post('/', async (req, res) => {
  // create a new tag

  const newTag = {
    name: 'New Tag Name',
    description: "tag description"
  };

});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value

  Tag.update(
    { 
      tag_name: req.body.name,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
  .then((updatedTag) => {
    res.json(updatedTag);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  })

});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value

  Tag.destroy({
    where: {
      tag_id: req.params.tag_id,
    },
  })
    .then((deletedTag) => {
      res.json(deletedTag);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
