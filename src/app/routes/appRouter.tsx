import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import {JSX, lazy, Suspense} from 'react'
import {Fallback} from "@shared/ui/fallback";
import {Layout} from "@app/layout";

const HomePage = lazy(() => import("@pages/home").then((module) => ({ default: module.HomePage })));
const ProcessList = lazy(() => import("@pages/processList").then((module) => ({ default: module.ProcessList })));
const ImagePreviewPage = lazy(() => import("@pages/preview").then((module) => ({ default: module.ImagePreviewPage })));
const PrivacyPage = lazy(() => import("@pages/privacy").then((module) => ({ default: module.PrivacyPage })));
const TermsPage = lazy(() => import("@pages/terms").then((module) => ({ default: module.TermsPage })));
const ContactsPage = lazy(() => import("@pages/contacts").then((module) => ({ default: module.ContactsPage })));

const routeElement = (element: JSX.Element) => (
  <Suspense fallback={null}>
    {element}
  </Suspense>
);

export const AppRouter = () => {

  const routers = createRoutesFromElements(
    <Route
      path='/'
      element={<Layout />}
      errorElement={<Fallback />}>
      <Route index element={routeElement(<HomePage />)} />
      <Route path='images' element={routeElement(<ProcessList />)} />
      <Route path="images/:guid" element={routeElement(<ImagePreviewPage />)} />
      <Route path="privacy" element={routeElement(<PrivacyPage />)} />
      <Route path="terms" element={routeElement(<TermsPage />)} />
      <Route path="contacts" element={routeElement(<ContactsPage />)} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )

  const router = createBrowserRouter(routers, {})

  return (
    <RouterProvider router={router}/>
  )
}
