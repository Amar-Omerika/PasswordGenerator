import React, { useState } from "react";
import "./App.sass";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [length, setLength] = useState<number>(10);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(false);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(false);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  const handleGeneratePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let characterPool = "";
    if (includeLowercase) characterPool += lowercaseChars;
    if (includeUppercase) characterPool += uppercaseChars;
    if (includeNumbers) characterPool += numberChars;
    if (includeSymbols) characterPool += symbolChars;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      generatedPassword += characterPool[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const handleCheckboxChange = (
    setFunction: React.Dispatch<React.SetStateAction<boolean>>,
    currentValue: boolean
  ) => {
    const selectedOptions =
      (includeLowercase ? 1 : 0) +
      (includeUppercase ? 1 : 0) +
      (includeNumbers ? 1 : 0) +
      (includeSymbols ? 1 : 0);

    if (selectedOptions > 1 || !currentValue) {
      setFunction(!currentValue);
    }
  };

  const handleCopyToClipboard = () => {
    if (password) {
      navigator.clipboard
        .writeText(password)
        .then(() => {
          toast.success("Password copied to clipboard!");
        })
        .catch(() => {
          toast.error("Failed to copy password.");
        });
    }
  };

  return (
    <div className="password-generator">
      <ToastContainer />
      <div className="password-generator__input-wrapper">
        <input
          type="text"
          value={password}
          readOnly
          className="password-generator__input"
        />
        <FaCopy
          onClick={handleCopyToClipboard}
          className="password-generator__copy-icon"
          title="Copy to clipboard"
        />
      </div>
      <div className="password-generator__controls">
        <label>Character length {length}</label>
        <input
          type="range"
          min="1"
          max="20"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
          className="password-generator__slider"
        />
      </div>
      <div className="password-generator__checkbox-group">
        <label>
          <input
            type="checkbox"
            checked={includeLowercase}
            onChange={() =>
              handleCheckboxChange(setIncludeLowercase, includeLowercase)
            }
            className="password-generator__checkbox-group__input"
          />
          Include Lowercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={() =>
              handleCheckboxChange(setIncludeUppercase, includeUppercase)
            }
            className="password-generator__checkbox-group__input"
          />
          Include Uppercase
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={() =>
              handleCheckboxChange(setIncludeNumbers, includeNumbers)
            }
            className="password-generator__checkbox-group__input"
          />
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={() =>
              handleCheckboxChange(setIncludeSymbols, includeSymbols)
            }
            className="password-generator__checkbox-group__input"
          />
          Include Symbols
        </label>
      </div>
      <button
        onClick={handleGeneratePassword}
        className="password-generator__button"
      >
        Generate
      </button>
    </div>
  );
}

export default App;
