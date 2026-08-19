"use client"

import { usePathname } from "next/navigation"

export default function Wrapper ({children} : {children : React.ReactNode}) {

    const pathname = usePathname()

    return (
        <div style={pathname === "/work" ? { padding: "0 0.625rem" } : {}} className="wrapper">
            {children}
        </div>
    ) 

}