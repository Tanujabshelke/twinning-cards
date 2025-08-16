import logo from "./logo.svg";
import "./App.css";
import { GameBoard } from "./Game-board/GameBoard";

function App() {
  return (
    <div className="tc-main-container">
      <div className="tc-header-container">
        <h1>Welcome to twinning cards Dashboard !</h1>
      </div>
      <GameBoard />
    </div>
  );
}

export default App;
