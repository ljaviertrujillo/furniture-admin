import { Provider } from 'react-redux'
import store from './redux/store'
import './styles/App.scss'
import { BrowserRouter, Route } from 'react-router-dom'
import { PublicRoutes } from './models'
import Login from './pages/Login/Login'
import { AuthGuard } from './guards/auth.guard'
import Private from './pages/Private/Private'
import { RoutesWithNotFound } from './utilities'
import AppContextProvider from './context/AppContext'

export default function App() {

  return (
    <Provider store={store}>
      <AppContextProvider>
        <BrowserRouter>
          <RoutesWithNotFound>
            <Route path={PublicRoutes.LOGIN} element={<Login />}/>
            <Route element={<AuthGuard />}>
              <Route path='/*' element={<Private />} />
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
      </AppContextProvider>
    </Provider>
  )
}
