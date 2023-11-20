import mongoose from "mongoose";

const listingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name for the Listing"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please provide a description of the Listing"],
  },
  regularPrice: {
    type: Number,
    required: [true, "Price is required"],
  },
  discountedPrice: {
    type: Number,
    required: true,
  },
  bathrooms: {
    type: Number,
    default: 1,
    required: true,
  },
  bedrooms: {
    type: Number,
    default: 1,
    required: true,
  },
  furnished: {
    type: Boolean,
    default: false,
    required: true,
  },

  imageUrls: {
    type: Array,
    required: true,
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
  parking:{
    type :Boolean ,
    default :false,
    required:true
  },
  type:{
    type:String,
    required:[true,'Type is required']
  },
  offer:{
    type:String,
    required:[true,"Offer is required"]

  },
  userRef:{
    type:String,
    required:true
  }
},{timestamps:true}
);

const Listing =mongoose.model('Listing',listingSchema);

export default Listing;

