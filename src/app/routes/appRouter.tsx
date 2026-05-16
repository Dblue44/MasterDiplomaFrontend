import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from 'react-router-dom'
import {Fallback} from "@shared/ui/fallback";
import {HomePage} from "@pages/home";
import {Layout} from "@app/layout";
import {ProcessList} from "@pages/processList";
import {ImagePreviewPage} from "@pages/preview";
import {PrivacyPage} from "@pages/privacy";
import {TermsPage} from "@pages/terms";
import {ContactsPage} from "@pages/contacts";

export const AppRouter = () => {

  const routers = createRoutesFromElements(
    <Route
      path='/'
      element={<Layout />}
      errorElement={<Fallback />}>
      <Route index element={<HomePage />} />
      <Route path='images' element={<ProcessList />} />
      <Route path="images/:guid" element={<ImagePreviewPage />} />
      <Route path="privacy" element={<PrivacyPage />} />
      <Route path="terms" element={<TermsPage />} />
      <Route path="contacts" element={<ContactsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Route>
  )

  const router = createBrowserRouter(routers, {})

  return (
    <RouterProvider router={router}/>
  )
}
