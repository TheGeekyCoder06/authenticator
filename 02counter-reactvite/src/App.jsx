import { useState } from 'react'
import './App.css'

function App() {

  // let counter = 0
  const [counter , setCounter] = useState(0)
  // first value is the current state
  // second value is the function which is used to update the state
  const addValue = () => {
    setCounter(counter + 1)
    setCounter(counter + 1)
    setCounter(counter + 1)
    setCounter(counter + 1)
    // counter = counter + 1
    console.log(counter)
  }
  const removeValue = () => {
    if(counter > 0)
    setCounter(counter - 1)
    // counter = counter - 1
    console.log(counter)
  }
  const [count, setCount] = useState(0)
  return(
    <>
    <h1>React course with Harshith {counter}</h1>
    <h2>Counter Value: {counter}</h2>
    <button onClick={addValue}>Add Value</button> {" "}
    <button onClick={removeValue}>Remove Value</button>
    <p>Footer: {counter}</p>
    </>
  )
}

export default App
