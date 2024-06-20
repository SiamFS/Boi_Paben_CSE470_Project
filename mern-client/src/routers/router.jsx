import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import App from "../App";
import Home from "../home/home";
import Shop from "../shop/shop";
import About from "../components/about";
import Blog from "../components/Blog";
import Singlebook from "../components/singlebook";

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/shop",
            element: <Shop/>
        },
        {
          path: "/about",
          element: <About/>     
        },
        {
          path: "/blog",
          element: <Blog/>     
        },
        {
          path: "/singlebook",
          element: <Singlebook/>     
        }
      ]
    },
  ]);

  export default router;
