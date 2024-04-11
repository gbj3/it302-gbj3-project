//gbj3 2/28 it302-002 phase2 gbj3@njit.edus
import BoredDAO from "../dao/boredDAO.js"

export default class BoredController {
  static async apiGetTypes(req, res, next) {
    try {
      let propertyTypes = await BoredDAO.getTypes()
      res.json(propertyTypes)
    } catch(e) {
      console.log(`api, ${e}`)
      res.status(500).json({error: e})
    }
  }

  static async apiGetActivityById(req, res, next) {
    try {
      let id = req.params.id || {}
      let activity = await BoredDAO.getActivityById(id)
      if(!activity) {
        res.status(404).json({ error: "not found"})
        return
      }
      res.json(activity)
    } catch(e) {
        console.log(`api, ${e}`)
        res.status(500).json({error: e})
      }
    }
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
}

