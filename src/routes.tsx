import { RouteObject } from 'react-router-dom'
import Home from './page/Home';
import Book from './page/Book';
import Bookmark from './page/Bookmark';
import History from './page/History';
import Search from './page/Search';
import Setting from './page/Setting';
import Test from '@/page/Test'
import Chapter from './page/Chapter';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/truyen-tranh/:id',
        element: <Book />,
    },
    {
        path: '/chuong/:id/:page',
        element: <Chapter />,
    },
    {
        path: '/theo-doi',
        element: <Bookmark />,
    },
    {
        path: '/lich-su',
        element: <History />,
    },
    {
        path: '/tim-kiem',
        element: <Search />,
    },
    {
        path: '/cai-dat',
        element: <Setting />,
    },
    {
        path: '/test',
        element: <Test />
    }
];

export default routes;