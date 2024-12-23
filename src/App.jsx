import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { AppRouter } from './router/AppRouter';
import { AuthProvider } from './auth/context/AuthProvider';

function App() {
  const [count, setCount] = useState(0)

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
}

export default App
