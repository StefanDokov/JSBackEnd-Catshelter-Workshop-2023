const router = require('express').Router();
const Breed = require('../models/Breed');
const Cat = require('../models/Cat');

router.get('/', async(req, res) => {
    console.log(req.query)
    const {search} = req.query;
    
    let catss = await Cat.find().lean();

    if(search){
      catss = catss.filter(cat => cat.name.toLowerCase().includes(search.toLowerCase()));
    }

    res.render('index', { catss });
});

router.get('/:catId/edit', async(req, res) => { 
    const oneCat = await Cat.findById(req.params.catId).lean();
    const breeds = await Breed.find().lean();
    res.render('editCat', {oneCat, breeds});
});

router.post('/:catId/edit', async(req, res) => {
    const {name, description, imageUrl, breed} = req.body;
    await Cat.findByIdAndUpdate(req.params.catId, {name, description, imageUrl, breed}, {runValidators: true});
    res.redirect('/');
});

router.get('/:catId/shelter', async(req, res) => {
    const oneCat = await Cat.findById(req.params.catId).lean();
    res.render('catShelter', {oneCat});
});

router.post('/:catId/shelter', async(req, res)=> {
   await Cat.findByIdAndDelete(req.params.catId);
   res.redirect('/');
});

router.get('/cats/add-breed', (req, res) => {
    res.render('addBreed');
});

router.post('/cats/add-breed', async(req, res) => {
    const { breed: name } = req.body;
    const breed =  new Breed({ name });
    await breed.save();

    res.redirect('/');
});

router.get('/cats/add-cat', async(req, res) => {
    const breeds = await Breed.find().lean();
    res.render('addCat', {breeds});
});

router.post('/cats/add-cat', async(req, res) => {

    const {name, description, imageUrl, breed} = req.body;
    const caterino = new Cat({name, description, imageUrl, breed});
   console.log(caterino)
    await caterino.save();

   res.redirect('/');

});




module.exports = router;