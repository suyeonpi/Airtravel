import Header from "./components/HeaderComponent/Header";
import CategoryList from "./components/ListComponent/SliderList";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="contents-container">
        <CategoryList />
      </div>
    </div>
  );
}

export default App;
