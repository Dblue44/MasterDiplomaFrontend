import {Switch} from "@shared/ui/switch.tsx";
import {SidebarTrigger} from "@shared/ui/sidebar.tsx";
import {useTheme} from "next-themes";

export const Header = () => {
  const {theme, setTheme} = useTheme()
  const isDark = theme === 'dark'

  const handleToggle = (value: boolean): void => {
    setTheme(value ? 'dark' : 'light')
  }

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <Switch
        id="theme-switch"
        checked={isDark}
        onCheckedChange={handleToggle}
      />
      <SidebarTrigger className="-mr-1 ml-auto rotate-180"/>
    </header>
  )
}