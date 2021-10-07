const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is requried!'],
    },
    description: String,
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: ObjectId,
      ref: 'Category',
      required: true,
    },
    stock: Number,
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      url: String,
      name: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
