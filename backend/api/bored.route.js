//gbj3 3/18 it302-002 phase3 gbj3@njit.edu
import express from 'express'

import BoredController from './bored.controller.js'
import FeedbackController from './feedback.controller.js'

const router = express.Router()

router.route('/').get(BoredController.apiGetActivities)

router.route("/types").get(BoredController.apiGetTypes)

router.route("/id/:id").get(BoredController.apiGetActivityById)

router.route("/feedback")
.post(FeedbackController.apiPostFeedback)
.put(FeedbackController.apiUpdateFeedback)
.delete(FeedbackController.apiDeleteFeedback)

export default router