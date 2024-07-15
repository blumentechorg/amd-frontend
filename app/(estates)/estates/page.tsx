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

interface Estate {
  sn: number
  name: string
  location: string
  noOfHouses: number
  percentageOccupied: string
  date: string
}

export default function Dashboard() {
  const [estates, setEstates] = useState<Estate[]>([
    {
      sn: 1,
      name: "Dantata Estate 1",
      location: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      noOfHouses: 200,
      percentageOccupied: "40%",
      date: "15 May, 2020 8:00 am",
    },
    {
      sn: 2,
      name: "Dantata Estate 2",
      location: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      noOfHouses: 200,
      percentageOccupied: "40%",
      date: "15 May, 2020 8:00 am",
    },
    {
      sn: 3,
      name: "Dantata Estate 3",
      location: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      noOfHouses: 200,
      percentageOccupied: "40%",
      date: "15 May, 2020 8:00 am",
    },
    {
      sn: 4,
      name: "Dantata Estate 4",
      location: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      noOfHouses: 200,
      percentageOccupied: "40%",
      date: "15 May, 2020 8:00 am",
    },
    {
      sn: 5,
      name: "Dantata Estate 5",
      location: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      noOfHouses: 200,
      percentageOccupied: "40%",
      date: "15 May, 2020 8:00 am",
    },
    {
      sn: 6,
      name: "Blumen Estate 1",
      location: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      noOfHouses: 200,
      percentageOccupied: "40%",
      date: "15 May, 2020 8:00 am",
    },
    {
      sn: 7,
      name: "AMD Estate 1",
      location: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      noOfHouses: 200,
      percentageOccupied: "40%",
      date: "15 May, 2020 8:00 am",
    },
    {
      sn: 8,
      name: "Squid Estate 1",
      location: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      noOfHouses: 200,
      percentageOccupied: "40%",
      date: "15 May, 2020 8:00 am",
    },
    {
      sn: 9,
      name: "Dantata Estate 1",
      location: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      noOfHouses: 200,
      percentageOccupied: "40%",
      date: "15 May, 2020 8:00 am",
    },
    {
      sn: 10,
      name: "Dantata Estate 1",
      location: "22 Kado Rd, Jabi, Abuja FCT, 23401",
      noOfHouses: 200,
      percentageOccupied: "40%",
      date: "15 May, 2020 8:00 am",
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
      { Header: "Estate Name", accessor: "name" },
      { Header: "Location", accessor: "location" },
      { Header: "No. of Houses", accessor: "noOfHouses" },
      { Header: "% Occupied", accessor: "percentageOccupied" },
      { Header: "Date", accessor: "date" },
    ],
    []
  )

  const filteredEstates = useMemo(
    () =>
      estates.filter(
        (estate) =>
          estate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          estate.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          estate.noOfHouses.toString().includes(searchQuery) ||
          estate.date.toString().includes(searchQuery.toLowerCase())
      ),
    [estates, searchQuery]
  )

  const paginatedData = useMemo(
    () => filteredEstates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredEstates, currentPage, itemsPerPage]
  )

  const handleAddEstate = (newEstate: Estate) => {
    setEstates((prevEstates) => [...prevEstates, { ...newEstate, sn: prevEstates.length + 1 }])
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
                  <h5 className="text-[28px] font-medium">Estates</h5>
                  <div className="relative"></div>
                  <div className="flex items-center gap-2">
                    <p className="opacity-50">Estates</p>
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
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="button-rounded flex items-center gap-2 rounded-md"
                    >
                      <p className="max-sm:hidden">Add new Estate</p>
                      <Image src="DashboardImages/Vector.svg" width={11.88} height={11.88} alt="" />
                    </button>
                  </div>

                  <CustomTable tableType="estate" columns={columns} data={paginatedData} />

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
      </div>
    </section>
  )
}
