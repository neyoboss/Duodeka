import React from "react";
import _ from "lodash";
import TextField from "@mui/material/TextField";
import {
  Button,
  Checkbox,
  Container,
  Box,
  Grid,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material";
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
    console.log(todos);
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

  function cancelSave() {
    setEditIndex(undefined);
  }

  function removeToDo(index) {
    GlobalState.set({
      todos: _.filter(todos, (todo, i) => i !== index),
    });
  }

  return (
    <Box style={{ marginLeft: "auto", marginRight: "auto" }}>
      <Grid container>
        <Grid item xs>
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
        </Grid>

        <Grid item xs>
          <TableContainer
            component={Paper}
            style={{ inlineSize: "max-content" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Number</TableCell>
                  <TableCell align="left">ToDo</TableCell>
                  <TableCell align="left">Done</TableCell>
                  <TableCell align="left">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((todo, index) => (
                  <TableRow key={index}>
                    <TableCell>{index}</TableCell>
                    {editIndex === index ? (
                      <>
                        <TableCell>
                          <TextField
                            size="small"
                            value={editToDo}
                            onChange={(e) =>
                              setEditToDo(String(e.target.value))
                            }
                          />
                        </TableCell>
                        <TableCell>
                          <Checkbox
                            checked={todo.isChecked}
                            onChange={() => checkToDo(index)}
                          />
                        </TableCell>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => saveEdit(index)}
                        >
                          Save
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          onClick={() => cancelSave()}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <TableCell>{todo.text}</TableCell>
                        <TableCell>
                          <Checkbox
                            checked={todo.isChecked}
                            onChange={() => checkToDo(index)}
                          />
                        </TableCell>
                        <TableCell>
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
                        </TableCell>
                      </>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Box>
  );
}
