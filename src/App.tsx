import classes from './App.module.css'

import { Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'
import Store from './components/Store'
import Background from './components/Background'

function App() {

  return (
    <div className={classes.home}>
      <Background />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path="/store" element={<Store />} />
      </Routes>
    </div>
  )
}

export default App
