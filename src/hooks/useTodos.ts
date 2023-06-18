import supabase from "../supabase/supabaseClient";
import { Todo } from "../types/type";
import useAuth from "./useAuth";

const useTodos = () => {
  const { user } = useAuth();
  const getAllTodos = async () => {
    const { data, error } = await supabase
      .from("todos")
      .select()
      .eq("user_id", user?.id)
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }
    return data;
  };

  const addTodo = async (title: string) => {
    const { error } = await supabase
      .from("todos")
      .insert({ title, user_id: user?.id });

    if (error) {
      throw new Error(error.message);
    }
  };

  const deleteTodo = async (id: string) => {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("id", parseInt(id, 10))
      .eq("user_id", user?.id);

    if (error) {
      return new Error(error.message);
    }
  };

  const completeTodo = async (todo: Todo) => {
    const { error } = await supabase
      .from("todos")
      .update({ is_completed: !todo.is_completed })
      .eq("id", parseInt(todo.id, 10))
      .eq("user_id", user?.id);

    if (error) {
      throw new Error(error.message);
    }
  };

  const clearCompletedTodos = async () => {
    const { error } = await supabase
      .from("todos")
      .delete()
      .eq("is_completed", true)
      .eq("user_id", user?.id);

    if (error) {
      throw new Error(error.message);
    }
  };

  return {
    getAllTodos,
    addTodo,
    deleteTodo,
    completeTodo,
    clearCompletedTodos,
  };
};
export default useTodos;
