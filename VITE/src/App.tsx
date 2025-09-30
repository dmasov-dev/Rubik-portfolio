import { useState, useEffect } from 'react'
import CubicGallery from './CubicGallery'
import Login from './Login'
import axios from 'axios'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    delete axios.defaults.headers.common['Authorization'];
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    const handleLoginSuccess = () => {
      console.log('Login success callback called');
      setIsAuthenticated(true);
    };
    return (
      <div className="w-screen h-screen p-2 flex flex-col items-center overflow-hidden">
        <h1 className="welcome-heading">
          Page <br /><br />
          of Darin Masov,<br /><br />
          senior WEB developer.<br /><br />
          Professional online presentation.
        </h1>
        <Login onLoginSuccess={handleLoginSuccess} />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen p-2 flex flex-col items-center overflow-hidden">

      {/* <h1 className='text-center font-bold text-2xl m-2'>presentation  Darin Masov</h1> */}
      {/* <h1 className='portfolio-title'>presentation Darin Masov</h1> */}
      <h1 className='portfolio-title'>Presentation, Darin Masov, WEB developer</h1>
      <CubicGallery imageData={      [
      "/assets/Automation/Chrysler/18009.jpg",
      "/assets/Automation/Chrysler/A0038.png",
      "/assets/Automation/Chrysler/A0042.JPG",
      "/assets/Automation/Chrysler/A0043.JPG",
      "/assets/Automation/Chrysler/ControlPanel.png",
      "/assets/Automation/Chrysler/GMT265_debug1.jpg",
      "/assets/Automation/Chrysler/GMT265_debug2.jpg",
      "/assets/Automation/Chrysler/GMT265_main.jpg",
      "/assets/Automation/Chrysler/GMT265_self_learning.jpg",
      "/assets/Automation/Chrysler/izgled.JPG",
      "/assets/Automation/Chrysler/Screenshot1.jpg",
      "/assets/Automation/Chrysler/Screenshot2.jpg",
      "/assets/Automation/WaveAnalysis/EndTest.PNG",
      "/assets/Automation/WaveAnalysis/EndTest1.PNG",
      "/assets/Automation/WaveAnalysis/FinalTest.png",
      "/assets/Automation/MashineVision/ControlPanel.png",
      "/assets/Automation/MashineVision/ImageFromCamera.png",
      "/assets/Automation/Statistic/Oracle.jpg",
      "/assets/Automation/Statistic/spc.jpg",
      "/assets/Automation/Statistic/spc1.jpg",
      "/assets/Automation/Vezni/PanelAndStatistics.jpg",
      "/assets/Automation/VW_Audi/EEPROM.png",
      "/assets/Automation/VW_Audi/InternalDiagram.png",
      "/assets/CarDiagnostics/DMC_0163.JPG",
      "/assets/Certificates/CPlusPlus.jpg",
      "/assets/Certificates/darin-masov-8c4a3bc0-8fe5-4269-b819-a414504c5db6-certificate.png",
      "/assets/Certificates/darin-masov-be2d007b-74c7-45ed-9a9f-840f991c3cd5-certificate.png",
      "/assets/Certificates/Diplom.jpg",
      "/assets/Certificates/IFR.jpg",
      "/assets/Certificates/JavaEE.jpg",
      "/assets/Certificates/CPlusPlus.jpg",
      "/assets/Certificates/VisualCPlusPlus.jpg",
      "/assets/Certificates/Java.jpg",
      "/assets/JavaEE/21.png",
      "/assets/JavaEE/210.png",
      "/assets/JavaEE/211.png",
      "/assets/JavaEE/212.png",
      "/assets/JavaEE/213.png", 
      "/assets/JavaEE/214.png",
      "/assets/JavaEE/215.png",
      "/assets/JavaEE/216.png",
      "/assets/JavaEE/217.png",
      "/assets/JavaEE/218.png",
      "/assets/JavaEE/219.png",
      "/assets/JavaEE/220.png",
      "/assets/JavaEE/221.png",
      "/assets/JavaEE/22.png",
      "/assets/JavaEE/23.png",
      "/assets/JavaEE/24.png", 
      "/assets/JavaEE/25.png",
      "/assets/JavaEE/26.png",
      "/assets/JavaEE/27.png",
      "/assets/JavaEE/28.png",
      "/assets/JavaEE/29.png"
    ]}/>

    </div>
  )
}

export default App
