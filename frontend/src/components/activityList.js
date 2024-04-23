//gbj3 4/11 it302-002 phase4 gbj3@njit.edu

import React, { useState, useEffect } from 'react'
import ActivityDataService from "../services/activityDataService"
import { Link } from "react-router-dom"

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'

const ActivityList = () => {
  const [activities, setActivity] = useState([]);
  const [searchActivity, setSearchActivity] = useState("");
  const [searchType, setSearchType] = useState("");
  const [types, setType] = useState(["All Types"]);
  useEffect(() => {
    retrieveActivity();
    retrieveType();
  }, []);


  const retrieveActivity = () => {
    ActivityDataService.getAll()
      .then((response) => {
        console.log(response.data);
        setActivity(response.data.activities);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const retrieveType = () => {
    ActivityDataService.getType()
      .then((response) => {
        console.log(response.data);
        //start with 'All Types' if user doesn't specify any type
        setType(["All Types"].concat(response.data));
      })
      .catch(e => {
        console.log(e);
      });
  };
  const onChangeSearchActivity = (e) => {
    const searchActivity = e.target.value
    setSearchActivity(searchActivity);
  };

  const onChangeSearchType = (e) => {
    const searchType = e.target.value;
    setSearchType(searchType);
  };
  
  const find = (query, by) => {
    ActivityDataService.find(query, by)
      .then(response => {
        console.log(response.data)
        setActivity(response.data.activities)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const findByActivity =
  () => {
    setSearchType("")
    find(searchActivity, "activity")
  }

const findByType =
  () => {
    setSearchActivity("")
    if (searchType === "All Types") {
      retrieveActivity()
    } else {
      find(searchType, "type")
    }
  }

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
            <Col>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search by activity"
                  value={searchActivity}
                  onChange={onChangeSearchActivity}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByActivity}
              >
                Search
              </Button>
            </Col>
            <Col>
              <Form.Group>
                <Form.Control
                  as="select" onChange={onChangeSearchType} >
                  {types.map(type => {
                    return (
                      <option value={type} selected={type === searchType} >{type}</option>
                    )
                  })}
                </Form.Control>
              </Form.Group>
              <Button
                variant="primary"
                type="button"
                onClick={findByType}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <Row>
          {activities.map((activity) => {
            return (
              <Col>
                <Card style={{ width: '18rem' }}>
                  <Card.Img src={activity.image + "/100px180"} />
                  <Card.Body>
                    <Card.Title>{activity.activity}</Card.Title>
                    <Card.Text>
                      Type: {activity.type}
                    </Card.Text>
                    <Card.Text>{"Number of participants " + activity.participants}</Card.Text>
                    <Link to={"/gbj3_activities/" + activity._id} >View Feedback</Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
      </Container>
    </div>
  );
}

export default ActivityList;
