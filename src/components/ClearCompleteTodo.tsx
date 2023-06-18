import { useMutation, useQueryClient } from "@tanstack/react-query";
import useTodos from "../hooks/useTodos";

const ClearCompleteTodo = () => {
  const { clearCompletedTodos } = useTodos();
  const queryClient = useQueryClient();
  const clearCompletedTodosMutation = useMutation({
    mutationFn: () => {
      return clearCompletedTodos();
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return (
    <button
      className="hover:underline transition-all duration-300 ease-in hover:text-VeryDarkGrayishBlue hover:dark:text-LightGrayishBlueDark1"
      onClick={() => clearCompletedTodosMutation.mutate()}
    >
      Clear Completed
    </button>
  );
};
export default ClearCompleteTodo;
