import { Button, Input, Space } from "antd";
import classes from "./AddTodo.module.css";
import { useContext, useState } from "react";
import TodosContext from "../context/TodosContext";

const AddTodo = (props) => {
  const todoCtx = useContext(TodosContext);

  const [todo, setTodo] = useState("");

  function updateInput(event) {
    const updatedTodo = event.target.value;
    setTodo(updatedTodo);
  }
  function addTodoHandler() {
    todoCtx.onAddItem(todo);
    setTodo("")
  }
  return (
    <div className={classes.addtodo}>
      <Space.Compact style={{ width: "100%" }}>
        <Input
          placeholder="Add Todos . . ."
          value={todo}
          onChange={updateInput}
        />
        <Button type="primary" onClick={addTodoHandler}>
          Add Todo
        </Button>
      </Space.Compact>
    </div>
  );
};

export default AddTodo;
