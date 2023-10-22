import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import classes from "./App.module.css";
import { useContext } from "react";
import TodosContext from "./context/TodosContext";

function App() {
  const todosCtx = useContext(TodosContext);

  function doneHandler(todo) {
    todosCtx.onDone(todo);
  }

  function deleteHandler(index) {
    todosCtx.onRemoveItem(index)
  }
  return (
    <div className={classes.container}>
      <h1>My TodoList</h1>
      <div className={classes.todos}>
        <AddTodo />
        <TodoList todos={todosCtx.items} onDone={doneHandler} onDelete={deleteHandler} />
      </div>
    </div>
  );
}

export default App;
