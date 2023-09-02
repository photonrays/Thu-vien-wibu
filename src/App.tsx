import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';
import DefaultLayout from './DefaultLayout';
import { ThemeProvider } from './context/useHeader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<ThemeProvider><DefaultLayout activePage={"Home"}>{route.element}</DefaultLayout></ThemeProvider>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App
