import React, { useEffect, useReducer } from "react";

const DUMMY_TODOS = [
  { id: 1, title: "Todo 1", isDone: false },
  { id: 2, title: "Todo 2", isDone: false },
  { id: 3, title: "Todo 3", isDone: false },
  { id: 4, title: "Todo 4", isDone: false },
  { id: 5, title: "Todo 5", isDone: false },
];

const todos = localStorage.getItem("todos");

const TodosContext = React.createContext({
  items: [],
  onAddItem: (item) => {},
  onRemoveItem: (index) => {},
  onDone: (item) => {},
});

export default TodosContext;

function stateReducer(state, action) {
  let updatedTodos;
  if (action.type === "INIT") {
    updatedTodos = [...action.item];
    return updatedTodos;
  } else if (action.type === "ADD_TODO") {
    updatedTodos = [...state];
    let newItem = {
      id: (Math.random() * 10).toFixed(2),
      title: action.item,
      isDone: false,
    };
    updatedTodos.push(newItem);
    console.log("TODOS AFTER ADDING A NEW ITEM", updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return updatedTodos;
  } else if (action.type === "MARK_AS_DONE") {
    updatedTodos = [...state];
    let updatedTodoIndex = updatedTodos.findIndex(
      (todo) => todo.id === action.item.id
    );
    updatedTodos[updatedTodoIndex] = {
      id: action.item.id,
      title: action.item.title,
      isDone: !action.item.isDone,
    };
    console.log("TODOS AFTER MARKING ONE ITEM AS DONE", updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return updatedTodos;
  } else if (action.type === "REMOVE_TODO") {
    updatedTodos = [...state];
    updatedTodos.splice(action.index, 1);
    console.log("TODOS AFTER REMOVING AN EXISTING ITEM", updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    return updatedTodos;
  } else return state;
}

export const TodosContextProvider = (props) => {
  const [todosState, dispatchTodos] = useReducer(
    stateReducer,
    todos || DUMMY_TODOS
  );

  useEffect(() => {
    if (!todos) {
      localStorage.setItem("todos", JSON.stringify(todosState));
    } else {
      const storedData = localStorage.getItem("todos");
      dispatchTodos({ type: "INIT", item: JSON.parse(storedData) });
    }
  }, []);

  function AddTodoHandler(item) {
    dispatchTodos({ type: "ADD_TODO", item: item });
  }

  function RemoveTodoHandler(index) {
    dispatchTodos({ type: "REMOVE_TODO", index: index });
  }

  function markTodoAsDoneHandler(item) {
    dispatchTodos({ type: "MARK_AS_DONE", item: item });
  }

  return (
    <TodosContext.Provider
      value={{
        items: todosState,
        onAddItem: AddTodoHandler,
        onRemoveItem: RemoveTodoHandler,
        onDone: markTodoAsDoneHandler,
      }}
    >
      {props.children}
    </TodosContext.Provider>
  );
};
