//gbj3 2/28 it302-002 phase2 gbj3@njit.edu
let bored
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

export default class BoredDAO {
  static async injectDB(conn) {
    if (bored) {
      return
    } try {
      bored = await conn.db(process.env.BORED_NS).collection('bored_gbj3')
    } catch(e) {
      console.error(`unable to connect in BoredDAO: ${e}`)
    }
  }
  static async getTypes() { 
    let types = []
    try {
      types = await bored.distinct("type")
      return types
    } catch(e) {
      console.error(`unable to get types, ${e}`)
      return types
    }
  }

  static async getActivityById(id) {
    try {
      return await bored.aggregate([
        {
          $match: {
            _id: new ObjectId(id),
          }
        },
        { $lookup:
          {
            from: 'feedback',
            localField: '_id',
            foreignField: 'activity_id',
            as: 'feedback'
          }
        }
      ]).next()
    }
    catch(e) {
      console.error(`something went wrong in getActivityById: ${e}`)
      throw e
    }
  }

  static async getActivities({
    filters = null,
    page = 0,
    activitiesPerPage = 20,
    } = {}) {
      let query
      if(filters) {
        if("price" in filters) {
          query = { "price": { $eq: parseFloat(filters['price']) }};
        } else if("type" in filters) {
          query = { "type": { $eq: filters['type']}}
      }
    }
    let cursor
    try {
      cursor = await bored
        .find(query)
        .limit(activitiesPerPage)
        .skip(activitiesPerPage * page)
      const activitiesList = await cursor.toArray()
      const totalNumActivities = await bored.countDocuments(query)
      return {activitiesList, totalNumActivities}
    } catch(e) {
      console.error(`Unable to issue find command, ${e}`)
      console.error(e)
      return { activitiesList: [], totalNumActivities: 0 }
    }
  }
}