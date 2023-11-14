import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"Username is required"],
        unique: true
    },
    email:{
        type: String,
        required:[true,"Email is required"],
        unique: true
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    avatar:{
        type:String,
        default:"https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw3vx1qV07Z4EyU3svxO5T5N&ust=1700029496922000&source=images&cd=vfe&ved=0CBIQjRxqFwoTCNiB_MLtwoIDFQAAAAAdAAAAABAE"


    },
},{timeStamps:true});

const User=mongoose.model('User',userSchema)

export default User;

