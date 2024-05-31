import mongoose from 'mongoose';

const dbURI = 'mongodb+srv://Durgesh:Durgesh02042001@cluster0.skc6gmq.mongodb.net/database?retryWrites=true&w=majority';

export default function dbConnection() {
    mongoose.connect(dbURI, { bufferCommands: false })
        .then(() => {
            console.log("Connected to database");
        })
        .catch((error) => {
            console.error("Error connecting to the database:", error);
        });
}
