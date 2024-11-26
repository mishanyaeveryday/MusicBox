import {
  Navbar,
  Typography,
  IconButton,
  Badge,
  Input,
} from "@material-tailwind/react";
import icon from '../assets/images/iconSmall.png';
import { Link } from "react-router-dom";
import { BellIcon, Cog6ToothIcon, HomeIcon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/solid";

export function NavbarDark() {
  return (
    <Navbar
      variant="gradient"
      color="blue-gray"
      className="from-gray-900 via-black to-gray-800 px-4 py-3"
      style={{ minWidth: "100%", borderRadius: "0" }}
    >
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center gap-1 md:mx-4">
          <img style={{ width: "2rem" }} src={icon} alt="Логотип" />
        </Link>

        <div className="flex flex-wrap items-center justify-center gap-y-4 text-white">
          <div className="flex gap-1 md:mr-4">
            <IconButton variant="text" color="white">
              <HomeIcon className="h-6 w-6" />
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
            <Badge content="" color="purple">
              <IconButton variant="text" color="white">
                <BellIcon className="h-6 w-6" />
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
        </div>
      </div>
    </Navbar>

  );
}
export default NavbarDark;