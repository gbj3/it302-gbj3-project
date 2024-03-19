//gbj3 3/18 it302-002 phase3 gbj3@njit.edu

import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let feedbacks
export default class FeedbackDAO {
  static async injectDB(conn) {
    if(feedbacks) {
      return
    } try {
      feedbacks = await conn.db(process.env.BORED_NS).collection('feedbacks')
    } catch(e) {
      console.error(`unable to establish connection handle in feedbackDAO: ${e}`)
    }
  }

  static async addFeedback(activityId, user, feedback, date) {
    try {
      const feedbackDoc = {
        name: user.name,
        user_id: user._id,
        date: date,
        feedback: feedback,
        activity_id: new ObjectId(activityId)
      }
      return await feedbacks.insertOne(feedbackDoc)
    } catch(e) {
      console.error(`unable to post feedback: ${e}`)
      console.error(e)
      return { error: e }
    }
  }

  static async updateFeedback(feedbackId, userId, feedback, date) {
    try {
      const updateResponse = await feedbacks.updateOne(
        { user_id: userId, _id: new ObjectId(feedbackId) },
        { $set: { feedback: feedback, date: date } }
      )
      return updateResponse
    } catch(e) {
      console.error(`unable to update feedback: ${e}`)
      console.error(e)
      return { error: e}
    }
  }

  static async deleteFeedback(feedbackId, userId) {
    try {
      const deleteResponse = await feedbacks.deleteOne({
        _id: new ObjectId(feedbackId),
        user_id: userId,
      })
      return deleteResponse
    } catch(e) {
      console.error(`unable to delete feedback: ${e}`)
      console.error(e)
      return { error: e.message }
    }
  }
}