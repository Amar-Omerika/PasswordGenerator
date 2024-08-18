import { useState } from "react";
import "../../styles/global.sass";
import { FaCopy } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "../ui/Checkbox";
import { CheckboxState } from "../../types/types";
import { AnimatePresence, motion } from "framer-motion";

function PasswordGenerator() {
  const [length, setLength] = useState<number>(10);
  const [checkboxState, setCheckboxState] = useState<CheckboxState>({
    includeLowercase: true,
    includeUppercase: false,
    includeNumbers: false,
    includeSymbols: false,
  });
  const [password, setPassword] = useState<string>("");

  const handleGeneratePassword = () => {
    const {
      includeLowercase,
      includeUppercase,
      includeNumbers,
      includeSymbols,
    } = checkboxState;

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
    key: keyof CheckboxState,
    currentValue: boolean
  ) => {
    const selectedOptions = Object.values(checkboxState).filter(Boolean).length;

    if (selectedOptions > 1 || !currentValue) {
      setCheckboxState((prevState) => ({
        ...prevState,
        [key]: !currentValue,
      }));
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
    <AnimatePresence>
      <motion.div
        className="overflow-hidden"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 1.5 }}
      >
        <div className="password-generator">
          <ToastContainer />
          <div className="password-generator__input-wrapper">
            <motion.input
              type="text"
              value={password}
              readOnly
              className="password-generator__input"
              key={password}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
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
            <Checkbox
              label="Include Lowercase"
              checked={checkboxState.includeLowercase}
              onChange={() =>
                handleCheckboxChange(
                  "includeLowercase",
                  checkboxState.includeLowercase
                )
              }
            />
            <Checkbox
              label="Include Uppercase"
              checked={checkboxState.includeUppercase}
              onChange={() =>
                handleCheckboxChange(
                  "includeUppercase",
                  checkboxState.includeUppercase
                )
              }
            />
            <Checkbox
              label="Include Numbers"
              checked={checkboxState.includeNumbers}
              onChange={() =>
                handleCheckboxChange(
                  "includeNumbers",
                  checkboxState.includeNumbers
                )
              }
            />
            <Checkbox
              label="Include Symbols"
              checked={checkboxState.includeSymbols}
              onChange={() =>
                handleCheckboxChange(
                  "includeSymbols",
                  checkboxState.includeSymbols
                )
              }
            />
          </div>
          <button
            onClick={handleGeneratePassword}
            className="password-generator__button"
          >
            Generate
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PasswordGenerator;
