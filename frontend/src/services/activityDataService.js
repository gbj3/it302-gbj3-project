//gbj3 4/11 it302-002 phase4 gbj3@njit.edu
import axios from "axios";

class ActivityDataService {


  getAll(page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/gbj3/bored?page=${page}`
    );
  }
  get(id) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/gbj3/bored/id/${id}`
    );
  }
  find(query, by = "type", page = 0) {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/gbj3/bored?${by}=${query}&page=${page}`
    )
  }

  createFeedback(data) {
    return axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/v1/gbj3/bored/feedback`, data)
  }

  updateFeedback(data) {
    return axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/v1/gbj3/bored/feedback`, data)
  }
  deleteFeedback(id, userId) {
    return axios.delete(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/gbj3/bored/feedback`,
      { data: { feedback_id: id, user_id: userId } }
    )
  }

  getType() {
    return axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/gbj3/bored/types`)

  }
}
export default new ActivityDataService();