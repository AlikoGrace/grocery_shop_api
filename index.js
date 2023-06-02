const express = require('express')
const app = express();

app.use(express.json())
const products =[]

app.get('/products',(req,res)=>{
    res.json(products)
})

app.post('/products',(req,res)=>{
    const {name,price,quantity,category}=req.body
    if(!name|| ! price || !quantity || !category ){
        return res('Some fields are missing')
    }
    const id= generateUniqueId();
    const newProduct={id,name,price,quantity};
    products.push(newProduct);

    res.json('product successfully created')
})


app.get('/products/:id',(req,res)=>{
    const {id}=req.params;

    const product= products.find(product=>product.id===id)

    if (product){
        res.json(product)
    }
    else {
        return res('product is not found')
    }
})


app.delete('/products/:id',(req,res)=>{
    const {id} = req.params;

    const index = products.findIndex(p=>p.id ==id);
    if(!index){
        res.json('product not found')
    }

    products.splice(index,1)

    res.json('Product deleted')
})


function generateUniqueId() {
    // Generate a unique identifier using your preferred method/library
    // For simplicity, let's assume we're using a timestamp-based identifier
    return Date.now().toString();
}

app.listen(3000 ,()=>console.log('started'))