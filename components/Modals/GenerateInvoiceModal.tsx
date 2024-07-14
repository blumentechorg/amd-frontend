import React, { useEffect } from "react"
import { IoClose } from "react-icons/io5"
import AOS from "aos"
import "aos/dist/aos.css"

interface GenerateInvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  receiptData: any
}

const GenerateInvoiceModal: React.FC<GenerateInvoiceModalProps> = ({ isOpen, onClose, receiptData }) => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="relative rounded-md bg-white xl:max-w-[783px]"
        data-aos="fade-up"
        data-aos-duration="1000"
        data-aos-delay="500"
      >
        <button onClick={onClose} className="absolute -right-7 -top-7 rounded-full bg-[#FFFFFF] p-2">
          <IoClose size={16} />
        </button>
        <div className="flex items-center gap-2 px-10 py-5">
          <p className="text-lg font-medium text-black">Generate Invoice</p>
        </div>
        <div className="h-[1px] w-full bg-[#000000] opacity-5"></div>
        <div className="px-10 py-5">
          {/* Add your form or invoice generation content here */}
          <div>
            <p>Property ID: {receiptData.propertyId}</p>
            <p>Type: {receiptData.type}</p>
            {/* Add more fields as needed */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerateInvoiceModal
