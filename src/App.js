import './assets/styles/style.scss'
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./router/AppRouter";
import NavBar from "./components/Navbar/NavBar";
import Footer from "./components/Footer/Footer";
import {useContext, useEffect, useState} from "react";
import {Context} from './index'
import {check} from 'http/userAPI'
import {Spinner} from 'react-bootstrap'
import {getUser} from 'http/userAPI'


function App() {
    const {user, links} = useContext(Context)
    const [loading, setLoading] = useState(true)

    const checkAndSetUser = () => {
        try {
            check().then(async data => {
                await setUser(data)
            }).finally(() => setLoading(false))
        } catch (e) {
            localStorage.removeItem('token')
            console.log(e.message)
        }
    }

    const setUser = async (data) => {
        try {
                await getUser(data.userId).then(
            data => {
                user.setUser(data)
                user.setIsAuth(true)
            })} catch(e) {console.log(e)}
    }

    const createLinkModal = () => {
        links.setIsCreateModal(true)
    }

    const logOut = () => {
        localStorage.removeItem('token')
        user.setIsAuth(false)
        user.setUser(null)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            checkAndSetUser()
        } else {
            setLoading(false)
        }
    })
    // if (loading) {
    //     return <Spinner className={'mx-auto'} animation={"grow"}></Spinner>
    // }

  return (
      <BrowserRouter>
          <NavBar createLinkModal={createLinkModal} logOut={logOut} />
          { loading ?
              <div className={'spinner-wrapper'}><Spinner animation={"border"}></Spinner></div>:
              <AppRouter />
          }
          {/*<Footer />*/}
      </BrowserRouter>
  );
}

export default App;
