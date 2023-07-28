import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';
import DefaultLayout from './DefaultLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<DefaultLayout activePage={"Home"}>{route.element}</DefaultLayout>}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App
