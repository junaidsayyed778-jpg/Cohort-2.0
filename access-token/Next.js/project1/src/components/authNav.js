import Link from "next/link"
import React from "react"

const Navbar = () => {
    return (
        <div>
            <Link href={"/authLayout/login"}>Login</Link>
        </div>
    )
}

export default Navbar