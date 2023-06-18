import Header from "../components/Header";
import TodoList from "../components/TodoList";
import { useState } from "react";
import useTodos from "../hooks/useTodos";
import { useQuery } from "@tanstack/react-query";
import { Todos } from "../types/type";

const TodosPage = () => {
  const [filterQuery, setFilterQuery] = useState("All");
  const { getAllTodos } = useTodos();

  const {
    data: todos,
    error,
    isLoading,
    isError,
  } = useQuery<Todos, Error>({
    queryKey: ["todos"],
    queryFn: getAllTodos,
  });

  const activeTodosNumber = todos?.filter(
    (d) => d.is_completed === false
  ).length;

  let allTodos: Todos = [];

  if (todos) {
    switch (filterQuery) {
      case "All":
        allTodos = todos;
        break;

      case "Active":
        allTodos = todos.filter((d) => d.is_completed === false);
        break;

      case "Completed":
        allTodos = todos.filter((d) => d.is_completed === true);
        break;

      default:
        allTodos = todos;
    }
  }

  if (isLoading) {
    return (
      <h2 className="text-center mt-5 text-2xl font-semibold dark:bg-VeryDarkBlueDark dark:text-LightGrayishBlueDark2 font-Josefin">
        Loading...
      </h2>
    );
  }

  if (isError) {
    return <h2 className="text-center mt-5">Error: {error.message}</h2>;
  }
  return (
    <>
      <Header />
      <main className="font-Josefin  w-full min-h-[calc(100vh-230px)] bg-VeryLightGray dark:bg-VeryDarkBlueDark">
        <TodoList
          data={allTodos}
          filterQuery={filterQuery}
          setFilterQuery={setFilterQuery}
          activeTodosNumber={activeTodosNumber}
        />
      </main>
    </>
  );
};

export default TodosPage;
