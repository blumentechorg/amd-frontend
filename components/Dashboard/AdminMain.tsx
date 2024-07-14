import React, { useEffect, useMemo, useState } from "react"
import { Accounts, Maintenance, Occupancy } from "utils"
import Image from "next/image"
import { useRouter } from "next/navigation"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp"
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight"
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"
import AOS from "aos"
import "aos/dist/aos.css"
import CustomTable from "components/Tables/EstateTable"
import CustomPagination from "components/Pagination/CustomPagination"
import AddEstateModal from "components/Modals/AddEstateModal"
import AddAdminModal from "components/Modals/AddAdminModal"
import AddRoleModal from "components/Modals/AddRoleModal"

interface PaymentAccount {
  id: number
  name: string
  balance: string
  status: string
}

interface Deposit {
  id: number
  name: string
  rate: string
  account_balance: string
  interest: string
  date: string
}

interface Credit {
  id: number
  name: string
  rate: string
  account_balance: string
  interest: string
  date: string
}

interface Admin {
  sn: number
  name: string
  email: string
  role: string
  date: string
}

interface Role {
  sn: number
  name: string
  date: string
}

const AdminMain: React.FC = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<string>("admin")
  const [dropdownVisible, setDropdownVisible] = useState<boolean>(false)
  const [selectedValue, setSelectedValue] = useState<string>("All")

  const renderAdmin = () => {
    const [admins, setAdmins] = useState<Admin[]>([
      {
        sn: 1,
        name: "John Doe",
        email: "Johndoe@gmail.com",
        role: "Superadmin",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 2,
        name: "John Doe",
        email: "Johndoe@gmail.com",
        role: "Technician",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 3,
        name: "John Doe",
        email: "Johndoe@gmail.com",
        role: "Admin",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 4,
        name: "John Doe",
        email: "Johndoe@gmail.com",
        role: "Admin",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 5,
        name: "John Doe",
        email: "Johndoe@gmail.com",
        role: "Technician",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 6,
        name: "John Doe",
        email: "Johndoe@gmail.com",
        role: "Technician",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 7,
        name: "John Doe",
        email: "Johndoe@gmail.com",
        role: "Technician",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 8,
        name: "John Doe",
        email: "Johndoe@gmail.com",
        role: "Admin",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 9,
        name: "John Doe",
        email: "Johndoe@gmail.com",
        role: "Superadmin",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 10,
        name: "John Doe",
        email: "Johndoe@gmail.com",
        role: "Superadmin",
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
        { Header: "Admin Name", accessor: "name" },
        { Header: "Email", accessor: "email" },
        { Header: "Date", accessor: "date" },
        { Header: "Role", accessor: "role" },
      ],
      []
    )

    const filteredAdmins = useMemo(
      () =>
        admins.filter(
          (admin) =>
            admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admin.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
            admin.email.toString().includes(searchQuery) ||
            admin.date.toString().includes(searchQuery.toLowerCase())
        ),
      [admins, searchQuery]
    )

    const paginatedData = useMemo(
      () => filteredAdmins.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
      [filteredAdmins, currentPage, itemsPerPage]
    )

    const handleAddEstate = (newAdmins: Admin) => {
      setAdmins((prevAdmin) => [...prevAdmin, { ...newAdmins, sn: prevAdmin.length + 1 }])
    }

    useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true,
      })
    }, [])

    const handleValueSelect = (value: string) => {
      setSelectedValue(value)
      setDropdownVisible(false)
    }
    return (
      <div className="w-full bg-[#F7F7F9]">
        <div className="mx-7 flex items-center justify-between pt-4">
          <h5 className="text-[28px] font-medium">Admins</h5>

          <div className="flex items-center gap-2 ">
            <p className="opacity-50">Admins </p>
            <KeyboardArrowRightIcon className="opacity-50" />
            <p className="opacity-50">Dashboard</p>
          </div>
        </div>
        <div className="m-7 rounded-lg bg-white py-4">
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
            <button onClick={() => setIsModalOpen(true)} className="button-rounded flex items-center gap-2 rounded-md">
              Add New Admin
              <Image src="DashboardImages/Vector.svg" width={11.88} height={11.88} alt="" />
            </button>
          </div>

          <CustomTable tableType="estate" columns={columns} data={paginatedData} />

          <CustomPagination
            totalItems={filteredAdmins.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

          <AddAdminModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddEstate} />
        </div>
      </div>
    )
  }

  const renderOccupancyRate = () => {
    const [roles, setRoles] = useState<Role[]>([
      {
        sn: 1,
        name: "Dantata Estate 1",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 2,
        name: "Dantata Estate 2",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 3,
        name: "Dantata Estate 3",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 4,
        name: "Dantata Estate 4",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 5,
        name: "Dantata Estate 5",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 6,
        name: "Blumen Estate 1",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 7,
        name: "AMD Estate 1",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 8,
        name: "Squid Estate 1",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 9,
        name: "Dantata Estate 1",
        date: "15 May, 2020 8:00 am",
      },
      {
        sn: 10,
        name: "Dantata Estate 1",
        date: "15 May, 2020 8:00 am",
      },
      // ...other estates
    ])
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(5)
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
        { Header: "Role Name", accessor: "name" },
        { Header: "Date Added", accessor: "date" },
      ],
      []
    )

    const filteredEstates = useMemo(
      () =>
        roles.filter(
          (role) =>
            role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            role.date.toString().includes(searchQuery.toLowerCase())
        ),
      [roles, searchQuery]
    )

    const paginatedData = useMemo(
      () => filteredEstates.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage),
      [filteredEstates, currentPage, itemsPerPage]
    )

    const handleAddEstate = (newEstate: Role) => {
      setRoles((prevEstates) => [...prevEstates, { ...newEstate, sn: prevEstates.length + 1 }])
    }

    useEffect(() => {
      AOS.init({
        duration: 1000,
        once: true,
      })
    }, [])

    const handleValueSelect = (value: string) => {
      setSelectedValue(value)
      setDropdownVisible(false)
    }
    return (
      <div className="w-full bg-[#F7F7F9]">
        <div className="mx-7 flex items-center justify-between pt-4">
          <h5 className="text-[28px] font-medium">Roles</h5>

          <div className="flex items-center gap-2 ">
            <p className="opacity-50">Roles </p>
            <KeyboardArrowRightIcon className="opacity-50" />
            <p className="opacity-50">Dashboard</p>
          </div>
        </div>
        <div className="m-7 rounded-lg bg-white py-4">
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
            <button onClick={() => setIsModalOpen(true)} className="button-rounded flex items-center gap-2 rounded-md">
              Add New Role
              <Image src="DashboardImages/Vector.svg" width={11.88} height={11.88} alt="" />
            </button>
          </div>

          <CustomTable tableType="role" columns={columns} data={paginatedData} />

          <CustomPagination
            totalItems={filteredEstates.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />

          <AddRoleModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddEstate} />
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full flex-col">
      <div className="tab-bg  flex w-[345px] items-center gap-3  p-1 ">
        <button
          className={`${activeTab === "admin" ? "active-tab" : "inactive-tab"}`}
          onClick={() => setActiveTab("admin")}
        >
          Admin
        </button>
        <button
          className={`${activeTab === "occupancy-rate" ? "active-tab" : "inactive-tab"}`}
          onClick={() => setActiveTab("occupancy-rate")}
        >
          Roles
        </button>
      </div>
      {activeTab === "admin" ? renderAdmin() : null}
      {activeTab === "occupancy-rate" ? renderOccupancyRate() : null}
    </div>
  )
}

export default AdminMain
