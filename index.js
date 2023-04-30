import functions from "firebase-functions";
import express from 'express';
import cors from "cors";
import { addBeer, deleteBeer, editBeer, getBeers } from "./src/functions";

const app = express() 

app.use(cors())
app.use(express.json())

app.get('/beers', getBeers)

app.post('/beers', addBeer)

app.delete("/beers/:beerId", deleteBeer)

app.patch("/beers/:beerId", editBeer)

// app.listen(3000, () => {
//   console.log('Listening on http://localhost:3000...')
// })

export const api = functions.https.onRequest(app)
