import './App.css'
import {Label} from "@shared/ui/label.tsx"
import {useTheme} from "next-themes";
import {Switch} from "@shared/ui/switch.tsx";

function App() {
  const {theme, setTheme} = useTheme()
  const isDark = theme === 'dark'

  const handleToggle = (value: boolean): void => {
    setTheme(value ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex items-center gap-6 border border-black-200 dark:border-white-800 rounded-md p-4">
        <Switch
          id="theme-switch"
          checked={isDark}
          onCheckedChange={handleToggle}
        />
        <Label className="text-lg">
          {isDark ? 'Тёмная тема' : 'Светлая тема'}
        </Label>
      </div>
    </div>
  )
}

export default App
