import mongoose from 'mongoose'

const connectMongoDB = async () => {
    const uri = process.env.MONGODB_URI!;

    if(!uri){
        console.error('Please set the  MONGODB_URI environment variable');
        process.exit(1);
    }
    try {
        await mongoose.connect(uri);
        console.log('connected to mongo db')
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

export default connectMongoDB;