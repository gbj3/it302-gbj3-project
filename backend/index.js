//gbj3 2/28 it302-002 phase2 gbj3@njit.edu

import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"

import BoredDAO from './dao/boredDAO.js'
import FeedbackDAO from './dao/feedbackDAO.js'

async function main() {

  dotenv.config()

  const client = new mongodb.MongoClient( process.env.BORED_DB_URI)

  const port = process.env.PORT || 8000

  try {
    await client.connect()
    await BoredDAO.injectDB(client)
    await FeedbackDAO.injectDB(client)
    app.listen(port, () => {
      console.log('server is running on port:' + port);
    })

  } catch (e) {
    console.error(e);
    process.exit(1)
  }
}
main().catch(console.error);