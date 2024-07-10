// import React from "react"

// const Sidebar = () => {
//   return <div className="h-auto w-[274px] bg-[#044982] px-16">Sidebar</div>
// }

// export default Sidebar

"use client"
import Link from "next/link"
import React, { useState } from "react"
import { Links, SecondLinks } from "./Links"

import clsx from "clsx"

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div
      onMouseEnter={() => setIsCollapsed(false)}
      onMouseLeave={() => setIsCollapsed(true)}
      className={clsx("sidebar flex h-full flex-col justify-between border-0 border-[#424343]  ", {
        "w-20": isCollapsed,
        "w-72": !isCollapsed,
      })}
    >
      <div className="h-full  justify-between border-0 border-red-700 lg:mt-6 lg:h-auto lg:space-y-4">
        <div className="h-full border-0 border-primary-700 lg:h-auto lg:space-y-1 ">
          <Links isCollapsed={isCollapsed} />
        </div>

        <div className="mx-4 flex h-[1px] w-[90%] bg-[#F2F2F2] opacity-5"></div>

        <div className=" border-0 border-primary-700  lg:space-y-1 ">
          <SecondLinks isCollapsed={isCollapsed} />
        </div>
      </div>
    </div>
  )
}

export default SideBar
