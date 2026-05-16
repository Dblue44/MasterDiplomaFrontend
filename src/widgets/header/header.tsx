import {SidebarTrigger} from "@shared/ui/sidebar.tsx";
import {AnimatedThemeToggler} from "@shared/ui/animatedThemeToggler.tsx";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header
      className="sticky top-0 z-40 flex h-16 shrink-0 items-center justify-between bg-background/80 backdrop-blur px-4"
      style={{fontFamily: "Manrope, sans-serif"}}
    >
      <div className="w-7"></div>
        <div className="flex items-center justify-center flex-1 gap-4">
          <Link to="/" className="font-bold text-2xl">
            <div className="flex items-center space-x-2">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">AI</span>
              </div>
              <span className="font-bold text-2xl">SuperRes</span>
            </div>
          </Link>
          <AnimatedThemeToggler/>
        </div>
      <SidebarTrigger className="rotate-180"/>
    </header>
  )
}