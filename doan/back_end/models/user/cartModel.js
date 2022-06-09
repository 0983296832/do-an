const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    product_code:{
        type:String,
        required: true,
    },
    product_name:{
        type:String,
        required: true,
    },
    product_price:{
        type:Number,
        required: true,
    },
    product_image:{
        type:String,
        required: true,
    },
    product_quantity:{
        type:Number,
        required: true,
    },
    product_color:{
        type:String,
        required: true,
    }
});
const cartsDB = mongoose.model("carts", cartSchema);

module.exports = cartsDB;
