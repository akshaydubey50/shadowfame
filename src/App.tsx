
import './App.css'
import { CelebsModuleProvider } from './context/CelebsModuleContext'
import CelebsScreen from './page/CelebsScreen'

function App() {

  return (
    <>
    <CelebsModuleProvider>
      <CelebsScreen />
    </CelebsModuleProvider>
    </>
  )
}

export default App
