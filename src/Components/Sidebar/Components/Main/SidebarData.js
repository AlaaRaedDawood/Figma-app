import React from "react";
// import dashboard from '../../../../Assets/icon/dashboard.svg'
  
export const SidebarData = [
  {
    title: "Dashboard",
    //path: "/about-us",
    // icon: <AiIcons.AiFillHome />,
    imgsrc : "../../../../../Assets/icon/menu/dashboard.svg",
  
    subNav: [
    ],
  },
  {
    title: "Requests",
    // path: "/about-us",
    //icon: <AiIcons.AiFillHome />,
    imgsrc : "../../../../Assets/icon/dashboard.svg",
  
  
    subNav: [
      {
        title: "Pending",
        // path: "/about-us/aim",
        //icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Confirmed",
        // path: "/about-us/vision",
       // icon: <IoIcons.IoIosPaper />,
      },
      {
          title:"All Requests"
      }
    ],
  },
  {
    title: "Users",
    // path: "/about-us",
    //icon: <AiIcons.AiFillHome />,
    imgsrc : "../../../../Assets/icon/dashboard.svg",
  
  
    subNav: [
      {
        title: "Customers",
        // path: "/about-us/aim",
        //icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Admins",
        // path: "/about-us/vision",
        //icon: <IoIcons.IoIosPaper />,
      },
      ,
      {
        title: "Ordering",
        // path: "/about-us/vision",
        //icon: <IoIcons.IoIosPaper />,
      },
      ,
      {
        title: "Warehouse",
        // path: "/about-us/vision",
        //icon: <IoIcons.IoIosPaper />,
      },
      ,
      {
        title: "Accounting",
        // path: "/about-us/vision",
        //icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "Boxes",
    // path: "/about-us",
    //icon: <AiIcons.AiFillHome />,
    imgsrc : "../../../../Assets/icon/dashboard.svg",
  
  
    subNav: [] ,
  },
  {
    title: "Orders",
    // path: "/about-us",
    // icon: <AiIcons.AiFillHome />,
    imgsrc : "../../../../Assets/icon/dashboard.svg",
  
  
    subNav: [
      {
        title: "Pending",
        // path: "/about-us/aim",
        //icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Confirmed",
        // path: "/about-us/vision",
        //icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "All Orders",
        // path: "/about-us/vision",
        //icon: <IoIcons.IoIosPaper />,
      },
    ],
  }
];