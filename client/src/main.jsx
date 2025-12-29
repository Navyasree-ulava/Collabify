import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store.js'
import { Provider } from 'react-redux'
import { ClerkProvider } from '@clerk/clerk-react'
import { dark } from '@clerk/themes'
import { useSelector } from 'react-redux'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

const ClerkWithTheme = ({ children }) => {
    const { theme } = useSelector((state) => state.theme);
    return (
        <ClerkProvider
            publishableKey={PUBLISHABLE_KEY}
            appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
            }}
        >
            {children}
        </ClerkProvider>
    );
};

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Provider store={store}>
            <ClerkWithTheme>
                <App />
            </ClerkWithTheme>
        </Provider>
    </BrowserRouter>,
)