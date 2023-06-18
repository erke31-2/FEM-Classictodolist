import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FormEvent, useState } from "react";
import useTodos from "../hooks/useTodos";
const FormTodo = () => {
  const [title, setTitle] = useState("");
  const { addTodo } = useTodos();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (title: string) => {
      return addTodo(title);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title) {
      return;
    } else {
      mutation.mutate(title);
      setTitle("");
    }
  };
  return (
    <form
      className="w-[370px] md:w-[600px] flex flex-row-reverse bg-VeryLightGray dark:bg-VeryDarkDesaturatedBlueDark items-center py-2 rounded-md px-4 gap-1 font-Josefin"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Create a new todo..."
        className="w-full focus:outline-none py-2 px-3 bg-VeryLightGray text-VeryDarkGrayishBlue dark:bg-VeryDarkDesaturatedBlueDark dark:text-LightGrayishBlueDark1"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        type="submit"
        className="w-7 h-6 rounded-full hover:bg-gradient-to-r from-GradientOne to-GradientTwo border-LightGrayishBlue dark:border-LightGrayishBlueDark1 border hover:border-none flex justify-center"
      >
        <div className="w-[93%] h-[93%] bg-VeryLightGray dark:bg-VeryDarkDesaturatedBlueDark rounded-full mt-[1px]" />
      </button>
    </form>
  );
};
export default FormTodo;
