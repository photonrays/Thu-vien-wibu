import { RouteObject } from "react-router-dom";
import Home from "./page/Home";
import Book from "./page/Book";
import History from "./page/History";
import Search from "./page/Search";
import Setting from "./page/Setting";
import Chapter from "./page/Chapter";
import Follow from "./page/Follow";
import Latest from "./page/Latest";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/truyen-tranh/:id",
    element: <Book />,
  },
  {
    path: "/chuong/:id/",
    element: <Chapter />,
  },
  {
    path: "/lich-su",
    element: <History />,
  },
  {
    path: "/tim-kiem",
    element: <Search />,
  },
  {
    path: "/theo-doi",
    element: <Follow />,
  },
  {
    path: "/cai-dat",
    element: <Setting />,
  },
  {
    path: "/moi-cap-nhat",
    element: <Latest />,
  },
];

export default routes;
