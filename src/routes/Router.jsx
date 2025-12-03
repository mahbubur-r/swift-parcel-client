import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import Coverage from "../pages/Coverage/Coverage";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import PrivateRoutes from "./PrivateRoutes";
import Rider from "../pages/Rider/Rider";
import SendParcel from "../pages/SendParcel/SendParcel";
import DashboardLayout from "../layouts/DashboardLayout";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import Payments from "../pages/Dashboard/Payment/Payments";
import PaymentSuccess from "../pages/Dashboard/Payment/PaymentSuccess";
import PaymentCancelled from "../pages/Dashboard/Payment/PaymentCancelled";
import PaymentHistory from "../pages/Dashboard/PaymentHistory/PaymentHistory";
import ApproveRiders from "../pages/Dashboard/ApproveRiders/ApproveRiders";
import UsersManagement from "../pages/Dashboard/UsersManagement/UsersManagement";
import AdminRoute from "./AdminRoute";
import AssignRiders from "../pages/Dashboard/AssignRiders/AssignRiders";
import AssignedDeliveries from "../pages/Dashboard/AssignedDeliveries/AssignedDeliveries";
import CompletedDeliveries from "../pages/Dashboard/CompletedDeliveries/CompletedDeliveries";
import RiderRoutes from "./RiderRoutes";
import ParcelTrack from "../pages/ParcelTrack/ParcelTrack";


export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/rider',
        element: <PrivateRoutes><Rider></Rider></PrivateRoutes>,
        loader: () => fetch('/serviceCenters.json').then(res => res.json())
      },
      {
        path: '/send-parcel',
        element: <PrivateRoutes><SendParcel></SendParcel></PrivateRoutes>,
        loader: () => fetch('/serviceCenters.json').then(res => res.json())
      },
      {
        path: '/coverage',
        Component: Coverage,
        loader: () => fetch('/serviceCenters.json').then(res => res.json())
      },
      {
        path:'/dashboard/my-parcels/parcel-track/:trackingId',
        Component: ParcelTrack
      },


    ]
  },
  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'register',
        Component: Register,
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoutes><DashboardLayout></DashboardLayout></PrivateRoutes>,
    children: [
      {
        path: 'my-parcels',
        Component: MyParcels
      },
      {
        path: 'payment/:parcelID',
        Component: Payments
      },
      {
        path: 'payment-history',
        Component: PaymentHistory
      },
      {
        path: 'payment-success',
        Component: PaymentSuccess
      },
      {
        path: 'payment-cancelled',
        Component: PaymentCancelled
      },
      


      // riders only routes
      {
        path: 'assigned-deliveries',
        element: <RiderRoutes><AssignedDeliveries></AssignedDeliveries></RiderRoutes>,
      },
      {
        path: 'completed-deliveries',
        element: <RiderRoutes><CompletedDeliveries></CompletedDeliveries></RiderRoutes>,
      },
      {
        path: 'approve-riders',
        element: <AdminRoute><ApproveRiders></ApproveRiders></AdminRoute>,
        // Component: ApproveRiders
      },
      {
        path: 'assign-riders',
        element: <AdminRoute><AssignRiders></AssignRiders></AdminRoute>
      },
      {
        path: 'users-management',
        element: <AdminRoute><UsersManagement></UsersManagement></AdminRoute>,
        // Component: UsersManagement
      }
    ]
  }
]);