"use client"
import Image from "next/image"
import Link from "next/link"
import React, { useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { Skeleton } from "@mui/material"

const DashboardNav = () => {
  const [loading, setLoading] = useState(true)
  setTimeout(() => setLoading(false), 3000)
  const [searchText, setSearchText] = useState("")

  const handleCancelSearch = () => {
    setSearchText("")
  }

  return (
    <>
      <nav className="hidden border-b bg-[#F2F6FD] px-16 py-4 md:block">
        <div className="flexBetween">
          <div className="flex content-center gap-32">
            <Link href="/" className="content-center">
              <Image src="/AuthImages/amd-logo.png" width={150} height={43} alt="dekalo" />
            </Link>

            <div className=" flex h-[45px] w-[380px] items-center justify-between  gap-3 rounded-full bg-[#F3F3F3] px-3 py-1 text-[#707070]">
              <Image src="/DashboardImages/Search.svg" width={16} height={16} alt="dekalo" />
              <input
                type="text"
                id="search"
                placeholder="Search"
                className="h-[50px] w-full bg-transparent  outline-none focus:outline-none"
                style={{ width: "100%", height: "50px" }}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              {searchText && <RxCross2 onClick={handleCancelSearch} style={{ cursor: "pointer" }} />}
            </div>
          </div>

          <div className="">
            <div className="flex content-center items-center justify-center gap-5">
              <Link
                href="/"
                className="flex h-[50px] w-[50px] content-center items-center justify-center rounded-full bg-[#EDF2F7]"
              >
                <Image src="/DashboardImages/fi-sr-bell.svg" width={24} height={24} alt="avatar" />
              </Link>
              <div className="flex h-[50px] items-center justify-center gap-1 rounded-full bg-[#EDF2F7] px-1">
                <Image src="/DashboardImages/User.svg" width={40} height={40} alt="avatar" />
                <p className=" font-regular content-center text-sm">Jhon Doe</p>

                <Image className="mr-4" src="/DashboardImages/dropdown.svg" width={15.68} height={15.68} alt="avatar" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <nav className="block border-b bg-[#F2F6FD] px-16 py-4 max-md:px-3 md:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="content-center">
            <Image src="/AuthImages/amd-logo.png" width={150} height={43} alt="dekalo" />
          </Link>
          <div className="flex h-[50px] items-center justify-center gap-1 rounded-full bg-[#EDF2F7] px-1">
            <Image src="/DashboardImages/User.svg" width={40} height={40} alt="avatar" />

            <Image className="mr-4" src="/DashboardImages/dropdown.svg" width={15.68} height={15.68} alt="avatar" />
          </div>
        </div>
      </nav>
    </>
  )
}

export default DashboardNav
