import mongoose from 'mongoose';
import {Password} from "../services/password"

// an interface that describes the properties that are required to create  a new user

interface UserAttrs{
    email: string,
    password: string
}
//an interface that describes the properties that user function have

interface UserModel extends mongoose.Model<UserDoc>{
    build(attrs: UserAttrs): UserDoc
}

//an interface  that describes that properties that a user documenrt has

interface UserDoc extends mongoose.Document{
    email: string,
    password : string

}

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        required: true
    },
    password:{
        type: String,
        required : true
    }
},{
    toJSON:{
        transform(doc,ret){
            delete ret.password;
            delete ret.__v;
            ret.id = ret._id;
            delete ret._id;
        }
    }
})

userSchema.pre('save',async function (done) {
   if (this.isModified('password')){
        const hashed = await Password.toHash(this.get('password'));
        this.set('password',hashed);
   }
   done();
})

userSchema.statics.build = (attrs: UserAttrs)=>{
    return new User(attrs);
} 

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export {User};