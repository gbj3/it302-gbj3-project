//gbj3 4/11 it302-002 phase4 gbj3@njit.edu
import React, {useState, useEffect} from 'react'
import ActivityDataService from '../services/activityDataService'
import { Link, useParams } from 'react-router-dom'

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Activity = (user) => {

  const [activity, setActivity] = useState({
    id: null,
    activity: "",
    type:"",
    feedback:[]
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
                            {user &&
                            <Link to={"/gbj3_activities/" + id + "/feedback"}>
                            Add Feedback
                            </Link>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>

      </div>
    );
  }
  
  export default Activity;
    