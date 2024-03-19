//gbj3 2/28 it302-002 phase2 gbj3@njit.edu
import BoredDAO from "../dao/boredDAO.js"

export default class BoredController {
  static async apiGetActivities(req,res,next) {
    const activitiesPerPage = req.query.activitiesPerPage ? parseInt(req.query.activitiesPerPage) : 20
    const page = req.query.page ? parseInt(req.query.page) : 0
    let filters = {}
    if(req.query.type){
      filters.type = req.query.type
    } else if(req.query.price){
      filters.price = req.query.price
    }
    const { activitiesList, totalNumActivities } = await BoredDAO.getActivities({
    filters, page, activitiesPerPage})

    let response = {
      activities: activitiesList,
      page: page,
      filters: filters,
      entries_per_page: activitiesPerPage,
      total_results: totalNumActivities,
    }
    res.json(response)
   }
 
   static async apiPostActivity(req,res,next) {
    try {
      const activity = req.body.activity
      const type = req.body.type
      const participants = req.body.participants
      const price = req.body.price
      const lastModified = new Date()

      const ActivityResponse = await BoredDAO.addActivity(
        activity,
        type,
        participants,
        price,
        lastModified
      )
    res.json(ActivityResponse)
    } catch(e) {
    res.status(500).json({ error: e.message })
    }
  }
}

