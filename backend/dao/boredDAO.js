//gbj3 2/28 it302-002 phase2 gbj3@njit.edu
let bored

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

  static async addActivity(activity, type, participants, price, lastModified) {
    try {
      const activityDoc = {
        activity: activity,
        type: type,
        participants: participants,
        price: price,
        lastModified: lastModified,
      }
      return await bored.insertOne(activityDoc)
    } catch(e) {
      console.error(`unable to post activity: ${e}`)
      console.error(e)
      return { error: e }
    }
  }
}