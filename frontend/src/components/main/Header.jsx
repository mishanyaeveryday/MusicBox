import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import './Main.css';
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Button,
  Typography,
  IconButton,
  Collapse,
  Navbar,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  BellIcon,
  ChatBubbleLeftEllipsisIcon
} from "@heroicons/react/24/solid";

function ProfileMenu({ userName }) {
  return (

    <Button variant="text" color="blue-gray" className="flex items-center w-70 font-thin text-base bg-[#A1C060]" style={{ height: "50px", fontFamily: "Arsenal" }}>
      <Link to={userName == "admin" ? ("/user/profile") : ("/admin") }>
        <Typography className="p-3 text-black" style={{ fontFamily: "Arsenal" }}>
          {userName || "Іван Шевченко"}
        </Typography>
      </Link>
    </Button>
  );
}

const navListItems = [
  { label: "ОСОБИСТІ ДОКУМЕНТИ", path: "/user/mydocs" },
  { label: "ЛІЧИЛЬНИКИ", path: "/user/measurers" },
  { label: "ЗБОРИ", path: "/user/collections" },
  { label: "СУСІДИ", path: "/user/neighbours" },
  { label: "ФІНАНСИ", path: "/user/finances" },
  { label: "ДОВІДКОВА", path: "/FAQ" },
  { label: "ФОНДИ", path: "/user/funds" },
];

const navListItemsUnLog = [
  { label: "ПРАВЛІННЯ", path: "/about" },
  { label: "ЗБОРИ", path: "/user/collections" },
  { label: "КОНТАКТИ", path: "/contacts" },
  { label: "ТАРИФИ", path: "/tariphes" },
];


function LanguageMenu() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("UKR");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <div className="flex items-center gap-4 ">
      <Menu>
        <MenuHandler>
          <Button variant="text" color="blue-gray" className="flex items-center gap-1">
            <span className="text-black text-sm font-bold">{language}</span>
            <ChevronDownIcon className="h-4 w-4 text-black" />
          </Button>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={() => handleLanguageChange("UKR")}>Українська</MenuItem>
          <MenuItem onClick={() => handleLanguageChange("ENG")}>English</MenuItem>
          <MenuItem onClick={() => handleLanguageChange("RUS")}>Русский</MenuItem>
        </MenuList>
      </Menu>
      <IconButton onClick={() => window.open('https://t.me/osbbEnclave', '_blank')} size="sm" color="blue-gray" variant="text">
        <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-gray-900" />
      </IconButton>
      <IconButton onClick={() => navigate("/user/votings/")} size="sm" color="blue-gray" variant="text">
        <BellIcon className="h-5 w-5 fill-current text-gray-900" />
      </IconButton>
    </div>
  );
}

function NavList({ isLoggedIn, handleLoginClick, userName }) {
  return (
    <ul className="flex gap-8 items-center">
      

      {isLoggedIn ? (<>
          {navListItems.slice(0, 3).map(({ label, path }) => (
            <li key={label}>
              <Typography
                color="gray"
                className="text-black text-sm"
              >
              {label == "admin" ? (
              <Link to={"/admin"}>
                {label}
              </Link>
               ) :
               (
                <Link to={path}>
                {label}
              </Link>
               )}</Typography>
            </li>
          ))}
          <ProfileMenu userName={userName} />
          {navListItems.slice(3).map(({ label, path }) => (
            <li key={label}>
              <Typography
                color="gray"
                className="text-black text-sm"
              >
              {userName == "admin" ? (
              <Link to={"/admin"}>
                {label}
              </Link>
               ) :
               (
                <Link to={path}>
                {label}
              </Link>
               )}
              </Typography>
               
            </li>
          ))}
        </>
      ) : (
        <>
          {navListItemsUnLog.slice(0, 2).map(({ label, path }) => (
            <li key={label}>
              <Typography
                color="gray"
                className="text-black text-sm"
              >
              <Link to={path}>
                {label}
              </Link></Typography>
            </li>
          ))}
          <Button
            className="bg-[#504E76] text-white w-60 text-center font-bold text-base"
            size="sm"
            style={{ fontFamily: 'Philosopher' }}
            onClick={handleLoginClick}
          >
            ВХІД В КАБІНЕТ
          </Button>
          {navListItemsUnLog.slice(2).map(({ label, path }) => (
            <li key={label}>
              <Typography
                color="gray"
                className="text-black text-sm"
              >
              <Link to={path}>
                {label}
              </Link></Typography>
            </li>
          ))}</>
      )}
    </ul>
  );
}

export function ComplexNavbar() {
  const [isNavOpen, setIsNavOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const accountId = localStorage.getItem('accountId');
  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur);

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        setIsLoggedIn(false);
        return;
      }
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/auth/check-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.valid) {
          setIsLoggedIn(true);
          const userResponse = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/me/${accountId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          let formattedUsername = "";
          if (localStorage.getItem('role') == "admin")
            {
            formattedUsername = "Admin";
            }
          else
            {
            console.log(userResponse.data.person);
            const { firstname, middlename } = userResponse.data.person;
            formattedUsername = `${firstname} ${middlename}`;
            }
          setUserName(formattedUsername);
        } else {
          localStorage.removeItem("accountId");
          localStorage.removeItem("token");
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkToken();
  }, [token]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <Navbar style={{ maxWidth: "4600px"}}>
      <div className="relative mx-auto flex items-center justify-between text-blue-gray-900">


        <div className="hidden lg:block">
          <NavList isLoggedIn={isLoggedIn} handleLoginClick={handleLoginClick} userName={userName} />
        </div>

        <LanguageMenu />
      </div>

      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList isLoggedIn={isLoggedIn} handleLoginClick={handleLoginClick} />

      </Collapse>
    </Navbar>

  )
}


export default ComplexNavbar;