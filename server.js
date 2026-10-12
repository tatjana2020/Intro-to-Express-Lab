const express=require("express")
//const morgan=require('morgan')
const port='3000'
const app=express()
const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];
const shoes = [
      { name: "Birkenstocks", price: 50, type: "sandal" },
      { name: "Air Jordans", price: 500, type: "sneaker" },
      { name: "Air Mahomeses", price: 501, type: "sneaker" },
      { name: "Utility Boots", price: 20, type: "boot" },
      { name: "Velcro Sandals", price: 15, type: "sandal" },
      { name: "Jet Boots", price: 1000, type: "boot" },
      { name: "Fifty-Inch Heels", price: 175, type: "heel" }
  ];
//app.use(morgan("dev"))

app.get('/',(req,res)=> {
    res.send('<h1>Hello this is the homepage.</h1>')
} )             
// Task 1 
app.get('/greetings/:username',(req,res)=>{
    const username=req.params.username
    res.send(`Hello there ${username}`)
}) 


// Task: 2. Rolling the Dice

app.get('/roll/:number', (req, res) => {
  const numberParam = req.params.number;
  const brNumber = Number(numberParam, 10);
  if (isNaN(brNumber)) {
    return res.send("You must specify a number.");
  }
  const rolledNumber = Math.floor(Math.random() * brNumber);
  res.send(`You rolled a ${rolledNumber}.`);
});


// Task: 3. Create a route for URLs like /collectibles/<index-parameter>.
app.get('/collectibles/:index', (req, res) => {
  const index = Number(req.params.index);
  const item = collectibles[index];

  if (!Number.isInteger(index) || !item) {
    return res.send('This item is not yet in stock. Check back soon!');
  }

  res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
});

app.get('/hello', (req, res) => {
    res.send(`Hello there, ${req.query.name}! I hear you are ${req.query.age} years old!`);
});


// Task 4. Filter Shoes by Query Parameters
  app.get('/shoes', (req, res) => {
  const minPrice = req.query['min-price'];
  const maxPrice = req.query['max-price'];
  const type = req.query.type;

  let fil= shoes;

  if (minPrice) {
    fil = fil.filter(shoe => shoe.price >= Number(minPrice));
  }

  if (maxPrice) {
    fil = fil.filter(shoe => shoe.price <= Number(maxPrice));
  }

  if (type) {
    fil = fil.filter(shoe => shoe.type === type);
  }

  res.send(fil);
});


app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
})