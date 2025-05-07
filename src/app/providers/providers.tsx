import {FC, JSX} from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { Provider } from 'react-redux'
import store, { persistor } from '@app/store'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from '@app/providers'
import {Fallback} from "@shared/ui/fallback";
import {SidebarProvider} from "@shared/ui/sidebar.tsx";

interface IProviders {
  /** Content that will be wrapped by providers. */
  readonly children: JSX.Element
}

export const Providers: FC<IProviders> = ({ children }) => {
  return (
    <SidebarProvider>
      <ErrorBoundary FallbackComponent={Fallback}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
            >
              {children}
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </ErrorBoundary>
    </SidebarProvider>
  )
}