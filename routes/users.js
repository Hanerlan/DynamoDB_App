var express = require('express');
var router = express.Router();
// establish a connection with the NoSQL database
const CyclicDB = require('@cyclic.sh/dynamodb')
const db = CyclicDB(process.env.CYCLIC_DB)
let users = db.collection('users')

/* GET users listing. */
router.get('/', async function(req, res, next) { // all users from the database
  let list = await users.list();
  res.send(list);
});

router.get('/:key', async function(req, res, next) { // details of user of the specified key (email)
  let item = await users.get(req.params.key);
  res.send(item);
});


/* POST to add a new user */
router.post('/', async (req, res, next) => { 
  const { email, firstName, lastName, age } = req.body;
  await users.set(email, {
    firstName: firstName,
    secondName: lastName,
    age: age
  })
  res.end();
});


/* PUT to update the user */
router.put('/', async (req, res, next) => {
  const { email, firstName, lastName, age } = req.body;
  await users.set(email, {
    firstName: firstName,
    secondName: lastName,
    age: age
  })
  res.end();
});


/* DELETE the user */
router.delete('/:key', async (req, res, next) => {
  await users.delete(req.params.key);
  res.end();
});

module.exports = router;
