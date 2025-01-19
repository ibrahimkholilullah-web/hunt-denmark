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
import PrivatedRouter from "../Components/PrivatedRouter/PrivatedRouter";
import UpdatePage from "../Components/Dashboard/UpdatePage";
import ProductReview from "../Components/Dashboard/Modaretor/ProductReview";
import ReportedContents from "../Components/Dashboard/Modaretor/ReportedContents";
import ManageUser from "../Components/Dashboard/Admin/ManageUser";
import Statistics from "../Components/Dashboard/Admin/Statistics";
import ModaretorRout from "../Components/SellerRout/ModaretorRout";
import ManageCoupon from "../Components/Dashboard/Admin/ManageCoupon";
import AboutMe from "../Components/MyAbout/AboutMe";
import MembershipPage from "../Components/Dashboard/Admin/MembershipPage";

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
          element: <Allproducts></Allproducts>,
        },
        {
          path:'/ditails/:id',
          element: <PrivatedRouter><ProductsDItails></ProductsDItails></PrivatedRouter>
        },
        {
          path:'/update/:id',
          element: <PrivatedRouter><UpdatePage></UpdatePage></PrivatedRouter>
        },
        {
          path : "/login",
          element: <Login></Login>
        },
        {
          path: "about",
          element: <AboutMe></AboutMe>
        }
      ]
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
          element:<PrivatedRouter>
            <MyProfile></MyProfile>
            </PrivatedRouter>
        },
        {
          path:'addProducts',
          element:<PrivatedRouter><AddProduct></AddProduct></PrivatedRouter>
        },
        {
          path:'membership',
          element: <MembershipPage></MembershipPage>
        },
        {
          path:'myProducts',
          element: <PrivatedRouter><MyProducts></MyProducts></PrivatedRouter>
        },
         {
          path:'review',
          element: <PrivatedRouter>
            <ModaretorRout>
            <ProductReview></ProductReview>
            </ModaretorRout>
            </PrivatedRouter>
        },
        {
          path:'report',
          element: <PrivatedRouter>
            <ModaretorRout><ReportedContents></ReportedContents></ModaretorRout>
          </PrivatedRouter>
        },
        {
          path:'manageuser',
          element: <PrivatedRouter><ManageUser></ManageUser></PrivatedRouter>
        },
        {
          path:'statistics',
          element: <PrivatedRouter><Statistics></Statistics></PrivatedRouter>
        },
        {
          path:'cupons',
         element: <PrivatedRouter>
          <ManageCoupon></ManageCoupon>
         </PrivatedRouter>
        },
       
      ]
    }
  ]);

  export default router