// external imports
import mongoose from 'mongoose';

const connectionToDb = async () => {
  await mongoose
    .connect(`${process.env.DB_CONNECTION_URL}/${process.env.DB_NAME}`)
    .then(() => {
      console.log('Database connected successfully!');
    })
    .catch((err) => {
      console.log(err);
      console.log('Database connection failed!');
    });
};

export default connectionToDb;
