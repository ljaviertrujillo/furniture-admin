import { Provider } from 'react-redux'
import store from './redux/store'
import './styles/App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { PublicRoutes } from './models'
import Login from './pages/Login/Login'
import { AuthGuard } from './guards/auth.guard'
import Private from './pages/Private/Private'
import { RoutesWithNotFound } from './utilities'
import PageContextProvider from './context/PageContext'

export default function App() {

  return (
    <Provider store={store}>
      <PageContextProvider>
        <BrowserRouter>
          <RoutesWithNotFound>
            <Route path={PublicRoutes.LOGIN} element={<Login />}/>
            <Route element={<AuthGuard />}>
              <Route path='/*' element={<Private />} />
            </Route>
          </RoutesWithNotFound>
        </BrowserRouter>
      </PageContextProvider>
    </Provider>
  )
}
