import React from "react";
import styles from "./App.module.scss";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { firestore } from "./firebase.js";
import { Button, Row, Container, Col, Form } from "react-bootstrap";
import NavBar from "./containers/NavBar";

const App = () => {
  const [todoList, setList] = useState([]);

  const [todoInfo, updateToDoInfo] = useState("");
  const [todoStartDate, updateToDoStartDate] = useState("");
  const [todoEndDate, updateToDoEndDate] = useState("");
  const [todoImgUrl, updateToDoImgUrl] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    firestore
      .collection("tasks")
      .get()
      .then(data => {
        setList(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const createTodo = () => {
    firestore
      .collection("tasks")
      .add({
        name: todoInfo,
        start: todoStartDate,
        end: todoEndDate,
        img: todoImgUrl
      })
      .then(() => {
        fetchTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteTodo = id => {
    firestore
      .collection("tasks")
      .doc(id)
      .delete()
      .then(() => {
        fetchTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <NavBar />
      <Container>
        <Row>
          <Col>
            <h2 className={styles.heading}>Todo List</h2>
            <Form>
              <Form.Group controlId="formBasicCheckbox">
                <Form.Control
                  placeholder="What to do?"
                  type="search"
                  value={todoInfo}
                  onChange={event => updateToDoInfo(event.target.value)}
                />
                <Form.Control
                  placeholder="When to start?"
                  type="date"
                  value={todoStartDate}
                  onChange={event => updateToDoStartDate(event.target.value)}
                />
                <Form.Control
                  placeholder="When to finish?"
                  type="date"
                  value={todoEndDate}
                  onChange={event => updateToDoEndDate(event.target.value)}
                />
                <Form.Control
                  placeholder="Please insert an image URL!"
                  type="search"
                  value={todoImgUrl}
                  onInput={event => updateToDoImgUrl(event.target.value)}
                />
              </Form.Group>
              <div class="col text-center">
                <Button variant="primary" onClick={createTodo}>
                  Create task
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
      <section className={styles.test}>
        {todoList.map(task => (
          <div className={styles.inside} key={task.id}>
            <p>Task: {task.name}</p>
            <p>Start task: {task.start}</p>
            <p>Finish task: {task.end}</p>
            <img src={task.img} alt="" />
            <div>
              <Button
                className="text-white m-4"
                variant="danger"
                onClick={() => deleteTodo(task.id)}
              >
                Delete task!
              </Button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default App;
