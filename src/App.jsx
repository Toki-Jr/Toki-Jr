import { ThemeProvider } from './context/ThemeContext'; 
import NavBarExport from './components/sections/NavaBar';
import Profil from './components/sections/Profil';
import About from './components/sections/About';
import Skills from './components/sections/Experiences';
import SkillsOrbit from './components/sections/Skills';
import SkillsProgress from './components/sections/SkillsProgress';
import Formation from './components/sections/Formation';
import ProjetCarousel from './components/sections/Projects';
import ContactPage from './components/sections/Contact';
import Footer from './components/sections/Footer';

function App() {

  return (
    <ThemeProvider>
      <NavBarExport/> 
      <Profil />
      <About />
      <Skills />
      <SkillsOrbit />
      <SkillsProgress />
      <ProjetCarousel />
      <Formation />
      <ContactPage />
      <Footer />

    </ThemeProvider>
  )
}

export default App;
