const { response } = require('express');
const express=require('express');
const cors=require("cors");
const User = require('./db/User');
const Product=require('./db/Product');
require('./db/config')

require('dotenv').config();

const fileupload=require('express-fileupload')


const jwt=require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const jwtKey='e-commdash'



const app=express();


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));

app.use(fileupload({
    useTempFiles:true
}))


const cloudinary=require('cloudinary').v2;
cloudinary.config({
    cloud_name:'hosteltrend',
    api_key:'613547613696117',
    api_secret:'Sc4fm_wIM0aJaKM_ukTt5wJ2nUU',
});

// app.post('/prod',(req,res,next)=> {
//     // console.log('body',req.body);
//     const file=req.files.photo;
//     cloudinary.uploader.upload(file.tempFilePath,(err,result)=> {
//         // console.log(result)

//         prod=new Product({
//             _id: new mongoose.Types.ObjectId,
//             name:req.body.name,
//             price:req.body.price,
//             category:req.body.category,
//             userId:req.body.userId,
//             company:req.body.company,
//             photo:result.url,
//         })

//         prod.save()
//         .then(result=> {
//             console.log('rrr',result);
//             res.status(200).json({
//                 new_product:result
//             })
//         })
//         .catch(err=> {
//             console.log(err);
//             res.status(500).json({
//                 Error:err
//             })
//         })



//     })
// })








app.post('/register',async (req,res)=> {
let user=new User(req.body);
let result=await user.save();
result=result.toObject();
delete result.password;
jwt.sign({result},jwtKey,{expiresIn:"1h"},(err,token)=> {
    if(err) {
        res.send({result:"something went"})
    }
    res.send({result,auth:token})
})
})

app.post('/login', async (req,res)=> {
    if(req.body.password && req.body.email) {
        let user=await User.findOne(req.body).select("-password");
        if(user)  {

            jwt.sign({user},jwtKey,{expiresIn:"1h"},(err,token)=> {
                if(err) {
                    res.send({result:"something went"})
                }
                res.send({user,auth:token})
            })
           
        }else {
            res.send({result:"no user found"})
        }

    }else {
        res.send({result:"no user found"})
    }
})


app.post('/add-product', (req,res,next)=> {

    // console.log('body',req.body);
    // const file=req.files.photo;
    // cloudinary.uploader.upload(file.tempFilePath,(err,result)=> {
        // console.log(result)

        prod=new Product({
            _id: new mongoose.Types.ObjectId,
            name:req.body.name,
            price:req.body.price,
            category:req.body.category,
            company:req.body.company,
            photo:req.body.photo,
        })

        prod.save()
        .then(result=> {
            console.log('rrr',result);
            res.status(200).json({
                new_product:result
            })
        })
        .catch(err=> {
            console.log(err);
            res.status(500).json({
                Error:err
            })
        })



    })



    // let product=new Product(req.body);
    // let result= await product.save();
    // res.send(result)


app.get('/products',verifyToken, async(req,res)=> {

let products=await Product.find();
if(products.length>0) {
    res.send(products)
}else {
    res.send({result:"no result found"})
}

})


app.delete('/product/:id',verifyToken, async(req,res)=> {
    const result=await Product.deleteOne({_id:req.params.id})
    res.send(result);
})


app.get("/product/:id",verifyToken, async(req,res)=> {
    let result=await Product.findOne({_id:req.params.id});
    if(result) {
        res.send(result) 
    }else {
        res.send({result: "no result found"})
    }
})


app.put('/product/:id',verifyToken, async(req,res)=> {
    let result=await Product.updateOne({_id:req.params.id}, {
        $set:req.body
    })
    if(result) {
    res.send(result);
    }else {
        res.send('result not found')
    }
})


app.get('/search/:key',verifyToken,async(req,res)=> {
    let result=await Product.find({
        "$or": [
            {name:{$regex:req.params.key}},
        ]
    });
    res.send(result);
})



function verifyToken(req,res,next) {
let token=req.headers['authorization'];
if(token) {
    token=token.split(' ')[0];
    jwt.verify(token,jwtKey,(err,valid)=> {
        if(err) {
            res.status(401).send({result: "please provide valid token"})
        }else {
            next();
        }
    })
}else {
    res.status(403).send({result: "please add token with header"});
}

}
















app.listen(5000)