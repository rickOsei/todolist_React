import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import {
  BsFillTrashFill,
  BsFillBookmarkCheckFill,
  BsFillPenFill,
} from "react-icons/bs";

function List({ allTask, deleteTask }) {
  return (
    <ul className="task_section">
      {allTask.map(({ Task, id, completed }) => {
        return (
          <RenderedList
            key={id}
            deleteTask={deleteTask}
            Task={Task}
            id={id}
            completed={completed}
          />
        );
      })}
    </ul>
  );
}

const RenderedList = ({ deleteTask, Task, id, completed }) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [modal, setModal] = useState(false);
  const [edited, setEdited] = useState(Task);

  const completedFunc = async () => {
    setIsCompleted((prev) => !prev);
    const TaskRef = doc(db, "list", id);

    await updateDoc(TaskRef, {
      completed: completed === true ? false : true,
    });
  };

  const deletedFunc = async () => {
    setIsDeleted(true);
    console.log(Task);

    await deleteDoc(doc(db, "list", id));
  };

  const editedFunc = async () => {
    const TaskRef = doc(db, "list", id);
    await updateDoc(TaskRef, {
      Task: edited,
    });
  };

  return (
    <>
      <li className={isDeleted ? "move task" : "task"}>
        <p className={completed ? "completed task_name" : "task_name"}>
          {Task}
        </p>

        <div className="task_btn">
          <BsFillBookmarkCheckFill onClick={completedFunc} />
          <BsFillTrashFill onClick={deletedFunc} />
          <BsFillPenFill
            onClick={() => {
              setModal(modal === false ? true : false);
              editedFunc();
            }}
          />
        </div>
      </li>

      {modal && (
        <div className="modal_container">
          <input
            type="text"
            value={edited}
            onChange={(e) => setEdited(e.target.value)}
          />
        </div>
      )}
    </>
  );
};

export default List;
