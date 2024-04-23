//gbj3 4/22 it302-002 phase5 gbj3@njit.edu
import React, {useState, useEffect} from 'react'
import ActivityDataService from '../services/activityDataService'
import { Link, useParams } from 'react-router-dom'

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/esm/Button';

const Activity = (props) => {
  const [activity, setActivity] = useState({
    id: null,
    activity: "",
    type:"",
    feedbacks:[]
  })
 let { id } = useParams();
 const getActivity = id => {
    ActivityDataService.get(id)
      .then(response => {
        setActivity(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      })
  }
  useEffect( () => {
    getActivity(id)
      },[id])
  
  const deleteFeedback = (feedbackId, index) => {
    ActivityDataService.deleteFeedback(feedbackId, props.user.id)
      .then(response => {
        setActivity((prevState) => {
          prevState.feedbacks.splice(index, 1)
          return ({
            ...prevState
          })
        })
      })
      .catch(e => {
        console.log(e)
      })
  }
      
  return (
      <div>
        <Container>
            <Row>
                <Col>
                    <Image src={activity.image+"/100px250"} fluid />
                </Col>
                <Col>
                    <Card>
                        <Card.Header as="h5">{activity.activity}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                                {activity.particpants}
                            </Card.Text>
                            {props.user &&
                            <Link to={"/gbj3_activities/" + id + "/feedback"}>
                            Add Feedback
                            </Link>}
                        </Card.Body>
                    </Card>
                    <br></br>
                  <h2>Feedback</h2><br></br>
                  {activity.feedbacks.map((feedback, index) => {
                    return (
                      <Card key={index}>
                        <Card.Body>
                          <h5>{feedback.name + " provided feedback on " + new Date(Date.parse(feedback.date)).toDateString()}</h5>
                          <p>{feedback.feedback}</p>
                            { props.user && props.user.id === feedback.user_id &&
                              <Row>
                                <Col><Link
                                to={"/gbj3_activities/" + id + "/feedback"}
                                state={{ currentFeedback: feedback }}
                                >Edit</Link>
                                </Col>
                                <Col><Button variant="link" onClick={() => deleteFeedback(feedback._id, index)}>Delete</Button></Col>
                              </Row> 
                            }
                        </Card.Body>
                      </Card>
                    )
                  })}


                </Col>
            </Row>
        </Container>

      </div>
    );
  }
  
  export default Activity;
    