import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { sections } from './config/sections'
import { HomePage } from './pages/HomePage'
import { SectionPage } from './pages/SectionPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {sections.map((section) => (
          <Route
            key={section.path}
            path={section.path}
            element={<SectionPage section={section} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
