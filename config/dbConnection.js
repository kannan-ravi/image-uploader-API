import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.DATABASE_URI, {
      dbName: "uploadImage",
      useUnifiedTopology: true,
      useNewUrlParser: true
    })
  } catch (err) {
    console.log(err);
  }
}

export default connectDB