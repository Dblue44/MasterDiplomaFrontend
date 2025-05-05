import './App.css'
import {useTheme} from "next-themes";
import {Switch} from "@shared/ui/switch.tsx";
import {MainSidebar} from "@shared/ui/main-sidebar.tsx";
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@shared/ui/sidebar.tsx";

function App() {
  const {theme, setTheme} = useTheme()
  const isDark = theme === 'dark'

  const handleToggle = (value: boolean): void => {
    setTheme(value ? 'dark' : 'light')
  }

  return (
    <SidebarProvider>
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Switch
            id="theme-switch"
            checked={isDark}
            onCheckedChange={handleToggle}
          />
          <SidebarTrigger className="-mr-1 ml-auto rotate-180"/>
        </header>
        <div className="min-h-screen flex justify-center items-center">
          <div className="flex items-center gap-6 border border-black-200 dark:border-white-800 rounded-md p-4">

          </div>

        </div>
      </SidebarInset>
      <MainSidebar side="right" collapsible="icon"/>
    </SidebarProvider>
  )
}

export default App
