import express from 'express'
import cors from 'cors'
import "dotenv/config"
import { router as UserRoute } from './routes/user_routes.js'
import verifyToken from './middleware/verifyToken.js'



const app = express();


app.use(cors())
app.use(express.json())
app.use("/api/user", UserRoute )
app.use("/api/user", verifyToken)



const port = process.env.PORT || 3000



app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})

app.get('/', async (req, res) => {
    res.send( "welcome to taller3" );
});

export default app