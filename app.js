const connectDB=require('./db/connect')
require('dotenv').config()
const express=require('express')
const app=express()
const tasks=require('./routes/Tasks')
app.use(express.static('./public'))
const notFound=require('./middleware/not-found')
const errorHandlerMiddleware=require('./middleware/error')

app.use(express.json())

app.use('/api/v1/tasks',tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)
app.get('/',(req,res)=>{
    res.send('Task manager app')
})



const port=process.env.PORT ||3000
const start=async()=>{
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port,console.log('server is listening'))
    }catch(error){
        console.log(error)
    }
}
start()
 
