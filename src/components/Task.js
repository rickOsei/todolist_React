import React, { useState } from "react";
import { db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

function Task({ addItems }) {
  const [task, setTask] = useState({});

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setTask((prev) => ({
      ...prev,
      id: new Date().getTime().toLocaleString(),
      completed: false,
      [name]: value,
    }));
  };

  // Active button

  const [isActive, setIsActive] = useState(false);

  const active = () => setIsActive(true);

  // handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task.Task) return;
    // addItems(task);
    await setDoc(doc(db, "list", task.id), task);
    setTask({ Task: "" });
  };

  return (
    <>
      <h2 className="title">ToDo List</h2>
      <form onSubmit={handleSubmit} className="input_section">
        <input
          name="Task"
          type="text"
          value={task.Task || ""}
          onChange={handleChange}
          onKeyUp={active}
        />
        <button
          type="submit"
          className={isActive ? "active btn_add" : "btn_add"}
        >
          Add
        </button>
      </form>
    </>
  );
}

export default Task;
