import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";
import CreatePurchaseOrderForm from "./views/CreatePurchaseOrderForm";

const routes = [
  {
    name: "Home",
    path: "/",
    element: <Home />,
  },
  {
    name: "Login",
    path: "/login",
    element: <Login />,
  },
  {
    name: "Register",
    path: "/register",
    element: <Register />,
  },
  {
    name: "CreatePurchaseOrder",
    path: "/createpurchaseorder",
    element: <CreatePurchaseOrderForm />,
  },
];

export default routes;