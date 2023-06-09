const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')

const PORT =  5000;

const app = express();

app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://qwerty:12345@auth.v28bpud.mongodb.net/auth_roles?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start()