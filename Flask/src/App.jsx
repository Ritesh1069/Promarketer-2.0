import { useState } from 'react'
import './App.css'
import { BrowserRouter , Routes, Route,} from 'react-router-dom'
import Home_y from './Pages/Home_y'
import About_y from './Pages/About_y'
import Explore_y from './Pages/Explore_y'
import Nopage from './Pages/Nopage'
import Email_y from './Pages/Email_y'
import Whatsapp_y from './Pages/Whatsapp_y'
import Instagram_y from './Pages/Instagram_y'
import Analytics from './Pages/Analytics'
import Contact_y from './Components/Contact'
import Hampage from './Pages/Hampage'
// import Charts from './Pages/Charts'
import Gemini from './Components/gemini_chatbot/Gemini'
// import MainPage from './Components/Analytics_whole/MainPage'


function App() {
  const [count, setCount] = useState(0)

  return (
   
    <div>
      <BrowserRouter>
        <Routes>
            <Route index element={<Home_y/>}/>
            <Route path='/home' element={<Home_y/>}/>
            <Route path='/about' element={<About_y/>}/>
            <Route path='/explore' element={<Explore_y/>}/>
            <Route path='/email' element={<Email_y/>}/>
            <Route path='/whatsapp' element={<Whatsapp_y/>}/>
            <Route path='/instagram' element={<Instagram_y/>}/>
            <Route path='/analytics' element={<Analytics/>}/>
            <Route path='/contact' element={<Contact_y/>}/>
            <Route path='/menu' element={<Hampage/>}/>
            {/* <Route path='/charts' element={<Charts/>}/> */}
            <Route path='*' element={<Nopage/>}/>
            <Route path='/gemini' element={<Gemini/>}/>
            {/* <Route path='/mainanal' element={<MainPage/>}/> */}
            
        </Routes>
      </BrowserRouter>
      
     
    </div>
 
  )
}

export default App
