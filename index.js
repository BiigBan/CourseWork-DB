const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth.routes');
const cors = require('cors');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use('/api/auth', authRouter);

async function start() {
    try {
        await mongoose.connect('mongodb+srv://admin:admin@cluster0.wknj85s.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
        })
        app.listen(PORT, () => {
            console.log('server started')
        })
    } catch (error) {
        console.log(error);
    }
}


start()