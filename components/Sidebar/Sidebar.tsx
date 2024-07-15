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
      className={clsx("sidebar flex h-full flex-col border-0  border-[#424343] max-sm:hidden  ", {
        "w-20": isCollapsed,
        "w-72": !isCollapsed,
      })}
    >
      <div className="mt-6  h-auto space-y-4 border-0 border-red-700">
        <div className=" h-auto space-y-1 border-0 border-primary-700 ">
          <Links isCollapsed={isCollapsed} />
          <div className="mx-4 my-4 flex h-[1px] w-[90%] bg-[#F2F2F2] opacity-5"></div>

          <SecondLinks isCollapsed={isCollapsed} />
        </div>
      </div>
    </div>
  )
}

export default SideBar
