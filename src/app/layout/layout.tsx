import {SidebarInset} from "@shared/ui/sidebar.tsx";
import {Header} from "@widgets/header.tsx";
import {MainSidebar} from "@shared/ui/main-sidebar.tsx";
import {Outlet} from "react-router-dom";


export const Layout = () => {
  console.log('Layout MOUNTED');
  return (
    <>
      <SidebarInset>
        <Header/>
        <main id="app-main" className="h-full flex justify-center items-center">
          <Outlet />
        </main>
      </SidebarInset>
      <MainSidebar side="right" collapsible="icon" className="absolute"/>
    </>
  )
}