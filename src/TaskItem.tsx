import React, { useState } from "react";
// import firebase from "firebase";
import { Grid, ListItem, TextField } from "@material-ui/core";
import { DeleteOutline, EditOutlined } from "@material-ui/icons";
import { db } from "./firebase";
import styles from "./TaskItem.module.css";

interface PROPS {
  id: string;
  title: string;
}

const TaskItem: React.FC<PROPS> = (props) => {
  const [title, setTitle] = useState(props.title);
  const editTask = () => {
    db.collection("tasks").doc(props.id).set({ title: title }, { merge: true });
  };
  const deleteTask = () => {
    db.collection("tasks").doc(props.id).delete();
  };
  return (
    <ListItem>
      <h2>{props.title}</h2>
      <Grid container justifyContent="flex-end">
        <TextField
          InputLabelProps={{ shrink: true }}
          label="Edit task"
          value={title}
          onChange={(
            e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) => setTitle(e.target.value)}
        ></TextField>
      </Grid>
      <button className={styles.taskitem__icon} onClick={editTask}>
        <EditOutlined />
      </button>
      <button className={styles.taskitem__icon} onClick={deleteTask}>
        <DeleteOutline />
      </button>
    </ListItem>
  );
};

export default TaskItem;
