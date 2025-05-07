import {Outlet} from "react-router-dom";

export const HomePage = () => {
  console.log('HomePage mounted!');
  return (
    <div className="flex items-center gap-6 border border-black-200 dark:border-white-800 rounded-md p-4">
      Test 123
      <Outlet />
    </div>
  )
}