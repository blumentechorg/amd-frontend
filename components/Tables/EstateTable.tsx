import React, { useState, useEffect, useRef } from "react"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import ReceiptModal from "components/Modals/ViewReceiptModal"
import { useRouter } from "next/navigation"
import ViewMaintenanceModal from "components/Modals/ViewMaintenanceModal"

interface Column {
  Header: string
  accessor: string | ((row: any) => any)
}

interface CustomTableProps {
  columns: Column[]
  data: any[]
  showDropdown?: boolean
  tableType: string
}

export default function CustomTable({ columns, data, showDropdown = true, tableType }: CustomTableProps) {
  const [sortBy, setSortBy] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [searchQuery, setSearchQuery] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState<number | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false)
  const [selectedReceiptData, setSelectedReceiptData] = useState<any>(null)
  const [isMaintenanceModalOpen, setIsMaintenanceModalOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownRef])

  const handleSort = (accessor: string) => {
    if (sortBy === accessor) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(accessor)
      setSortDirection("asc")
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortBy) return 0

    const aValue = typeof sortBy === "function" ? sortBy(a) : a[sortBy]
    const bValue = typeof sortBy === "function" ? sortBy(b) : b[sortBy]

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
    } else {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue
    }
  })

  const filteredData = sortedData.filter((item) => {
    return columns.some((column) => {
      const value = typeof column.accessor === "function" ? column.accessor(item) : item[column.accessor]
      return value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    })
  })

  const handleDropdownToggle = (index: number) => {
    setDropdownOpen(dropdownOpen === index ? null : index)
  }

  const handleViewReceipt = (event: React.MouseEvent<HTMLButtonElement>, receiptData: any) => {
    event.stopPropagation()
    console.log("Opening receipt modal with data:", receiptData) // Debug log
    setSelectedReceiptData(receiptData)
    setIsReceiptModalOpen(true)
  }

  const handleViewMaintenance = (event: React.MouseEvent<HTMLButtonElement>, receiptData: any) => {
    event.stopPropagation()
    console.log("Opening receipt modal with data:", receiptData) // Debug log
    setSelectedReceiptData(receiptData)
    setIsMaintenanceModalOpen(true)
  }

  const paginatedData = filteredData.slice(0, itemsPerPage)

  const renderDropdownOptions = (index: number, row: any) => {
    const router = useRouter()
    if (tableType === "estate") {
      return (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
          <div className="py-1">
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Edit</button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">Delete</button>
          </div>
        </div>
      )
    } else if (tableType === "rent") {
      return (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
          <div className="py-1">
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={(event) => handleViewReceipt(event, row)}
            >
              View Receipt
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Notify Tenant
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Contact Tenant
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Send Eviction Notice
            </button>
          </div>
        </div>
      )
    } else if (tableType === "property") {
      return (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
          <div className="py-1">
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={(event) => handleViewReceipt(event, row)}
            >
              View Receipt
            </button>
            <button
              onClick={() => router.push(`/properties/property/${row.propertyId}`)}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              View Property
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Deactivate Account
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Unlink Property ID
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Remove Tenant
            </button>
          </div>
        </div>
      )
    } else if (tableType === "service") {
      return (
        <div className="absolute right-0 z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
          <div className="py-1">
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={(event) => handleViewReceipt(event, row)}
            >
              Notify User
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              Generate Invoice
            </button>
            <button
              onClick={(event) => handleViewMaintenance(event, row)}
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              View Request
            </button>
            <button className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100">
              View Invoice
            </button>
          </div>
        </div>
      )
    }
  }

  return (
    <div className="">
      <div className="flex items-center justify-between px-7">
        <div className="flex items-center gap-10"></div>
      </div>
      <div className="my-4 h-[1px] w-full bg-black opacity-5"></div>
      <div className="px-7">
        <table className="min-w-full border-collapse rounded-md border bg-white">
          <thead>
            <tr>
              {columns.map((column, columnIndex) => (
                <th
                  key={column.Header}
                  onClick={() => handleSort(column.accessor as string)}
                  className={`cursor-pointer border-l bg-[#2D9DFD0D] px-4 py-3 text-left max-sm:text-xs ${
                    columnIndex === 0 ? "gap-4 pl-4" : ""
                  }`}
                >
                  {column.Header}
                  {sortBy === column.accessor && (sortDirection === "asc" ? " 🔼" : " 🔽")}
                </th>
              ))}
              {showDropdown && <th className="border-l bg-[#2D9DFD0D] px-4 py-3 text-left"></th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index}>
                {columns.map((column, cellIndex) => (
                  <td
                    key={`${column.Header}-${index}`}
                    className={`border-l border-gray-200 px-4 py-3 text-left max-sm:text-xs ${
                      cellIndex === 0 ? "pl-4" : "font-medium"
                    } 
                   ${column.accessor === "rentStatus" && row.rentStatus === "Overdue" ? "bg-[#FF002E] text-white" : ""} 
                   ${column.accessor === "rentStatus" && row.rentStatus === "Vacant" ? "text-[#FF0000]" : ""}
                   ${column.accessor === "rentStatus" && row.rentStatus === "Failed" ? "bg-[#FF6A5A] text-white" : ""}
                   ${column.accessor === "rentStatus" && row.rentStatus === "Occupied" ? "text-[#0BB197]" : ""}
                   `}
                  >
                    {typeof column.accessor === "function" ? column.accessor(row) : row[column.accessor]}
                  </td>
                ))}
                {showDropdown && (
                  <td className="border-l border-gray-200 py-3 text-center">
                    <div className="relative">
                      <button onClick={() => handleDropdownToggle(index)}>
                        <MoreVertIcon className="text-[#4D4D4D] opacity-50" />
                      </button>
                      {dropdownOpen === index && renderDropdownOptions(index, row)}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isReceiptModalOpen && (
        <ReceiptModal
          isOpen={isReceiptModalOpen}
          onClose={() => setIsReceiptModalOpen(false)}
          receiptData={selectedReceiptData}
        />
      )}

      {isMaintenanceModalOpen && (
        <ViewMaintenanceModal
          isOpen={isMaintenanceModalOpen}
          onClose={() => setIsMaintenanceModalOpen(false)}
          receiptData={selectedReceiptData}
        />
      )}
    </div>
  )
}
