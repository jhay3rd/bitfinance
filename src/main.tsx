
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ActivityNotifications from './components/ActivityNotifications.tsx'

// Configure notification settings
const notificationSettings = {
  showTransactionNotifications: true,
  showNewFeatures: true
}

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <ActivityNotifications />
  </>
);
