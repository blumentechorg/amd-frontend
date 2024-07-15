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

interface Property {
  sn: number
  propertyId: string
  estate: string
  address: string
  rentStatus: string
  tenantName: string
  type: string
}

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>([
    {
      sn: 1,
      propertyId: "DAN-Q210",
      estate: "Dantata Estate 1",

      address: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      rentStatus: "Occupied",
      tenantName: "John Doe",
      type: "Rent",
    },
    {
      sn: 2,
      propertyId: "DAN-Q211",
      estate: "Dantata Estate 1",

      address: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      rentStatus: "Vacant",
      tenantName: "Nil",
      type: "Rent",
    },
    {
      sn: 3,
      propertyId: "DAN-Q210",
      estate: "Dantata Estate 1",

      address: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      rentStatus: "Occupied",
      tenantName: "John Doe",
      type: "Rent",
    },
    {
      sn: 4,
      propertyId: "DAN-Q210",
      estate: "Dantata Estate 1",

      address: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      rentStatus: "Occupied",
      tenantName: "John Doe",
      type: "Rent",
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
      { Header: "Estate", accessor: "estate" },
      { Header: "Address", accessor: "address" },
      { Header: "Rent Status", accessor: "rentStatus" },
      { Header: "Tenant Name", accessor: "tenantName" },
      { Header: "Type", accessor: "type" },
    ],
    []
  )

  const filteredEstates = useMemo(
    () =>
      properties.filter(
        (property) =>
          property.propertyId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.estate.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.rentStatus.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.tenantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.address.toString().includes(searchQuery.toLowerCase())
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
    <section className="h-full w-full">
      <div className="flex min-h-screen w-full">
        <div className="flex  w-full flex-col">
          <DashboardNav />
          <div className="flex">
            <Sidebar />
            <div className="flex w-full gap-6  px-10 max-md:flex-col max-md:pt-6 max-sm:px-0 md:mb-16">
              <div className="w-full ">
                <div className="my-7 flex items-center justify-between max-sm:my-2 max-sm:px-4">
                  <h5 className="text-[28px] font-medium">Properties</h5>
                  <div className="relative"></div>
                  <div className="flex items-center gap-2">
                    <p className="opacity-50">Properties</p>
                    <KeyboardArrowRightIcon className="opacity-50" />
                    <p className="opacity-50">Dashboard</p>
                  </div>
                </div>

                <div className="mb-4 w-full overflow-hidden rounded-md">
                  <LoadScript googleMapsApiKey="AIzaSyBKHZ5C24eYH-MccKBSniBl3mT5MjBhJYY">
                    <GoogleMap
                      mapContainerStyle={{ height: "350px", width: "100%" }}
                      center={{ lat: 9.060352, lng: 7.4678272 }}
                      zoom={14}
                    >
                      <Marker position={{ lat: 9.060352, lng: 7.4678272 }} />
                    </GoogleMap>
                  </LoadScript>
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
                    <div className="flex items-center gap-10">
                      <div className="relative max-sm:hidden">
                        <div className="flex">
                          <div className="rounded-s-md bg-[#044982] p-2">
                            <p className="text-sm text-white">Sort</p>
                          </div>
                          <div className="flex cursor-pointer gap-2 rounded-r-md bg-[#F7F7F7] p-2">
                            <Image src="/DashboardImages/mdi_sort.svg" width={24} height={24} alt="" />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="button-rounded flex items-center gap-2 rounded-md"
                      >
                        <p className="max-sm:hidden">Add new tenants</p>
                        <Image src="/DashboardImages/Vector.svg" width={11.88} height={11.88} alt="" />
                      </button>
                    </div>
                  </div>

                  <CustomTable tableType="property" columns={columns} data={paginatedData} />

                  <CustomPagination
                    totalItems={filteredEstates.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />

                  <AddTenantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddEstate} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
