import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { MdOutlineNotificationsNone } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { RxAvatar } from "react-icons/rx";

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <header className="flex justify-between items-center px-8 bg-black text-white w-full h-20 z-10 font-poppins">
      <nav className="block capitalize text-2xl font-bold">Osazie</nav>

      <button onClick={handleToggle} className="block md:hidden">
        {!toggle ? <AiOutlineMenu size={30} /> : <AiOutlineClose size={30} />}
      </button>
    </header>
  );
};

export default Header;
