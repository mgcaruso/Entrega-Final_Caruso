import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import ThemeProvider from './components/Context/Theme/theme.jsx';
import FiltersProvider from './components/Context/Filters/filters.jsx';
import CartProvider from './components/Context/Cart/cart.jsx';
import UserProvider from './components/Context/User/user.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
  

  <BrowserRouter>
    <UserProvider>
      <FiltersProvider>
        <CartProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CartProvider>
      </FiltersProvider>
    </UserProvider>
  </BrowserRouter>
  ,
)
