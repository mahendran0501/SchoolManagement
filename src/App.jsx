import './App.css';
import "primereact/resources/themes/lara-light-cyan/theme.css";        
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Admin from './LoginPg/Admin';
import Thisar from './LoginPg/Thisar';
import Student from './LoginPg/Student';
import Abminpg from './Abminpg/Abminpg';
import Teacherpg from './Teacherpg/Teacherpg';
import Studentpg from './Studentpg/Studentpg';
import Teacherapp from './Registration/Teacherapp';
import Abminapp from './Registration/Abminapp';
import Studentadd from './Registration/Studentadd';
import Timetable from './TimeTable/TimeTable';
import Demo from './Demo/Demo';
import Attendance from './Attendance/Attendance';
import Demoo from './Demo/Demoo';
import Navbar from './HomePg/Navbar';
import Content from './HomePg/Content';
import About from './HomePg/About';
import Homepg from './HomePg/Homepg'; // Assuming you have this component
import { slides } from './Data/CarouselData.json';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Homepg slides={slides} />} />
          <Route path='/Navbar' element={<Navbar />} />
          <Route path='/About' element={<About />} />
          <Route path='/Content' element={<Content />} />
          <Route path='/Admin' element={<Admin />} />
          <Route path='/Thisar' element={<Thisar />} />
          <Route path='/Student' element={<Student />} />
          <Route path='/Abminpg' element={<Abminpg />} />
          <Route path='/Teacherpg' element={<Teacherpg />} />
          <Route path='/Attendance' element={<Attendance />} />
          <Route path='/Studentpg' element={<Studentpg />} />
          <Route path='/Teacherapp' element={<Teacherapp />} />
          <Route path='/Abminapp' element={<Abminapp />} /> 
          <Route path='/Studentadd' element={<Studentadd />} />
          <Route path='/Timetable' element={<Timetable />} /> 
          <Route path='/Demo' element={<Demo />} />
          <Route path='/Demoo' element={<Demoo />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
