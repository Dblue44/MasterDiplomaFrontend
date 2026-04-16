import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import {Fallback} from "@shared/ui/fallback";
import {HomePage} from "@pages/home";
import {Layout} from "@app/layout";
import {ProcessList} from "@pages/processList";
import {ImagePreviewPage} from "@pages/preview";

export const AppRouter = () => {

  const routers = createRoutesFromElements(
    <Route
      path='/'
      element={<Layout />}
      errorElement={<Fallback />}>
      <Route index element={<HomePage />} />
      <Route path='images' element={<ProcessList />} />
      <Route path="images/:guid" element={<ImagePreviewPage />} />
    </Route>
  )

  const router = createBrowserRouter(routers, {})

  return (
    <RouterProvider router={router}/>
  )
}
