"use client"
import DashboardNav from "components/Navbar/DashboardNav"
import Footer from "components/Footer/Footer"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import Appointments from "components/Dashboard/Dashboard"
import { PiDotsThree } from "react-icons/pi"
import AOS from "aos"
import "aos/dist/aos.css"
import Sidebar from "components/Sidebar/Sidebar"
import DashboardMain from "components/Dashboard/Dashboard"

interface Patient {
  id: string
  name: string
  gender: string
  dob: string
  appointments: {
    id: number
    doctor: string
    detail: string
    pub_date: string
  }[]
  // Add other fields as needed
}

interface Department {
  name: string
}

interface Staff {
  username: string
}

export default function Dashboard() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [patientsWithAppointments, setPatientsWithAppointments] = useState<Patient[]>([])
  const [departmentCount, setDepartmentCount] = useState(0)
  const [staffCount, setStaffCount] = useState(0)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  useEffect(() => {
    async function fetchPatients() {
      try {
        const response = await fetch("https://api.caregiverhospital.com/patient/patient/")
        if (!response.ok) {
          throw new Error("Failed to fetch patients")
        }
        const data = (await response.json()) as Patient[]
        setPatients(data)

        // Filter patients with appointments
        const patientsWithApps = data.filter((patient) => patient.appointments.length > 0)
        setPatientsWithAppointments(patientsWithApps)
      } catch (error) {
        console.error("Error fetching patients:", error)
        // Optionally, handle errors
      }
    }

    fetchPatients()
  }, [])

  useEffect(() => {
    async function fetchDepartmentCount() {
      try {
        const response = await fetch("https://api.caregiverhospital.com/department/department/")
        if (!response.ok) {
          throw new Error("Failed to fetch department count")
        }
        const data = (await response.json()) as Department[]
        setDepartmentCount(data.length)
      } catch (error) {
        console.error("Error fetching department count:", error)
      }
    }

    fetchDepartmentCount()
  }, [])

  useEffect(() => {
    async function fetchStaffCount() {
      try {
        const response = await fetch("https://api.caregiverhospital.com/app_user/all/")
        if (!response.ok) {
          throw new Error("Failed to fetch staff count")
        }
        const data = (await response.json()) as Staff[]
        setStaffCount(data.length)
      } catch (error) {
        console.error("Error fetching staff count:", error)
      }
    }

    fetchStaffCount()
  }, [])

  return (
    <section className="h-full w-full">
      <div className="flex min-h-screen w-full">
        <div className="flex  w-full flex-col">
          <DashboardNav />
          <div className="flex">
            <Sidebar />

            <div className="flex w-full gap-6 max-md:flex-col max-md:px-0  md:mb-16 ">
              <div className="w-full">
                <DashboardMain />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
