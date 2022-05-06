require('dotenv').config({ path: `${__dirname}/config/config.env` });
const mongoose = require('mongoose');
const app = require('./app');

mongoose
    .connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('estamos conectado 🤪');
    });

const port = process.env.PORT || 3333;
app.listen(port, () => {
    console.log('Estamos on line 😋');
});
