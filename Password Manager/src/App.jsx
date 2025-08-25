import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  // ------------------ State Variables ------------------

  // Length of the password (default 8)
  const [length, setLength] = useState(8)

  // Whether numbers are allowed in password
  const [numberAllowed, setNumberAllowed] = useState(false)

  // Whether special characters are allowed in password
  const [charAllowed, setCharAllowed] = useState(false)

  // The generated password
  const [password, setPassword] = useState('')

  // Reference to the password input field (for copying)
  const passwordRef = useRef(null)

  // ------------------ Password Generator Function ------------------
  const generatePassword = useCallback(() => {
    // Character sets
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const numberChars = '0123456789'
    const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-='

    // Start with alphabets by default
    let characterList = lowerCaseChars + upperCaseChars

    // Add numbers if checkbox is enabled
    if (numberAllowed) characterList += numberChars

    // Add special characters if checkbox is enabled
    if (charAllowed) characterList += specialChars

    // Generate password
    let generatedPassword = ''
    const characterListLength = characterList.length

    for (let i = 0; i < length; i++) {
      // ✅ Use floor to avoid out-of-bounds index
      const characterIndex = Math.floor(Math.random() * characterListLength)
      generatedPassword += characterList.charAt(characterIndex)
    }

    // Update state
    setPassword(generatedPassword)
  }, [length, numberAllowed, charAllowed])

  // ------------------ Auto-generate password on change ------------------
  useEffect(() => {
    generatePassword()
  }, [length, numberAllowed, charAllowed, generatePassword])

  // ------------------ JSX (UI) ------------------
  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
      {/* Title */}
      <h1 className='text-3xl font-bold mb-2 text-center'>Password Generator</h1>

      {/* Password display box with copy button */}
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
          type="text"
          value={password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button
          className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
          onClick={() => {
            // Select text in input
            passwordRef.current?.select()
            passwordRef.current?.setSelectionRange(0, 999) // Mobile support
            // Copy text to clipboard
            navigator.clipboard.writeText(password)
          }}
        >
          Copy
        </button>
      </div>

      {/* Controls Section */}
      <div className='flex text-sm gap-x-2'>

        {/* Password Length Slider */}
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e) => setLength(Number(e.target.value))} // ✅ Ensure number
          />
          <label className="ml-2">Length: {length}</label>
        </div>

        {/* Numbers Checkbox */}
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label>Numbers</label>
        </div>

        {/* Special Characters Checkbox */}
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label>Characters</label>
        </div>
      </div>
    </div>
  )
}

export default App
