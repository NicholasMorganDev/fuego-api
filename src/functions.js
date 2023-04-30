import { FieldValue } from "firebase-adimin/firestore";
import { db } from "./dbConnect.js";

const coll = db.collection('beer');

export async function getBeers (req, res) {
  const beerCollection = await coll.get()
  const beers = beerCollection.docs.map(doc => ({...doc.data(), id: doc.id}))
  res.send(beers)
}

export async function addBeer (req, res) {
  const { name, percentage, img} = req.body
  if (!name || !img) {
    res.status(400).send({message: 'Must include a name and image!'})
    return
  }
  let newBeer = {name, percentage, img, createdAt: FieldValue.serverTimestamp()}
  await coll.add(newBeer)
  getBeers(req, res)
}

export async function deleteBeer (req, res) {
  const {beerId} = req.params
  await coll.doc(beerId).delete()
  getBeers(req, res)
}

export async function editBeer (req, res) {
  const {beerId} = req.params
  await coll.doc(beerId).update(req.body)
    .catch (err => res.status(500).send(err))
  getBeers(req, res)
}
