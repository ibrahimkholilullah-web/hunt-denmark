import { createBrowserRouter } from "react-router-dom";
import Root from "../Components/Root/Root";
import RegisterPage from "../Components/UserCreate/RegisterPage";
import Login from "../Components/UserCreate/Login";
import Home from "../Components/Rout/Home/Home";
import Dashboard from "../Components/Dashboard/Dashboard";
import MyProfile from "../Components/Dashboard/MyProfile";
import AddProduct from "../Components/Dashboard/AddProduct";
import MyProducts from "../Components/Dashboard/MyProducts";
import Allproducts from "../Components/AllProducts/Allproducts";
import ProductsDItails from "../Components/Shared/ProductsDItails";

const router = createBrowserRouter([
    {
      path: "/",
      element:<Root></Root>,
      children:[
        {
          path:'/',
          element: <Home></Home>
        },
        {
          path:'/allProducts',
          element: <Allproducts></Allproducts>
        },
        {
          path:'/ditails/:id',
          element: <ProductsDItails></ProductsDItails>
        }
      ]
    },
    {
      path : "/login",
      element: <Login></Login>
    },
    {
      path:'/register',
      element: <RegisterPage></RegisterPage>
    },
    {
      path:'/dadhboard',
      element: <Dashboard></Dashboard>,
      children:[
        {
          path:'myprofile',
          element:<MyProfile></MyProfile>
        },
        {
          path:'addProducts',
          element:<AddProduct></AddProduct>
        },
        {
          path:'myProducts',
          element: <MyProducts></MyProducts>
        }
      ]
    }
  ]);

  export default router