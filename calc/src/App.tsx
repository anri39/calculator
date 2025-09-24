import { useState } from "react";
import "./App.css";

const calcButtons = [
  "7",
  "8",
  "9",
  "/",
  "4",
  "5",
  "6",
  "*",
  "1",
  "2",
  "3",
  "-",
  ".",
  "0",
  "=",
  "+",
];

function App() {
  const [display, setDisplay] = useState("");
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function calculate() {
    const calculated = eval(display);
    setDisplay(Math.floor(Number(calculated)).toString());
  }

  function appendNumber(btn: string) {
    setDisplay((prev) => prev + btn);
  }

  const handleButtonClick = (
    btn: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    const lastChar = display.slice(-1);
    if (btn === "=") {
      if (lastChar === "" || ["+", "-", "*", "/"].includes(lastChar)) {
        setError(true);
        setErrorMessage("Invalid Expression");
        return;
      }
      calculate();
    } else {
      if (
        ["+", "-", "*", "/"].includes(btn) &&
        ["+", "-", "*", "/"].includes(lastChar)
      )
        return;
      appendNumber(btn);
    }
  };

  return (
    <div className="main">
      <div className="input">
        <input
          type="text"
          className="calc-input"
          value={display}
          readOnly
          placeholder="Enter a number to begin"
        />
        <p
          style={{
            color: "Red",
            fontSize: "25px",
            marginTop: "-10px",
            marginBottom: "10px",
          }}
        >
          {error ? errorMessage : ""}
        </p>
      </div>
      <div className="buttons">
        {calcButtons.map((btn) => (
          <button
            key={btn}
            className="button"
            onClick={handleButtonClick.bind(null, btn)}
          >
            {btn}
          </button>
        ))}
        <button
          className="button clear"
          onClick={() => {
            setDisplay("");
            setError(false);
            setErrorMessage("");
          }}
        >
          C
        </button>
      </div>
    </div>
  );
}

export default App;
