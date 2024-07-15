"use client"
import React, { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import AOS from "aos"
import "aos/dist/aos.css"

interface AddEstateModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (estate: any) => void
}

const AddEstateModal: React.FC<AddEstateModalProps> = ({ isOpen, onClose, onSave }) => {
  const [estate, setEstate] = useState({
    name: "",
    location: "",
    noOfHouses: 0,
    percentageOccupied: "",
    date: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEstate((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    onSave(estate)
    onClose()
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50  flex items-center justify-center bg-black bg-opacity-50 ">
      <div
        className="relative rounded-md bg-white p-10 max-sm:mx-8 max-sm:w-full max-sm:p-4  xl:max-w-[783px]"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="500"
      >
        <button onClick={onClose} className="absolute -right-7 -top-7 rounded-full bg-[#FFFFFF] p-2">
          <IoClose size={16} />
        </button>
        <h2 className="mb-4 text-base font-medium">Add New Estate</h2>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 lg:gap-3">
          <div className="search-bg mb-3  h-[56px] items-center  justify-between  rounded-[10px] px-3 py-2 hover:border-[#EEC202] focus:border-[#EEC202] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[328px]">
            <p className="text-xs text-[#9D99AC]">Estate Name</p>
            <div className="flex">
              <input
                type="text"
                id="username"
                placeholder="GADUWA1234"
                className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                style={{ width: "100%", height: "24px" }}
              />
            </div>
          </div>
          <div className="search-bg mb-3  h-[56px] items-center  justify-between  rounded-[10px] px-3 py-2 hover:border-[#EEC202] focus:border-[#EEC202] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[328px]">
            <p className="text-xs text-[#9D99AC]">Number of houses</p>
            <div className="flex">
              <input
                type="text"
                id="username"
                placeholder="200"
                className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                style={{ width: "100%", height: "24px" }}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 lg:gap-3">
          <div className="search-bg mb-3  h-[56px] items-center  justify-between  rounded-[10px] px-3 py-2 hover:border-[#EEC202] focus:border-[#EEC202] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[328px]">
            <p className="text-xs text-[#9D99AC]">Houses Occupied</p>
            <div className="flex">
              <input
                type="text"
                id="username"
                placeholder="100"
                className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                style={{ width: "100%", height: "24px" }}
              />
            </div>
          </div>
          <div className="search-bg mb-3  h-[56px] items-center  justify-between  rounded-[10px] px-3 py-2 hover:border-[#EEC202] focus:border-[#EEC202] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[328px]">
            <p className="text-xs text-[#9D99AC]">Houses Vacant</p>
            <div className="flex">
              <input
                type="text"
                id="username"
                placeholder="100"
                className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                style={{ width: "100%", height: "24px" }}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 lg:gap-3">
          <div className="search-bg mb-3  h-[56px] items-center  justify-between  rounded-[10px] px-3 py-2 hover:border-[#EEC202] focus:border-[#EEC202] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[328px]">
            <p className="text-xs text-[#9D99AC]">Province</p>
            <div className="flex">
              <input
                type="text"
                id="username"
                placeholder="Apo"
                className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                style={{ width: "100%", height: "24px" }}
              />
            </div>
          </div>
          <div className="search-bg mb-3  h-[56px] items-center  justify-between  rounded-[10px] px-3 py-2 hover:border-[#EEC202] focus:border-[#EEC202] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[328px]">
            <p className="text-xs text-[#9D99AC]">Local Government Area</p>
            <div className="flex">
              <input
                type="text"
                id="username"
                placeholder="Wuse"
                className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                style={{ width: "100%", height: "24px" }}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 max-sm:grid-cols-1 lg:gap-3">
          <div className="search-bg mb-3  h-[56px] items-center  justify-between  rounded-[10px] px-3 py-2 hover:border-[#EEC202] focus:border-[#EEC202] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[328px]">
            <p className="text-xs text-[#9D99AC]">State</p>
            <div className="flex">
              <input
                type="text"
                id="username"
                placeholder="Abuja"
                className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                style={{ width: "100%", height: "24px" }}
              />
            </div>
          </div>
          <div className="search-bg mb-3  h-[56px] items-center  justify-between  rounded-[10px] px-3 py-2 hover:border-[#EEC202] focus:border-[#EEC202] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[328px]">
            <p className="text-xs text-[#9D99AC]">Country</p>
            <div className="flex">
              <input
                type="text"
                id="username"
                placeholder="Nigeria"
                className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                style={{ width: "100%", height: "24px" }}
              />
            </div>
          </div>
        </div>
        <div className="search-bg mb-3 items-center  justify-between  rounded-[10px]   hover:border-[#EEC202] focus:border-[#EEC202] focus:bg-[#FBFAFC] max-sm:mb-2 ">
          <p className="px-2 pb-1 pt-2 text-xs text-[#9D99AC]">Email</p>
          <textarea
            className="h-[120px] w-full rounded-md border-0  bg-transparent px-2 text-base outline-none focus:outline-none"
            placeholder="Apo Area 1 Legislative Quaters, Abuja Nigeria"
          ></textarea>
        </div>
        <div className="mt-4 flex w-full justify-center">
          <button
            onClick={handleSave}
            className="button-rounded rounded px-10 py-2 text-white max-sm:w-full lg:w-[227px]"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddEstateModal
