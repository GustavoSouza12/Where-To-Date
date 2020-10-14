import express from 'express'

const app = express()
app.use(express.json())
//Rota
//Recurso
//Methods HTTP
//Parameters

//Query: 

app.get('/users', (req, res)=>{
    
   return res.json({"teste": "a"})
})
app.listen(3001)