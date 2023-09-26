import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(6);
  const [numbersAllowed, setNumbersAllowed] = useState(false);
  const [charactersAllowed, setCharactersAllowed] = useState(false);
  const [password, setPassword] = useState("");

  //useRef hook

  const passwordRef = useRef(null);

  //here we pass a fn in dependencies because it run many time in this program

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    // here when data came in str then i make pass depend on it
    if (numbersAllowed) str += "0123456789";
    if (charactersAllowed) str += "!@#$%^&*()[]{}+-7=_<>`~?/|";

    // on the basis of length we start loop
    for (let i = 1; i <= length; i++) {
      //here came a character not string
      let char = Math.floor(Math.random() * str.length + 1);

      //whenever loop end the came into the pass
      // pass = str.charAt(char);
      // //here password is overwrite so ip give only 1 character
      pass += str.charAt(char);
      //here we append the value not overwrite
    }

    setPassword(pass);
  }, [length, numbersAllowed, charactersAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numbersAllowed, charactersAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-10  bg-gray-800 text-orange-500">
        <h1 className="text-white text-center mx-4">Passwod Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-600 hover:bg-green-700 text-white px-3 py-0.5 shrink-0">
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length:{length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numbersAllowed}
              id="numberInput"
              onChange={() => {
                setNumbersAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charactersAllowed}
              id="charInput"
              onChange={() => {
                setCharactersAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="charInput">Char</label>
          </div>
        </div>
      </div>
    </>
  );
}
export default App;
