const mongoose = require("mongoose");

const {Schema, model} = mongoose;

const productSchema = new Schema({
    title:{
        type: String,
        trim: true,
        unique: true,
    },
    price:{
        type: Number,
        min: 0
    },
    quantity:{
        type: Number,
        default: 1,
    },
    description:{
        type: String,
        trim: true,
    },
    images: [String],
},{
    timestamps: true,
    versionKey: false
});

// --------- default Preferences

productSchema.pre("findOneAndUpdate", function (){
    this.options.runValidators = true,
    this.options.new = true
})

productSchema.pre("updateMany", function (){
    this.options.runValidators = true,
    this.options.new = true
})

productSchema.pre("updateOne", function (){
    this.options.runValidators = true,
    this.options.new = true
})

const productModel = model("product", productSchema);

module.exports = {
    productModel
}
