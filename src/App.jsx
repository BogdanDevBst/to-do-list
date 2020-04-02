import React from "react";
import styles from "./App.module.scss";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { firestore } from "./firebase.js";
import NavBar from "./containers/NavBar";
// import Button from "./components/Button";
import TodoForm from "./containers/TodoForm";

const App = () => {
  const [todoList, setList] = useState([]);
  const [todoInfo, updateToDoInfo] = useState("");
  const [todoStartDate, updateToDoStartDate] = useState("");
  const [todoEndDate, updateToDoEndDate] = useState("");
  const [todoImgUrl, updateToDoImgUrl] = useState("");
  const [updateTask, setUpdateTask] = useState("");

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

  const updateTodo = id => {
    firestore
      .collection("tasks")
      .doc(id)
      .set({ name: updateTask })
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
      <TodoForm />
    </>
  );
};

export default App;
