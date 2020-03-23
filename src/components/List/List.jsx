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
        const retrievedItems = doc.data().items;
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
      .collection("users")
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
      .collection("users")
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
        <img src={item.img} alt={item.img} />
        <button onClick={() => deleteFromDb(item)}>Delete</button>
      </>
    ));
  };

  return (
    <>
      <section className={styles.list}>
        <input
          type="text"
          placeholder="Todo item..."
          onInput={event =>
            setNewItem({ ...newItem, task: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Date created..."
          onInput={event =>
            setNewItem({ ...newItem, created: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Date finished..."
          onInput={event =>
            setNewItem({ ...newItem, complete: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Add img url..."
          onInput={event => setNewItem({ ...newItem, img: event.target.value })}
        />
        <button onClick={addToDb}>Submit</button>
        {getItemJsx()}
      </section>
    </>
  );
};

export default List;
