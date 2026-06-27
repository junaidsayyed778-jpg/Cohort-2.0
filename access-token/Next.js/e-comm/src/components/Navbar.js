import Link from "next/link";
import React from "react";
import { ModeToggle } from "./toggleTheme";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-8 py-6">
      <h1 className="text-xl font-bold"><Link href={"/home"}>E-comm</Link></h1>
      <div className="flex gap-4 font-semibold">
        <Link href={"/home"}>Home</Link>
        <Link href={"/products"}>Products</Link>
      </div>
      <div><ModeToggle/></div>
      <div>Login</div>
    </div>
  );
};

export default Navbar;
