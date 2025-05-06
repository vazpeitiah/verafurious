import Navbar from "./components/Navbar";
import TimeLine from "./components/TimeLine";

function App() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-3xl w-full mt-8">
        <TimeLine />
      </div>
    </>
  );
}

export default App;
