import React from "react";
import _ from "lodash";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, Container, Grid, Stack } from "@mui/material";
import { useGlobalState } from "../App";
import { styled } from "@mui/system";

const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#262B32" : "#fff",
  padding: theme.spacing(1),
  textAlign: "center",
  borderRadius: 4,
}));

export default function ToDoPage() {
  const { todos } = useGlobalState();
  const [newToDo, setNewTodo] = React.useState("");
  const [editIndex, setEditIndex] = React.useState();
  const [editToDo, setEditToDo] = React.useState("");

  function addToDo() {
    if (!newToDo) return;
    if (newToDo.trim().length === 0) return;

    GlobalState.set({
      todos: _.concat(todos, [{ text: newToDo.trim(), isChecked: false }]),
    });
    setNewTodo("");
  }

  function checkToDo(index) {
    let updatedToDo = [...todos];
    updatedToDo[index].isChecked = !updatedToDo[index].isChecked;
    GlobalState.set({ todos: updatedToDo });
  }

  function updateToDo(index) {
    setEditIndex(index);
    setEditToDo(todos[index].text);
  }

  function saveEdit(index) {
    let updatedToDo = [...todos];
    updatedToDo[index].text = editToDo.trim(); // trim to avoid leading/trailing whitespaces
    GlobalState.set({ todos: updatedToDo }); // pass the updated  array
    setEditIndex(undefined);
    setEditToDo("");
  }

  function removeToDo(index) {
    GlobalState.set({
      todos: _.filter(todos, (todo, i) => i !== index),
    });
  }

  return (
    <>
      <Container>
        <Stack>
          <Item>
            <TextField
              label="ToDo"
              variant="outlined"
              size="small"
              value={newToDo}
              onChange={(e) => setNewTodo(String(e.target.value))}
            />
          </Item>
          <Item>
            <Button variant="contained" size="small" onClick={addToDo}>
              Add ToDo
            </Button>
          </Item>
        </Stack>
      </Container>
      <Grid container spacing={3}>
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {editIndex === index ? (
                <>
                  <TextField
                    size="small"
                    value={editToDo}
                    onChange={(e) => setEditToDo(String(e.target.value))}
                  />
                  <Button size="small" onClick={() => saveEdit(index)}>
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <Checkbox
                    checked={todo.isChecked}
                    onChange={() => checkToDo(index)}
                  />
                  {todo.text}
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => updateToDo(index)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => removeToDo(index)}
                  >
                    X
                  </Button>
                </>
              )}
            </li>
          ))}
        </ul>
      </Grid>
    </>
  );
}
