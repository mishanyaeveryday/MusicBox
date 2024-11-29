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
import icon from '../assets/images/iconS.png';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BellIcon, ChevronDownIcon, HomeIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";

export function NavbarDark() {
  const [language, setLanguage] = useState("UKR");

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
  };
  return (
    <Navbar
      variant="gradient"
      color="red"
      className="from-red-300 via-pink-500 to-pink-900 px-4 py-3"
      style={{ minWidth: "100%", borderRadius: "0"}}
    >
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-1 md:mx-4">
          <img style={{ width: "3rem" }} src={icon} alt="Логотип" />
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-y-4 text-white">
          <div className="flex gap-1 md:mr-4">
            <IconButton variant="text" color="white">
              <HomeIcon className="h-8 w-8" />
            </IconButton>
          </div>
          <div className="relative flex w-full gap-2 md:w-max">
            <Input
              type="search"
              color="white"
              label="Что хочешь включить?"
              className="pr-20"
              containerProps={{
                className: "min-w-[288px]",
              }}
            />
            <IconButton variant="text" color="white" className="!absolute right-1 rounded">
              <MagnifyingGlassIcon className="h-4 w-4" />
            </IconButton>
          </div>
          <div className="flex gap-1 md:ml-4">
            <Badge content="" color="teal">
              <IconButton variant="text" color="white">
                <BellIcon className="h-8 w-8" />
              </IconButton>
            </Badge>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-y-4 text-white">
          <div className="flex gap-1 md:mx-4">
            <IconButton variant="text" color="white">
              <UserIcon className="h-8 w-8" />
            </IconButton>
          </div>
          <Menu>
            <MenuHandler>
              <Button variant="text" color="blue-gray" className="flex items-center gap-1">
                <span className="text-white text-sm font-bold">{language}</span>
                <ChevronDownIcon className="h-4 w-4 text-white" />
              </Button>
            </MenuHandler>
            <MenuList>
              <MenuItem onClick={() => handleLanguageChange("ENG")}>English</MenuItem>
              <MenuItem onClick={() => handleLanguageChange("POL")}>Polski</MenuItem>
              <MenuItem onClick={() => handleLanguageChange("RUS")}>Русский</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </div>
    </Navbar>

  );
}
export default NavbarDark;