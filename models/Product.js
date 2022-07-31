const mongoose = require('mongoose');

//------------------------Product Schema-----------------------------//

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: 2
    },
    description: {
      type: String,
      required: false,
      minlength: 2
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Category'
    },
    variations: [
      {
        variationId: {
          type: String
        },
        color: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ProductColor',
          lowercase: true
        },
        design: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ProductDesign',
          lowercase: true
        },
        size: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'ProductSize',
          uppercase: true
        },
        images: [
          {
            image: {
              type: String
            }
          }
        ],
        price: {
          type: Number
        },
        quantity: {
          type: Number
        },
        dimensions: {
          Length: {
            type: String
          },
          Width: {
            type: String
          },
          Height: {
            type: String
          }
        }
      }
    ],
    date: {
      type: Date,
      default: Date.now
    },
    isActive: {
      type: Boolean,
      default: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// Creating the Collection from above schema
module.exports = new mongoose.model('Product', productSchema);
