import React from "react";
import styles from "./List.module.scss";
import { firestore } from "../../firebase";
import { useState, useEffect } from "react";

const List = () => {
  const [todoItems, setTodoItems] = useState([]);

  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    firestore
      .collection("users")
      .doc("todos")
      .get()
      .then(doc => {
        const retrievedItems = doc.data().todos;
        setTodoItems(retrievedItems);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addToDb = () => {
    const newItems = [...todoItems, newItem];

    const newDoc = {
      items: newItems
    };

    firestore
      .collection("user")
      .doc("todos")
      .set(newDoc)
      .then(() => {
        fetchTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteFromDb = item => {
    const newArray = [...todoItems];
    const position = newArray.indexOf(item);
    newArray.splice(position, 1);

    const newDoc = {
      items: newArray
    };

    firestore
      .collection("user")
      .doc("todos")
      .set(newDoc)
      .then(() => {
        fetchTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getItemJsx = () => {
    return todoItems.map(item => (
      <>
        <p>{item.task}</p>
        <p>{item.created}</p>
        <p>{item.complete}</p>
        <p>{item.img}</p>
        <button onClick={() => deleteFromDb(item)}>Delete</button>
      </>
    ));
  };

  const addNewDoc = () => {
    firestore
      .collection("user")
      .doc("todos")
      .set()
      .then(() => {
        fetchTodos();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const deleteDoc = () => {
    firestore
      .collection("user")
      .doc("todos")
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
      <section className={styles.list}>
        <button onClick={addNewDoc}>Add new Doc</button>
        <button onClick={deleteDoc}>Delete new Doc</button>
        <input
          type="text"
          placeholder="Todo item..."
          onInput={event =>
            setNewItem({ ...newItem, task: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Date..."
          onInput={event =>
            setNewItem({ ...newItem, created: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="URL..."
          onInput={event =>
            setNewItem({ ...newItem, complete: event.target.value })
          }
        />
        <button onClick={addToDb}>Submit</button>
        {getItemJsx()}
      </section>
    </>
  );
};

export default List;
