import { RiTeamLine } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { GrTransaction } from "react-icons/gr";
import { TbReportAnalytics } from "react-icons/tb";

export const sidebar_data = [
  {
    id: 1,
    title: "Pages",
    list: [
      {
        id: 1,
        title: "Home",
        icon: <MdDashboard />,
        path: "/",
      },
      {
        id: 2,
        title: "View Orders",
        icon: <FaShoppingCart />,
        path: "/dashboard/products/vieworders",
      },
      {
        id: 3,
        title: "Add Product",
        icon: <FaShoppingCart />,
        path: "/dashboard/products/add-product",
      },
      {
        id: 4,
        title: "Products",
        icon: <FaShoppingCart />,
        path: "/dashboard/products/viewproducts",
      },
      {
        id: 5,
        title: "Transaction",
        icon: <GrTransaction />,
        path: "/transactions",
      },
    ],
  },
  
];
