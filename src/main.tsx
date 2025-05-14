
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ActivityNotifications from './components/ActivityNotifications.tsx'

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <ActivityNotifications />
  </>
);
