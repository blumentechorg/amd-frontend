"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import AOS from "aos"
import "aos/dist/aos.css"
import Sidebar from "components/Sidebar/Sidebar"
import { PowerUtility } from "utils"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import AddEstateModal from "components/Modals/AddEstateModal"
import CustomPagination from "components/Pagination/CustomPagination"
import CustomTable from "components/Tables/EstateTable"
import EditPowerChargeModal from "components/Modals/EditPowerChargeModal"

interface PaymentAccount {
  id: number
  name: string
  balance: string
  status: string
}

interface Staff {
  username: string
}

const getStatusColor = (status: string): string => {
  switch (status) {
    case "income":
      return "text-[#179402]"
    case "expense":
      return "text-[#FF6A5A]"
    default:
      return "text-[#EEC202]"
  }
}

const getBgColor = (status: string): string => {
  switch (status) {
    case "income":
      return "bg-[#179402]"
    case "expense":
      return "bg-[#FF6A5A]"
    default:
      return "bg-[#EEC202]"
  }
}

interface Rents {
  sn: number
  utility: string
  tenant: string
  propertyId: string
  rentStatus: string
  rentStartDate: string
  quantity: string
  amount: string
}

export default function Water() {
  const [rents, setRents] = useState<Rents[]>([
    {
      sn: 1,

      utility: "Power",

      tenant: "Musa Aliyu",
      propertyId: "DAN-0210",
      rentStatus: "Success",
      rentStartDate: "15 May, 2020 8:00 am",
      amount: "$500,000 ",
      quantity: "25 UNITS",
    },
    {
      sn: 2,

      utility: "Power",
      tenant: "Zainab Shehu",
      propertyId: "DAN-0210",
      rentStatus: "Failed",
      rentStartDate: "15 May, 2020 8:00 am",
      amount: "$100 ",
      quantity: "25 UNITS",
    },
    {
      sn: 3,

      utility: "Power",

      tenant: "John Doe",
      propertyId: "DAN-0210",
      rentStatus: "Success",
      rentStartDate: "15 May, 2020 8:00 am",
      amount: "$100,000 ",
      quantity: "25 UNITS",
    },
    {
      sn: 4,

      utility: "Power",
      tenant: "John Doe",
      propertyId: "DAN-0210",
      rentStatus: "Success",
      rentStartDate: "15 May, 2020 8:00 am",
      amount: "$200,000 ",
      quantity: "25 UNITS",
    },
    {
      sn: 5,

      utility: "Power",
      tenant: "John Doe",
      propertyId: "DAN-0210",
      rentStatus: "Success",
      rentStartDate: "15 May, 2020 8:00 am",
      amount: "$100,000 ",
      quantity: "25 UNITS",
    },
    {
      sn: 6,

      utility: "Power",
      tenant: "John Doe",
      propertyId: "DAN-0210",
      rentStatus: "Success",
      rentStartDate: "15 May, 2020 8:00 am",
      amount: "$500 ",
      quantity: "25 UNITS",
    },
    {
      sn: 7,

      utility: "Power",
      tenant: "John Doe",
      propertyId: "DAN-0210",
      rentStatus: "Success",
      rentStartDate: "15 May, 2020 8:00 am",
      amount: "$100,000 ",
      quantity: "25 UNITS",
    },
    {
      sn: 8,

      utility: "Power",
      tenant: "John Doe",
      propertyId: "DAN-0210",
      rentStatus: "Success",
      rentStartDate: "15 May, 2020 8:00 am",
      amount: "$200,000 ",
      quantity: "25 UNITS",
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
      { Header: "Tenant", accessor: "tenant" },
      { Header: "Property ID", accessor: "propertyId" },
      { Header: "Utility Type", accessor: "utility" },
      { Header: "Amount", accessor: "amount" },
      { Header: "Status", accessor: "rentStatus" },
      { Header: "Quantity", accessor: "quantity" },
      { Header: "Date", accessor: "rentStartDate" },
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
          rent.rentStartDate.toString().includes(searchQuery.toLowerCase())
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

            <div className="flex w-full gap-6 max-md:flex-col max-md:px-4 max-md:pt-6 md:mb-16 ">
              <div className="w-full px-10">
                <div className="my-7 flex items-center justify-between">
                  <h5 className="text-[28px] font-medium">Water</h5>
                  <div className="flex items-center gap-2 ">
                    <p className="opacity-50">Utilities </p>
                    <KeyboardArrowRightIcon className="opacity-50" />
                    <p className="opacity-50">Dashboard</p>
                  </div>
                </div>
                <div className="flex w-full gap-3">
                  {PowerUtility.map((account: PaymentAccount, index: number) => (
                    <div key={account.id} className="flex w-full cursor-pointer gap-2">
                      <div
                        className={`small-card rounded-md p-2 transition duration-500 hover:border-none hover:shadow-xl md:border ${
                          index === 0 ? "border-none shadow-2xl" : ""
                        }`}
                      >
                        <div className="mb-[19px] flex items-start justify-between">
                          <div className="mb-4">
                            <h5 className="font-semibold text-[#044982]">{account.name}</h5>
                          </div>
                          <Image src="/Icons/Graph-blue.svg" width={24} height={24} alt="" />
                        </div>
                        <div className="flex items-end justify-between">
                          <div>
                            <h5 className={`text-xl font-bold ${getStatusColor(account.status)}`}>{account.balance}</h5>
                          </div>
                        </div>
                        <div className="my-5 h-[1px] w-full bg-black opacity-5"></div>
                        <div className="flex items-center gap-4">
                          <div
                            className={`flex w-[72px] items-center justify-center rounded-md px-1 py-1 ${getBgColor(
                              account.status
                            )}`}
                          >
                            {account.status === "income" ? (
                              <ArrowDropUpIcon className="text-white" />
                            ) : (
                              <ArrowDropDownIcon className="text-white" />
                            )}
                            <p className="text-base font-medium text-white">2.4%</p>
                          </div>
                          <p className="text-[#707070]">From previous period</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Add the chart component here */}

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
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="button-rounded flex items-center gap-2 rounded-md"
                    >
                      Change Charges
                      <Image src="/DashboardImages/settings.svg" width={24} height={24} alt="" />
                    </button>
                  </div>

                  <CustomTable tableType="rent" columns={columns} data={paginatedData} />

                  <CustomPagination
                    totalItems={filteredEstates.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                  />

                  <EditPowerChargeModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleAddEstate}
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
