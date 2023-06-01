import Button from "../components/Button";

type Props = {
  inputValue: string;
  isEditing: boolean;
  onChangeInput: (stringInput: string) => void;
  onAddTodo: () => void;
  onSaveEditTodo: () => void;
};

const TodoForm = ({
  inputValue,
  isEditing,
  onChangeInput,
  onAddTodo,
  onSaveEditTodo,
}: Props) => {
  return (
    <div className="flex flex-col justify-center w-full">
      <input
        type="text"
        className="border border-gray-400 rounded px-2 py-3"
        placeholder="Input a new todo..."
        value={inputValue}
        onChange={(e) => onChangeInput(e.target.value)}
      />
      {isEditing ? (
        <Button
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 "
          onClick={onSaveEditTodo}
          primary={false}
        >
          Save Edit
        </Button>
      ) : (
        <Button
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 "
          onClick={onAddTodo}
          primary={false}
        > 
          Add Todo
        </Button>
      )}
    </div>
  );
};

export default TodoForm;
