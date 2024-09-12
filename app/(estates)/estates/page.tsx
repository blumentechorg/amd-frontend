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
import { format, parseISO } from "date-fns"

interface Estate {
  id?: number
  estate_name: string
  no_of_houses: string
  houses_occupied: string
  houses_vacant: string
  province: string
  lga: string
  state: string
  address: string
  status: boolean
  pub_date?: any
}

export default function Dashboard() {
  const [estates, setEstates] = useState<Estate[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [notification, setNotification] = useState<string | null>(null)

  const formatDate = (dateString: string) => {
    try {
      // Log the incoming date string for debugging
      console.log("Original date string:", dateString)

      // Parse and format the date using date-fns
      const formattedDate = format(parseISO(dateString), "MMMM d, yyyy") // e.g., "September 12, 2024"

      console.log("Formatted date:", formattedDate) // Log the formatted date
      return formattedDate
    } catch (error) {
      console.error("Error formatting date:", error)
      return dateString // Return original string if there's an error
    }
  }

  const columns = useMemo(
    () => [
      { Header: "S/N", accessor: "id" },
      { Header: "Estate Name", accessor: "estate_name" },
      { Header: "Location", accessor: "address" },
      { Header: "No. of Houses", accessor: "no_of_houses" },
      { Header: "% Occupied", accessor: "houses_occupied" },
      {
        Header: "Date",
        accessor: "pub_date",
        Cell: ({ value }: { value: string }) => {
          return formatDate(value)
        },
      },
    ],
    []
  )

  // Filter estates based on the search query
  const filteredEstates = useMemo(
    () =>
      estates.filter(
        (estate) =>
          estate.estate_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          estate.address?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          estate.no_of_houses?.toString().includes(searchQuery) ||
          estate.pub_date?.toString().toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [estates, searchQuery]
  )

  // Apply pagination to the filtered results
  const paginatedData = useMemo(
    () => filteredEstates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredEstates, currentPage, itemsPerPage]
  )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1) // Reset to the first page on search
  }

  const handleAddEstate = (newEstate: Estate) => {
    setEstates((prevEstates) => [...prevEstates, { ...newEstate, sn: prevEstates.length + 1 }])
  }

  const showNotification = (message: string) => {
    setNotification(message)
    setTimeout(() => {
      setNotification(null) // Clear notification after 3 seconds
    }, 3000)
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })

    // Fetch estates from the API
    const fetchEstates = async () => {
      try {
        const response = await fetch("https://amd-backend-1.onrender.com/estate/estate/")
        const data = (await response.json()) as Estate[]
        console.log("Fetched estate data:", data)
        setEstates(data)
      } catch (error) {
        console.error("Error fetching estates:", error)
      }
    }

    fetchEstates()
  }, [])

  return (
    <section className="h-full w-full">
      <div className="flex min-h-screen w-full">
        <div className="flex w-full flex-col">
          <DashboardNav />
          <div className="flex">
            <Sidebar />
            <div className="flex w-full gap-6 px-10 max-md:flex-col max-md:pt-6 max-sm:px-0 md:mb-16">
              <div className="w-full">
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
                  <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
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

                      <div className="flex items-center">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={handleSearchChange}
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

                  {notification && (
                    <div className="animation-fade-in absolute bottom-16 m-5 flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#000000] bg-[#92E3A9] text-[#000000] shadow-[#05420514] md:right-16">
                      <span className="clash-font text-sm text-[#000000]">{notification}</span>
                      <Image src="AuthImages/Star2.svg" width={28.26} height={28.26} alt="dekalo" />
                    </div>
                  )}

                  <CustomPagination
                    totalItems={filteredEstates.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />

                  <AddEstateModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={(newEstate) => {
                      handleAddEstate(newEstate)
                      showNotification("Estate successfully added!") // Show notification
                    }}
                    setNotification={showNotification} // Pass notification handler
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
