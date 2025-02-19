import {
  Navbar,
  Menu,
  MenuList,
  MenuItem,
  MenuHandler,
  Button,
  IconButton,
  Badge,
  Input,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import icon from '../assets/images/icon.png';
import admin from '../assets/images/admin-panel.png';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { BellIcon, ChevronDownIcon, HomeIcon, MagnifyingGlassIcon, UserIcon, WrenchIcon, WrenchScrewdriverIcon } from "@heroicons/react/24/solid";

export function NavbarDark() {
  const [language, setLanguage] = useState("ENG");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    const checkToken = async () => {
      if (!token) {
        console.log("token");
        setIsLoggedIn(false);
        return;
      }

      try {
        const isTokenValid = await validateToken(token);
        if (!isTokenValid) {
          console.log("valid");
          handleLogout();
          return;
        }

        const userResponse = await fetchUserData(userId, token);
        if (userResponse && userResponse.data) {
          setIsLoggedIn(true);
          setUserPhoto(userResponse.data.avatar || "/images/default_avatar.png");
          setIsAdmin(userResponse.data.is_superuser);
        }
      } catch (error) {
        console.error("Error during token validation or user fetching:", error);
        handleLogout();
      }
    };

    checkToken();
  }, [token]);

  const validateToken = async (token) => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}core/token/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.valid;
  };

  const fetchUserData = async (userId, token) => {
    return axios.get(`${import.meta.env.VITE_BACKEND_URL}core/users/${userId}/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserPhoto("");
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/findAComposition/${searchQuery}`);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };

  return (
    <Navbar
      variant="filled"
      color="red"
      className="bg-[#FF7F50] px-4 py-3"
      style={{ minWidth: "100%", borderRadius: "0" }}
    >
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-1 md:mx-4">
          <img style={{ width: "3rem" }} src={icon} alt="Logo" />
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-y-4 text-white">
          <div className="flex gap-1 md:mr-4">
            <IconButton onClick={() => navigate("/")} variant="text" color="white">
              <HomeIcon className="h-8 w-8" />
            </IconButton>
          </div>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              color="white"
              label="What you want to listen?"
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton
              variant="text"
              color="white"
              className="!absolute right-1 rounded"
              onClick={handleSearch}
            >
              <MagnifyingGlassIcon className="h-4 w-4" />
            </IconButton>
          </div>
          <div className="flex gap-1 md:ml-4">
            <IconButton onClick={() => {
              if (isLoggedIn) {
                navigate("/user/notifications");
              } else {
                navigate("/login");
              }
            }} variant="text" color="white">
              <BellIcon className="h-8 w-8" />
            </IconButton>
            {isAdmin && (
              <IconButton
                onClick={() => window.location.href = "http://127.0.0.1:8000/admin/"}
                variant="text" color="white"
              >
                <WrenchScrewdriverIcon className="h-8 w-8" />
              </IconButton>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-y-4 text-white">

          <div className="flex gap-1 md:mx-1">
            {isLoggedIn ? (
              <img
                src={`http://127.0.0.1:8000/${userPhoto}` || "/images/default_avatar.png"}
                alt="User"
                className="h-8 w-8 rounded-full cursor-pointer"
                onClick={() => navigate("/user")}
              />
            ) : (
              <IconButton onClick={() => navigate("/login")} variant="text" color="white">
                <UserIcon className="h-8 w-8" />
              </IconButton>
            )}
          </div>


          <Menu>
            <MenuHandler>
              <Button variant="text" color="blue-gray" className="flex items-center gap-1">
                <span className="text-white text-sm">{language}</span>
                <ChevronDownIcon className="h-4 w-4 text-white" />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={() => handleLanguageChange("ENG")}>English</MenuItem>
              <MenuItem onClick={() => handleLanguageChange("POL")}>Polski</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar >
  );
}

export default NavbarDark;
