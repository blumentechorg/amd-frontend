"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import SideBar from "components/Sidebar/Sidebar"
import { useEffect, useMemo, useState } from "react"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import Image from "next/image"
import { useRouter } from "next/navigation"
import CustomTable from "components/Tables/EstateTable"
import CustomPagination from "components/Pagination/CustomPagination"
import AddTenantModal from "components/Modals/AddTenantModal"

interface Property {
  sn: number
  propertyId: string
  activity: string
  amount: string
  status: string
  quantity: string
  date: string
  estate: string
  address: string
  rentStatus: string
  tenantName: string
  type: string
}

interface PropertyProps {
  params: { propertyId: string }
}

const properties: Property[] = [
  {
    sn: 1,
    propertyId: "DAN-Q210",
    estate: "Dantata Estate 1",

    address: "22 Kado Rd, Jabi, Abuja FCT, 23401",
    rentStatus: "Occupied",
    tenantName: "John Doe",
    type: "Rent",
    activity: "Rent",
    amount: "NGN 500,000",
    status: "Success",
    quantity: "1 Year",
    date: "26 May, 2023",
  },
  {
    sn: 2,
    estate: "Dantata Estate 1",

    address: "22 Kado Rd, Jabi, Abuja FCT, 23401",
    rentStatus: "Vacant",
    tenantName: "Nil",
    type: "Rent",
    propertyId: "DAN-Q211",
    activity: "Power",
    amount: "NGN 100",
    status: "Failed",
    quantity: "1 Year",
    date: "26 May, 2023",
  },
  {
    sn: 3,
    estate: "Dantata Estate 1",

    address: "22 Kado Rd, Jabi, Abuja FCT, 23401",
    rentStatus: "Vacant",
    tenantName: "Nil",
    type: "Rent",
    propertyId: "DAN-Q212",
    activity: "Water",
    amount: "NGN 100,900",
    status: "Success",
    quantity: "1 Year",
    date: "26 May, 2023",
  },
  {
    sn: 4,
    estate: "Dantata Estate 1",

    address: "22 Kado Rd, Jabi, Abuja FCT, 23401",
    rentStatus: "Vacant",
    tenantName: "Nil",
    type: "Rent",
    propertyId: "DAN-Q213",
    activity: "Service Charge",
    amount: "NGN 200,000",
    status: "Success",
    quantity: "1 Year",
    date: "26 May, 2023",
  },
]

const PropertyDetails = ({ params }: PropertyProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(4)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()
  const { propertyId } = params

  const handleGoBack = () => {
    router.back()
  }

  const columns = useMemo(
    () => [
      { Header: "S/N", accessor: "sn" },
      { Header: "Activity type", accessor: "activity" },
      { Header: "Amount", accessor: "amount" },

      { Header: "Status", accessor: "status" },
      { Header: "Quantity", accessor: "quantity" },
      { Header: "Date", accessor: "date" },
    ],
    []
  )

  const filteredEstates = useMemo(
    () =>
      properties.filter(
        (property) =>
          property.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.amount.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.quantity.toLowerCase().includes(searchQuery.toLowerCase()) ||
          property.date.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [properties, searchQuery]
  )

  const paginatedData = useMemo(
    () => filteredEstates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
    [filteredEstates, currentPage, itemsPerPage]
  )

  const [property, setProperty] = useState<Property | null>(null)

  useEffect(() => {
    if (propertyId) {
      // Find the property from the local data array
      const propertyData = properties.find((prop) => prop.propertyId === propertyId)
      setProperty(propertyData || null)
    }
  }, [propertyId])

  if (!property) return <div>Loading...</div>

  return (
    <section className="h-full w-full">
      <div className="flex min-h-screen w-full">
        <div className="flex  w-full flex-col">
          <DashboardNav />
          <div className="flex">
            <SideBar />
            <div className="flex w-full gap-6  px-10 max-md:flex-col max-md:pt-2 max-sm:px-0 md:mb-16">
              <div className="w-full ">
                <div className="my-7 flex items-center justify-between max-sm:my-3 max-sm:px-4">
                  <button onClick={handleGoBack} className="redirect flex items-center gap-3">
                    <Image src="/Icons/Arrow.svg" width={24} height={24} alt="" />
                    <p className="text-sm font-medium capitalize">Back</p>
                  </button>
                  <div className="relative"></div>
                  <div className="flex items-center gap-2">
                    <p className="opacity-50">Properties</p>
                    <KeyboardArrowRightIcon className="opacity-50" />
                    <p className="opacity-50">Dashboard</p>
                  </div>
                </div>
                <div className="flex justify-between  max-sm:my-3 max-sm:flex-col max-sm:px-4">
                  <div className="flex items-center gap-2 max-sm:mb-3">
                    <Image
                      className=" max-sm:h-10 max-sm:w-10"
                      src="/Icons/UserIcon.svg"
                      width={100}
                      height={100}
                      alt=""
                    />
                    <div>
                      <p className="text-base font-medium text-[#000000] opacity-80 max-sm:text-xs lg:mb-2">
                        {property.propertyId}
                      </p>
                      <p className="text-lg font-medium text-[#0E0F11] max-sm:text-sm">MR. {property.tenantName}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="rounded-lg bg-white px-10 py-5 max-sm:p-4">
                      <p className="text-center text-lg font-medium text-[#044982] max-sm:text-xs">Rent Status</p>
                      <p className="text-center text-[22px] font-bold text-[#179402] max-sm:text-xs">
                        {property.rentStatus}
                      </p>
                    </div>
                    <div className="rounded-lg bg-white px-10 py-5 max-sm:p-4">
                      <div className="flex gap-10">
                        <p className="text-center text-lg font-medium text-[#494C50] max-sm:text-xs">
                          Lease Start Date:
                        </p>
                        <p className="text-center text-lg font-medium text-[#179402] max-sm:text-xs">
                          27th October,2023
                        </p>
                      </div>
                      <div className="flex justify-between gap-10">
                        <p className="text-center text-lg font-medium text-[#494C50] max-sm:text-xs">Lease End Date:</p>
                        <p className="text-center text-lg font-medium text-[#FF002E] max-sm:text-xs">
                          27th October,2024
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-7 rounded-lg bg-white py-7">
                  <div className="mb-4 flex items-center justify-between px-6">
                    <div className="flex items-center gap-5">
                      <p className="text-lg font-medium text-black">Activity</p>
                    </div>
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
                  </div>

                  <CustomTable tableType="property" columns={columns} data={paginatedData} />

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
      </div>
    </section>
  )
}

export default PropertyDetails
