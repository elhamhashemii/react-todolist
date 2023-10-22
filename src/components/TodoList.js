import { Button, List } from "antd";
import { Checkbox, Typography, Empty } from "antd";
const { Text } = Typography;

function TodoList(props) {
  function onDoneHandler(todo) {
    const todoItem = todo;
    props.onDone(todoItem);
  }

  function onDeleteHandler(todoIndex) {
    props.onDelete(todoIndex);
  }

  // const finishedTodos = props.todos.map((todo) => !todo.isDone);

  return (
    <>
      <List
        bordered
        header={<h4>Todo</h4>}
        itemLayout="horizontal"
        dataSource={props.todos}
        renderItem={(todo, index) => (
          <List.Item
            actions={[
              <Button key={todo.id} onClick={() => onDeleteHandler(index)}>
                Delete
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={
                <Checkbox
                  checked={todo.isDone}
                  onChange={() => onDoneHandler(todo)}
                >
                  <Text delete={todo.isDone} disabled={todo.isDone}>
                    {todo.title}
                  </Text>
                </Checkbox>
              }
            ></List.Item.Meta>
          </List.Item>
        )}
      ></List>
    </>
  );
}

export default TodoList;
