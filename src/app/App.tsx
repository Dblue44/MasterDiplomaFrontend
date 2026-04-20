import { CONFIG } from "@/config";
import {Providers} from "@app/providers";
import {AppRouter} from "@app/routes";
import { AppDisabledStub } from "@widgets/appDisabledStub";

function App() {
  if (!CONFIG.APP_ENABLED) {
    return <AppDisabledStub />;
  }

  return (
    <Providers>
      <AppRouter/>
    </Providers>
  )
}

export default App
