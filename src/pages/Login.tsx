import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { Provider } from "@supabase/supabase-js";

const Login = () => {
  const { loginWithProvider, session } = useAuth();
  const handleLogin = (provider: Provider) => {
    loginWithProvider(provider);
  };
  if (session) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <header className="max-w-full h-[230px] bg-cover flex justify-center items-center bg-[url('/images/bg-mobile-light.jpg')] md:bg-[url('/images/bg-desktop-light.jpg')]">
        <h1 className="text-2xl font-bold tracking-widest  mb-4 text-VeryLightGrayishBlue font-Josefin">
          TODO List
        </h1>
      </header>
      <main className="bg-VeryDarkBlueDark w-full h-[calc(100vh-230px)] flex justify-center items-center relative">
        <section className="bg-VeryDarkDesaturatedBlueDark py-5 px-8 flex flex-col gap-5 rounded-lg items-center text-VeryLightGray font-Josefin dark:text-DarkGrayishBlueDark justify-evenly h-[280px] w-[250px] shadow-md absolute -top-[50px] shadow-VeryDarkGrayishBlueDark2">
          <h2 className="text-xl">Carpe Diem</h2>
          <p>Seize the day!</p>
          <div className="flex flex-col justify-center items-center gap-4">
            <button
              className="border py-2 px-5 rounded-md hover:border-DarkGrayishBlue"
              onClick={() => handleLogin("google")}
            >
              Login with Google
            </button>
            <button
              className="border py-2 px-5 rounded-md hover:border-DarkGrayishBlue"
              onClick={() => handleLogin("github")}
            >
              Login with Github
            </button>
          </div>
        </section>
      </main>
    </>
  );
};
export default Login;
