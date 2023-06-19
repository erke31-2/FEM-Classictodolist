import TodoItem from "./TodoItem";
import FilterTodo from "./FilterTodo";
import ClearCompleteTodo from "./ClearCompleteTodo";
import filterQueries from "../utils/filterQueries";
import { Todo, Todos } from "../types/type";
import { useEffect, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { StrictModeDroppable as Droppable } from "../utils/StrictModeDroppable";

type Props = {
  data: Todos;
  filterQuery: string;
  setFilterQuery: React.Dispatch<React.SetStateAction<string>>;
  activeTodosNumber?: number;
};

const TodoList = ({
  data,
  filterQuery,
  setFilterQuery,
  activeTodosNumber,
}: Props) => {
  const [todos, updateTodos] = useState<Todos>(data || []);

  useEffect(() => {
    try {
      const storedData = localStorage.getItem("taskOrder");
      const arrayIdsOrder: string[] | null = storedData
        ? JSON.parse(storedData)
        : null;

      if (!arrayIdsOrder && data && data.length) {
        const idsOrderArray = data.map((d) => d.id);
        localStorage.setItem("taskOrder", JSON.stringify(idsOrderArray));
      }

      let myArray: Array<Todo | undefined> = [];
      if (arrayIdsOrder?.length && data?.length) {
        myArray = arrayIdsOrder.map((pos) => data.find((d) => d.id === pos));
        const newItems = data.filter((d) => !arrayIdsOrder.includes(d.id));
        if (newItems.length) myArray = [...newItems, ...myArray];
      }

      const filteredArray = myArray.filter(Boolean) as Todo[];
      const updatedTodos = filteredArray.length ? filteredArray : data;
      updateTodos(updatedTodos || []);
    } catch (error) {
      console.error("Error parsing JSON data:", error);
    }
  }, [data]);

  const handleOnDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const tasks = [...todos];

    const [reorderItem] = tasks.splice(result.source.index, 1);
    tasks.splice(result.destination.index, 0, reorderItem);
    const idsOrderArray = tasks.map((t) => t.id);
    localStorage.setItem("taskOrder", JSON.stringify(idsOrderArray));
    updateTodos(tasks);
  };

  return (
    <section className="w-full h-full dark:bg-VeryDarkBlueDark flex justify-center relative">
      <ul className="w-[370px] mx-auto  md:w-[600px] shadow-lg rounded-md shadow-LightGrayishBlue dark:shadow-VeryDarkBlueDark absolute -top-8">
        {todos.length === 0 ? (
          <li>
            <p className="text-center text-VeryDarkBlueDark dark:text-LightGrayishBlueDark2">
              There is no {filterQuery === "All" ? "" : filterQuery} todos yet!
            </p>
          </li>
        ) : (
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todos">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {todos.map((todo, index) => (
                    <Draggable
                      key={todo.id}
                      draggableId={todo.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className={`${
                            index === 0 && "rounded-t-md"
                          } list-item `}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <TodoItem todo={todo} />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}

        <li className="flex bg-VeryLightGray text-DarkGrayishBlue  items-center  p-4 gap-1 w-full rounded-b-md justify-between dark:bg-VeryDarkDesaturatedBlueDark dark:text-VeryDarkGrayishBlueDark1">
          <p>{activeTodosNumber} items left</p>
          <div className="hidden md:flex gap-2 ml-8">
            {filterQueries.map((q) => (
              <button
                key={q.query}
                onClick={() => setFilterQuery(q.query)}
                className={`${
                  filterQuery === q.query && "text-BrightBlue"
                } hover:text-BrightBlue transition-colors duration-400 ease-in-out`}
              >
                {q.query}
              </button>
            ))}
          </div>
          <ClearCompleteTodo />
        </li>
        <li>
          <FilterTodo
            filterQuery={filterQuery}
            setFilterQuery={setFilterQuery}
          />
        </li>
        <li>
           <p className="text-center text- dark:text-VeryDarkGrayishBlueDark1 text-DarkGrayishBlue mt-12">
            Drag and Drop to reorder list
          </p>
        
        </li>
      </ul>
      
    </section>
  );
};

export default TodoList;
