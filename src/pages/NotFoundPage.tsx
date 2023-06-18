import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <section className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-gray-600 mb-8">Page not found</p>
        <Link to="/" className="px-4 py-2 bg-blue-500 text-white rounded">
          Go Back
        </Link>
      </div>
    </section>
  );
};
export default NotFoundPage;
