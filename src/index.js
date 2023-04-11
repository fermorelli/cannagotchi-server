import mongoose, { mongo } from 'mongoose';
import app from './app.js';

mongoose.connect("mongodb+srv://ilcosme:35293fcm@crud.pkoeg6y.mongodb.net/crud", (error) => {
  const port = 8080;
    if (error) {
      console.log('Fail to connect', error);
    } else {
      console.log('Connected to database');
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });
    }
  },
);

export default mongoose;


