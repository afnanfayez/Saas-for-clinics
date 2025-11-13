import Navbar from "../Component/Navbar";
import JoinUsPage from "@/app/(auth)/joinUs/page";

const Home = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center mt-7 justify-center bg-zinc-50 font-sans ">
        <JoinUsPage />
      </div>
    </>
  );
};

export default Home;
