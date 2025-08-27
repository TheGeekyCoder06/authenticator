import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './Layout.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route
} from 'react-router-dom'

import Home from './components/home.jsx'
import About from './components/about.jsx'
import Contact from './components/contact.jsx'
import User from './components/user.jsx'
import NotFound from './components/notFound.jsx'
import GitHub, { githubInfoLoader } from './components/github.jsx'   // ✅ fixed import

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route path='contact' element={<Contact />} />

      {/* user routes */}
      <Route path='user' element={<User />} />      
      <Route path='user/:id' element={<User />} />  

      {/* GitHub route with loader */}
      <Route path='github' element={<GitHub />} loader={githubInfoLoader} />

      {/* fallback */}
      <Route path='*' element={<NotFound />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
