import "./App.css";
import Form from "./components/Form";
import pizzaImg from "./assets/img/pizza.png";

function App() {
  return (
    <>
      <div className="mx-2 my-4">
        <img
          src={pizzaImg}
          alt="An icon of a pizza"
          className="mx-auto max-h-36"
        />
        <h1 className="my-8 text-center text-4xl font-bold">
          Create your pizza
        </h1>
        <Form />
      </div>
    </>
  );
}

export default App;
