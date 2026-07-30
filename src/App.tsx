import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { LightboxProvider } from './components/lightbox'
import { sections } from './config/sections'
import { AttractionsPage } from './pages/AttractionsPage'
import { DeveloperPage } from './pages/DeveloperPage'
import { DocumentsPage } from './pages/DocumentsPage'
import { HomePage } from './pages/HomePage'
import { PlacesPage } from './pages/PlacesPage'
import { SectionPage } from './pages/SectionPage'
import { SettingsPage } from './pages/SettingsPage'
import { TripDayPage } from './pages/TripDayPage'
import { TripEventPage } from './pages/TripEventPage'
import { TripPage } from './pages/TripPage'

const settingsSection = sections.find((section) => section.path === '/settings')!

function App() {
  return (
    <BrowserRouter>
      <LightboxProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/settings"
            element={<SettingsPage section={settingsSection} />}
          />
          <Route path="/settings/developer" element={<DeveloperPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/sights" element={<AttractionsPage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/trip" element={<TripPage />} />
          <Route path="/trip/event/:eventId" element={<TripEventPage />} />
          <Route path="/trip/:dayId" element={<TripDayPage />} />
          {sections
            .filter(
              (section) =>
                section.path !== '/settings' &&
                section.path !== '/documents' &&
                section.path !== '/sights',
            )
            .map((section) => (
              <Route
                key={section.path}
                path={section.path}
                element={<SectionPage section={section} />}
              />
            ))}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LightboxProvider>
    </BrowserRouter>
  )
}

export default App
