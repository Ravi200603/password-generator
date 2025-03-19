import { useState, useCallback,useEffect } from 'react';
import './App.css';

function App() {
  // State variables
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // Function to generate password
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+{}[]`~";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed]);
 
  useEffect(()=>{passwordGenerator()}, [length, numAllowed, charAllowed, passwordGenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto h-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-800'>
        <h1 className='text-white text-center py-4'>Password Generator</h1>
        
        {/* Display generated password */}
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input 
            type="text"
            value={password}
            className='outline-none w-full py-1 px-3 bg-white rounded-5xl'
            placeholder='password'
            readOnly
          />
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={() => navigator.clipboard.writeText(password)}>
            Copy
          </button>
        </div>
        
        {/* Controls */}
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1 mb-5'>
            <input
              type="range" 
              min={6}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label> Length: {length} </label>
          </div>
          
          <div className='flex items-center gap-x-1 mb-5'>
            <input 
              type="checkbox"
              checked={numAllowed}
              id='numberInput'
              onChange={() => setNumAllowed(prev => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          
          <div className='flex items-center gap-x-1 mb-5'>
            <input
              type="checkbox"
              checked={charAllowed}
              id="charInput"
              onChange={() => setCharAllowed(prev => !prev)}
            />
            <label htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;