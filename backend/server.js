//gbj3 2/28 it302-002 phase2 gbj3@njit.edu
import express from 'express'
import cors from 'cors'
import bored from './api/bored.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/gbj3/bored", bored)

app.use('*', (req,res) => {
  res.status(404).json({error: "not found"})
})

export default app