import {SidebarTrigger} from "@shared/ui/sidebar.tsx";
import {AnimatedThemeToggler} from "@shared/ui/animatedThemeToggler.tsx";

export const Header = () => {
  return (
    <header className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between border-b bg-background/80 backdrop-blur px-4">
      <div className="w-8"></div>

      <div className="flex items-center justify-center flex-1 gap-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">AI</span>
          </div>
          <span className="font-bold text-xl">SuperRes</span>
        </div>
        <AnimatedThemeToggler/>
      </div>

      <SidebarTrigger className="rotate-180"/>
    </header>
  )
}