"use client"
import { useEffect, useMemo, useState } from "react"
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"
import AOS from "aos"
import "aos/dist/aos.css"
import DashboardNav from "components/Navbar/DashboardNav"
import Sidebar from "components/Sidebar/Sidebar"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import CustomPagination from "components/Pagination/CustomPagination"
import CustomTable from "components/Tables/EstateTable"

import Image from "next/image"
import AddEstateModal from "components/Modals/AddEstateModal"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import AddTenantModal from "components/Modals/AddTenantModal"
import { Maintenance } from "../../../utils/index"

interface Property {
  sn: number
  visitor: string
  token: string
  house: string
  date: string
}

export default function ServiceCharge() {
  const [properties, setProperties] = useState<Property[]>([
    {
      sn: 1,
      visitor: "John Doe",
      token: "GHARSGETDU128H",
      house: "House 024",
      date: "27 May, 2024  09:30am",
    },
    {
      sn: 2,
      visitor: "John Doe",
      token: "GHARSGETDU128H",
      house: "House 024",
      date: "27 May, 2024  09:30am",
    },
    {
      sn: 3,
      visitor: "John Doe",
      token: "GHARSGETDU128H",
      house: "House 024",
      date: "27 May, 2024  09:30am",
    },
    {
      sn: 4,
      visitor: "John Doe",
      token: "GHARSGETDU128H",
      house: "House 024",
      date: "27 May, 2024  09:30am",
    },

    // ...other estates
  ])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const columns = useMemo(
    () => [
      { Header: "S/N", accessor: "sn" },
      { Header: "Visitor Name", accessor: "visitor" },
      { Header: "Token", accessor: "token" },
      { Header: "House No.", accessor: "house" },
      { Header: "Date", accessor: "date" },
    ],
    []
  )

  const filteredEstates = useMemo(
    () =>
      properties.filter(
        (property) =>
          property.visitor.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.house.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.date.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [properties, searchQuery]
  )

  const paginatedData = useMemo(
    () => filteredEstates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredEstates, currentPage, itemsPerPage]
  )

  const handleAddEstate = (newProperty: Property) => {
    setProperties((prevProperty) => [...prevProperty, { ...newProperty, sn: prevProperty.length + 1 }])
  }

  return (
    <div className="flex min-h-screen">
      <section className="flex-1">
        <div className="flex w-full flex-col">
          <DashboardNav />
          <div className="flex">
            <Sidebar />
            <div className="flex w-full gap-6  px-10 max-md:flex-col max-md:px-4 max-md:pt-6 md:mb-16">
              <div className="w-full ">
                <div className="my-7 flex items-center justify-between">
                  <h5 className="text-[28px] font-medium">Maintenance Status</h5>
                  <div className="relative"></div>
                  <div className="flex items-center gap-2">
                    <p className="opacity-50">Maintenance Status</p>
                    <KeyboardArrowRightIcon className="opacity-50" />
                    <p className="opacity-50">Dashboard</p>
                  </div>
                </div>

                <div className="rounded-lg bg-white  py-7">
                  <div className="flex w-full gap-1 px-7 pb-5">
                    <div className="flex h-14 w-[188px] items-center border border-[#ECECEC] bg-[#2D9DFD0D] pl-2 font-medium">
                      1
                    </div>
                    <div className="flex h-14 w-full items-center border border-[#ECECEC] bg-[#2D9DFD0D] pl-2 font-medium">
                      Musa Umar
                    </div>
                    <div className="flex h-14 w-full items-center border border-[#ECECEC] bg-[#2D9DFD0D] pl-2 font-medium">
                      GHARSGETDU128H
                    </div>
                    <div className="flex h-14 w-full items-center border border-[#ECECEC] bg-[#2D9DFD0D] pl-2 font-medium">
                      House 024
                    </div>
                    <div className="flex h-14 w-full items-center border border-[#ECECEC] bg-[#2D9DFD0D] pl-2 font-medium">
                      27 May, 2024 09:30am
                    </div>
                    <button className="flex h-14 w-full items-center justify-center border border-[#ECECEC] bg-[#044982] pl-2 font-medium text-white">
                      Grant Access
                    </button>
                  </div>

                  <CustomTable tableType="service" columns={columns} data={paginatedData} />

                  <CustomPagination
                    totalItems={filteredEstates.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
