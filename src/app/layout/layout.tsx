import {SidebarInset} from "@shared/ui/sidebar.tsx";
import {Header} from "@widgets/header";
import {MainSidebar} from "@shared/ui/mainSidebar.tsx";
import {Outlet} from "react-router-dom";
import {Footer} from "@widgets/footer/footer.tsx";

export const Layout = () => {
  return (
    <>
      <SidebarInset className="min-h-svh">
        <Header/>
        <main id="app-main" className="flex flex-1 justify-center">
          <Outlet />
        </main>
        <Footer />
      </SidebarInset>
      <MainSidebar side="right" collapsible="offcanvas" className="h-full z-100"/>
    </>
  )
}