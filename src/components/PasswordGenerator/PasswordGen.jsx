import React, { useCallback, useEffect, useState, useRef } from 'react'

const PasswordGen = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  const passwordRef = useRef(null);

  const passwordGenerator = () => {
    let genChar = ""
    let genPass = '';
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "~!@#$%^&*()_-+{}=[]`"

    for (let i = 1; i <= length; i++) {
      genChar = Math.floor(Math.random() * str.length + 1)
      genPass += str.charAt(genChar);
    }
    setPassword(genPass);
  };

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,101)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(() => {
    console.log("inside useEffect")
    passwordGenerator()
  }, [charAllowed, numberAllowed, length])


  return (
    <>
      <div style={{
        background: "black", display: "flex", justifyContent: "center", width: "100%", padding: "4px"
      }}>
        <input
          type="text"
          value={password}
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button style={{ outline: "none", }} onClick={copyPassword}>Copy</button>
      </div>

      <div className="cw">
        <div className="inputHolder">
          <input type="range" min={6} max={50}
            value={length}
            className='cursor-pointer'
            onChange={(e) => { setLength(e.target.value) }}
          />
          <label>Length: {length}</label>
        </div>

        <div className="inputHolder">
          <input type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onClick={(e) => { setNumberAllowed((prev) => !prev) }}
          />
          <label>Numbers</label>
        </div>

        <div className="inputHolder">
          <input type="checkbox"
            defaultChecked={charAllowed}
            id="charInput"
            onChange={(e) => { setCharAllowed((prev) => !prev) }}
          />
          <label>Character Allowed</label>
        </div>
      </div>
    </>
  )

}
export default PasswordGen;