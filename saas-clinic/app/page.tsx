import Login from "./(auth)/login/page";
import Navbar from "../Component/Navbar";
import JoinUsPage from "@/app/(auth)/joinUs/page";
const Home = () => {
  return (
    <>
      <div className="flex min-h-screen items-center mt-7 justify-center bg-zinc-50 font-sans ">
        <JoinUsPage />
        {/* <Login /> */}
      </div>
    </>
  );
};

export default Home;
