import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const reactElement = {
  type: 'a',
  props: {
    href: 'https://google.com',
    target: '_blank',
  },
  children: ['Click here'],
}

function MyApp() {
  return (
    <div>
      <h1>Custom React App</h1>
      {/* Using the reactElement object */}
      <a href={reactElement.props.href} target={reactElement.props.target}>
        {reactElement.children[0]}
      </a>
    </div>
  )
}

function MyWebsite() {
  return (
    <div>
      <h1>This is my website</h1>
      <p>Welcome to my website!</p>
    <a href="#">Click Me!</a>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyApp />

  </StrictMode>
)
