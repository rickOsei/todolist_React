// import TodoList from "./Todolist";
import Task from "./components/Task";
import List from "./components/List";
import { useState, useEffect } from "react";
import { db } from "./firebase/config";
import { collection, query, onSnapshot } from "firebase/firestore";

function App() {
  const [allTask, setAllTask] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "list"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const newList = [];
      querySnapshot.forEach((doc) => {
        newList.push(doc.data());
      });
      // console.log("Current cities in CA: ", cities.join(", "));

      setAllTask(newList);
    });
  }, []);

  const addItems = (items) => {
    setAllTask((prev) => [...prev, items]);
  };

  // setup delete functions

  const deleteTask = (id) => {
    setAllTask((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <>
      <div className="main">
        <div className="container">
          <Task addItems={addItems} />
          <List allTask={allTask} deleteTask={deleteTask} />
        </div>
      </div>
    </>
  );
}

export default App;
