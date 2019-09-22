const {Customer, validate} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
  });
  
  router.post('/', async (req,res) => {
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
      
    let customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold
    });
    customer = await Customer.save();

    res.send(customer);
}); 

router.put('/:id', async (req,res) => {
  const { error } = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);
    
  const Customer = await Customer.findByIdAndUpdate(req.params.id,
     {
         name: req.body.name,
         isGold: req.body.isGold,
         phone: req.body.phone
        },{new: true});
 
  if(!Customer) return res.status(404).send('The Customer with given Id was not found.');

    res.send(Customer);
});

router.delete('/:id', async (req,res) =>{
  const Customer = await Customer.findByIdAndRemove(req.params.id);

  if(!Customer) return res.status(404).send('The Customer with given Id was not found.');
  
    res.send(Customer);
});

router.get('/:id', async (req,res) => {
  const Customer = await Customer.findById(req.params.id);
   
  if(!course) return res.status(404).send('The Customer with given Id was not found.');
   
  res.send(Customer);
});

module.exports = router;