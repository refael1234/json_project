const express = require('express')
const app = express()
const bp = require('body-parser')
const db = require('mongoose')
app.use(express.static('pages'))
app.use(express.json());

app.use(bp.urlencoded())
app.use(bp.json())
db.connect('mongodb+srv://reacm06:Reacm957412@cluster0.5mnshbp.mongodb.net/svshop');

const userSchema = db.Schema({
    name: String,
    email: String,
    password: String
});

const usersModel = db.model('user', userSchema);

const productSchema = db.Schema({
    name: String,
    price: Number
});

const productModel = db.model('product', productSchema);

const orderSchema= db.Schema({
    userName: String,
    listProducts: Array
})

const ordersModel = db.model('orders',orderSchema)

    

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/pages/signIn.html');
});

app.post('/', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await usersModel.findOne({ email: email, password: password });
        if (user) {
            res.json({ success: true, userName: user.name });
        } else {
            res.redirect('/')
        }
    } catch (error) {
        console.error('Error finding user:', error);
        res.status(500).json({ success: false, message: 'An error occurred while processing your request' });
    }
});



app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/pages/signUp.html');
});

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await usersModel.findOne({ email: email });
        if (!user) {
            await usersModel.insertMany(req.body);
            res.redirect('/');
        } else {
            res.redirect('/signup');
            res.json({ success: false, message: 'the email in use' });
        }
    } catch (error) {
        console.error('Error inserting data into database:', error);
        res.json({ message: 'Error occurred' });
    }
});

app.get('/products', (req, res) => {
    res.sendFile(__dirname + '/pages/products.html');
});

app.post('/products', async (req, res) => {
    const selectedItems = req.body;
    
    try {
        await productModel.insertMany(selectedItems);
    } catch (error) {
        console.error('Error inserting products into database:', error);
        res.json({ message: 'An error occurred while adding products to the database' });
    }
    res.redirect("/buy");
});

app.get('/buy', (req, res) => {
    res.sendFile(__dirname + '/pages/buy.html');
});

app.post('/buy', async (req, res) => {
    const { userName, selectedItems } = req.body;
    console.log(req.body);

    try {
        await ordersModel.insertMany({ userName, listProducts: selectedItems });
        res.json({ message: 'Products added successfully' });
    } catch (error) {
        console.error('Error inserting products into database:', error);
        res.status(500).json({ message: 'An error occurred while adding products to the database' });
    }
});

const checkAdmin = (req, res, next) => {
    if (req.query.admin === 'true') {
        next();
    } else {
        res.status(400).send('Error: Unauthorized access');
    }
};


app.get('/all', checkAdmin, async (req, res) => {
    try {
        const orders = await ordersModel.find();
        res.json(orders);
    } catch (error) {
        console.error('Error retrieving orders:', error);
        res.status(500).json({ message: 'An error occurred while retrieving orders' });
    }
});

app.listen(5000, () => {
    console.log('Server listening on port 5000');
});
