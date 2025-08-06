import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AllProjects from './allprojects';
import Simple from './simple';
import NotFound from './notfound.tsx';
import ShooterRedirect from './components/ShooterRedirect.tsx';
import FreelancePortfolio from './freelance/FreelancePortfolio.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<App />}/>
      <Route path="/projects" element={<AllProjects />}/>
      <Route path="/simple" element={<Simple />} />
      <Route path="/shooter" element={<ShooterRedirect />} />
      <Route path="/freelance" element={<FreelancePortfolio />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)