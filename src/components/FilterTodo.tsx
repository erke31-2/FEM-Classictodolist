import filterQueries from "../utils/filterQueries";

type Props = {
  filterQuery: string;
  setFilterQuery: React.Dispatch<React.SetStateAction<string>>;
};

const FilterTodo = ({ filterQuery, setFilterQuery }: Props) => {
  return (
    <div className="w-[370px] mx-auto  md:w-[600px] flex bg-VeryLightGray text-DarkGrayishBlue items-center p-4 gap-6 rounded-md justify-center mt-6 font-semibold md:hidden shadow-md shadow-LightGrayishBlue dark:bg-VeryDarkDesaturatedBlueDark dark:text-LightGrayishBlueDark1 dark:shadow-VeryDarkBlueDark">
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
  );
};
export default FilterTodo;
