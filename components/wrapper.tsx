"use client"

export default function Wrapper ({children} : {children : React.ReactNode}) {

    return (
        <div className="wrapper">
            {children}
        </div>
    ) 

}