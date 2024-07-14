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
  propertyId: string
  description: string
  dateSubmitted: string
  status: string
  paymentStatus: string
  type: string
}

export default function ServiceCharge() {
  const [properties, setProperties] = useState<Property[]>([
    {
      sn: 1,
      propertyId: "DAN-Q210",
      description: "My fridge stop been Cold...",

      dateSubmitted: "23rd May, 2023",
      status: "In progress",
      paymentStatus: "Not Paid",
      type: "Appliance Repair",
    },
    {
      sn: 2,
      propertyId: "DAN-Q211",
      description: "My fridge stop been Cold...",

      dateSubmitted: "23rd May, 2023",
      status: "In progress",
      paymentStatus: "Not Paid",
      type: "Repair",
    },
    {
      sn: 3,
      propertyId: "DAN-Q210",
      description: "My fridge stop been Cold...",

      dateSubmitted: "23rd May, 2023",
      status: "In progress",
      paymentStatus: "Not Paid",
      type: "Repair",
    },
    {
      sn: 4,
      propertyId: "DAN-Q210",
      description: "My fridge stop been Cold...",

      dateSubmitted: "23rd May, 2023",
      status: "In progress",
      paymentStatus: "Not Paid",
      type: "Repair",
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
      { Header: "Property ID", accessor: "propertyId" },
      { Header: "Type", accessor: "type" },
      { Header: "Description", accessor: "description" },
      { Header: "Date Submitted", accessor: "dateSubmitted" },
      { Header: "Status", accessor: "status" },
      { Header: "Payment Status", accessor: "paymentStatus" },
    ],
    []
  )

  const filteredEstates = useMemo(
    () =>
      properties.filter(
        (property) =>
          property.propertyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.dateSubmitted.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.paymentStatus.toString().includes(searchQuery.toLowerCase())
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

                <div className="rounded-lg bg-white py-7">
                  <div className="mb-4 flex items-center justify-between px-6">
                    <div className="flex items-center gap-5">
                      <div className="flex justify-center gap-2">
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
                    </div>
                    <div className="flex items-center gap-10">
                      <div className="relative">
                        <div className="flex">
                          <div className="rounded-s-md bg-[#044982] p-2">
                            <p className="text-sm text-white">Sort</p>
                          </div>
                          <div className="flex cursor-pointer gap-2 rounded-r-md bg-[#F7F7F7] p-2">
                            <Image src="/DashboardImages/mdi_sort.svg" width={24} height={24} alt="" />
                          </div>
                        </div>
                      </div>
                      <div className=" flex items-center">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder="Search..."
                          className="h-[56px] w-[328px] rounded-md bg-[#F3F3F3] px-3 py-2 outline-none focus:outline-none"
                        />
                      </div>
                    </div>
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
