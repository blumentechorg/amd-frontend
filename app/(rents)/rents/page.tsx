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

interface Rents {
  sn: number
  propertyId: string
  estate: string
  tenant: string
  rentStatus: string
  rentStartDate: string
  rentEndDate: string
}

export default function Dashboard() {
  const [rents, setRents] = useState<Rents[]>([
    {
      sn: 1,
      propertyId: "DAN-0210",
      estate: "Dantata Estate 1",

      tenant: "Musa Aliyu",
      rentStatus: "Paid",
      rentStartDate: "15 May, 2020 8:00 am",
      rentEndDate: "15 May, 2020 8:00 am",
    },
    {
      sn: 2,
      propertyId: "DAN-0210",
      estate: "Dantata Estate 2",

      tenant: "Zainab Shehu",
      rentStatus: "Overdue",
      rentStartDate: "15 May, 2020 8:00 am",
      rentEndDate: "15 May, 2020 8:00 am",
    },
    {
      sn: 3,
      propertyId: "DAN-0210",
      estate: "Blumen Estate 1",

      tenant: "John Doe",
      rentStatus: "Paid",
      rentStartDate: "15 May, 2020 8:00 am",
      rentEndDate: "15 May, 2020 8:00 am",
    },
    {
      sn: 4,
      propertyId: "DAN-0210",
      estate: "Blumen Estate 1",
      tenant: "John Doe",
      rentStatus: "Paid",
      rentStartDate: "15 May, 2020 8:00 am",
      rentEndDate: "15 May, 2020 8:00 am",
    },
    {
      sn: 5,
      propertyId: "DAN-0210",
      estate: "Blumen Estate 1",
      tenant: "John Doe",
      rentStatus: "Paid",
      rentStartDate: "15 May, 2020 8:00 am",
      rentEndDate: "15 May, 2020 8:00 am",
    },
    {
      sn: 6,
      propertyId: "DAN-0210",
      estate: "Blumen Estate 1",
      tenant: "John Doe",
      rentStatus: "Paid",
      rentStartDate: "15 May, 2020 8:00 am",
      rentEndDate: "15 May, 2020 8:00 am",
    },
    {
      sn: 7,
      propertyId: "DAN-0210",
      estate: "Blumen Estate 1",
      tenant: "John Doe",
      rentStatus: "Paid",
      rentStartDate: "15 May, 2020 8:00 am",
      rentEndDate: "15 May, 2020 8:00 am",
    },
    {
      sn: 8,
      propertyId: "DAN-0210",
      estate: "Blumen Estate 1",
      tenant: "John Doe",
      rentStatus: "Paid",
      rentStartDate: "15 May, 2020 8:00 am",
      rentEndDate: "15 May, 2020 8:00 am",
    },

    // ...other estates
  ])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(8)
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
      { Header: "Property ID", accessor: "propertyId" },
      { Header: "Estate", accessor: "estate" },
      { Header: "Tenant", accessor: "tenant" },
      { Header: "Rent Status", accessor: "rentStatus" },
      { Header: "Rent Start Date", accessor: "rentStartDate" },
      { Header: "Rent End Date", accessor: "rentEndDate" },
    ],
    []
  )

  const filteredEstates = useMemo(
    () =>
      rents.filter(
        (rent) =>
          rent.propertyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rent.tenant.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rent.rentStatus.toString().includes(searchQuery) ||
          rent.rentStartDate.toString().includes(searchQuery.toLowerCase()) ||
          rent.estate.toString().includes(searchQuery.toLowerCase()) ||
          rent.rentEndDate.toString().includes(searchQuery.toLowerCase())
      ),
    [rents, searchQuery]
  )

  const paginatedData = useMemo(
    () => filteredEstates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredEstates, currentPage, itemsPerPage]
  )

  const handleAddEstate = (newRent: Rents) => {
    setRents((prevRents) => [...prevRents, { ...newRent, sn: prevRents.length + 1 }])
  }

  return (
    <div className="flex min-h-screen">
      <section className="flex-1">
        <div className="flex w-full flex-col">
          <DashboardNav />
          <div className="flex">
            <Sidebar />
            <div className="flex w-full gap-6  px-10 max-md:flex-col max-md:pt-6 max-sm:px-0 md:mb-16">
              <div className="w-full ">
                <div className="my-7 flex items-center justify-between max-sm:my-2 max-sm:px-4">
                  <h5 className="text-[28px] font-medium">Rents</h5>
                  <div className="relative"></div>
                  <div className="flex items-center gap-2">
                    <p className="opacity-50">Rents</p>
                    <KeyboardArrowRightIcon className="opacity-50" />
                    <p className="opacity-50">Dashboard</p>
                  </div>
                </div>

                <div className="rounded-lg bg-white py-7">
                  <div className="mb-4 flex items-center justify-between px-6">
                    <div className="flex items-center gap-5">
                      <div className="flex justify-center gap-2 max-sm:hidden">
                        <div className="flex h-10 items-center">
                          <p>Show</p>
                        </div>
                        <input
                          type="number"
                          value={itemsPerPage}
                          onChange={(e) => setItemsPerPage(Number(e.target.value))}
                          className="h-10 w-[50px] rounded-md bg-[#F3F3F3] px-3 py-2 outline-none focus:outline-none"
                          placeholder="Items per page"
                        />
                        <div className="flex h-10 items-center">
                          <p>Entries</p>
                        </div>
                      </div>

                      <div className=" flex items-center">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search..."
                          className="h-[56px] w-[328px] rounded-md bg-[#F3F3F3] px-3 py-2 outline-none focus:outline-none max-md:w-full max-sm:h-10 max-sm:w-[200px]"
                        />
                      </div>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="button-rounded flex items-center gap-2 rounded-md"
                    >
                      <p className="max-sm:hidden">Add new Estate</p>
                      <Image src="DashboardImages/Vector.svg" width={11.88} height={11.88} alt="" />
                    </button>
                  </div>

                  <CustomTable tableType="rent" columns={columns} data={paginatedData} />

                  <CustomPagination
                    totalItems={filteredEstates.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />

                  <AddEstateModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddEstate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
