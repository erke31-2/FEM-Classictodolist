import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Todo } from "../types/type";
import useTodos from "../hooks/useTodos";

type Props = {
  todo: Todo;
};

const TodoItem = ({ todo }: Props) => {
  const { deleteTodo, completeTodo } = useTodos();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      return deleteTodo(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const checkMutation = useMutation({
    mutationFn: (todo: Todo) => {
      return completeTodo(todo);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDelete = (id: string) => {
    const storedData = localStorage.getItem("taskOrder");
    const arrayIdsOrder: string[] | null = storedData
      ? JSON.parse(storedData)
      : null;
    if (arrayIdsOrder?.length) {
      const newIdsOrderArray = arrayIdsOrder.filter((t) => t !== id);
      localStorage.setItem("taskOrder", JSON.stringify(newIdsOrderArray));
    }
    deleteMutation.mutate(id);
  };

  return (
    <>
      <button
        onClick={() => checkMutation.mutate(todo)}
        className={`${
          todo.is_completed && "border-none"
        } w-7 h-6 rounded-full hover:bg-gradient-to-r from-GradientOne to-GradientTwo border-LightGrayishBlue dark:border-LightGrayishBlueDark1 border hover:border-none flex justify-center`}
      >
        <div
          className={`${
            todo.is_completed &&
            "bg-gradient-to-r from-GradientOne to-GradientTwo"
          } dark:bg-VeryDarkDesaturatedBlueDark bg-VeryLightGray w-[90%] h-[90%] rounded-full mt-[1px] flex justify-center items-center`}
        >
          {todo.is_completed && (
            <img src="/images/icon-check.svg" alt="check-icon" />
          )}
        </div>
      </button>
      <p
        className={`${
          todo.is_completed &&
          "line-through text-LightGrayishBlue dark:text-VeryDarkGrayishBlueDark1"
        } w-full py-1 px-3 font-[400]`}
      >
        {todo.title}
      </p>
      <button
        className="w-4 h-4 cursor-pointer"
        onClick={() => handleDelete(todo.id)}
      >
        <img
          src="/images/icon-cross.svg"
          alt="cross-delete-icon"
          className="w-full h-full object-contain"
        />
      </button>
    </>
  );
};
export default TodoItem;
