import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer';
import { Routes, Route, } from 'react-router-dom'
import Home from './pages/Index/Home';
import Contact from './pages/Contact/Contact';
import About from './pages/About/About';
import ItemDetailContainer from './pages/ItemDetailContainer/ItemDetailContainer';
import { ThemeContext } from './components/Context/Theme/theme';
import { useContext, useEffect } from 'react';
import ItemListContainer from './pages/ItemListContainer/ItemListContainer';
import Cart from './pages/Cart/Cart';
import NotFound from './pages/NotFound/NotFound';
import { Toaster } from 'react-hot-toast';
import CustomCube from './pages/CustomCube/CustomCube';
import CheckoutForm from './pages/CheckOut/CheckoutForm';
import { CartContext } from './components/Context/Cart/cart';
import SignIn from './pages/User/SignIn';
import SignUp from './pages/User/SignUp';
import { UserContext } from './components/Context/User/user';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './database/firebase-config';
import OrderConfirmedContainer from './pages/OrderConfirmed/OrderConfirmedContainer';
import StockError from './pages/StockError/StockError';
import ScrollToTop from "react-scroll-to-top";


function App() {

  const { user, setUser } = useContext(UserContext)
  const { theme, setTheme } = useContext(ThemeContext);
  const { cart, setCart } = useContext(CartContext);
  const userTheme = localStorage.getItem("theme");
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark').matches;

  const themeCheck = () => {
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      document.documentElement.classList.add('dark');
      setTheme("dark");
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    let cartInStorage = JSON.parse(localStorage.getItem("cart"));
    if (cartInStorage && cartInStorage.length > 0) {
      setCart(cartInStorage)
    }

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [])

  useEffect(() => {
    themeCheck();
  }, [theme])



  return (

    <div className="App">
      <Toaster
        position="top-left"
      />
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route exact path='/products' element={<ItemListContainer />} />
        <Route exact path='/category/:categoryId' element={<ItemListContainer />} />
        <Route exact path='/item/:cubeId' element={<ItemDetailContainer />} />
        <Route exact path='/about' element={<About />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/custom-cube' element={<CustomCube />} />
        <Route exact path='/check-out' element={cart.length > 0 ? <CheckoutForm /> : <NotFound />} />
        <Route exact path='/order-confirmed/:orderId' element={<OrderConfirmedContainer />} />
        <Route exact path='/stock-error' element={<StockError />} />
        <Route exact path='*' element={<NotFound />} />


        <Route exact path='/sign-in' element={user ? <Home /> : <SignIn />} />
        <Route exact path='/sign-up' element={user ? <Home /> : <SignUp />} />
      </Routes>
      <Footer />
      <ScrollToTop className='flex items-center justify-center p-3 dark:!bg-primary !bg-primary-inverted-hover' color={theme == "light" ? "var(--primary)" : "var(--primary-inverted)"}  smooth />
    </div>
  )
}

export default App;
