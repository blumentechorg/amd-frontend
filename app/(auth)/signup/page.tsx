"use client"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import AOS from "aos"
import "aos/dist/aos.css"
import Footer from "components/Footer/Footer"
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import { signUpUser } from "utils/api"

const Page: React.FC = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showSuccessNotification, setShowSuccessNotification] = useState(false)
  const [showErrorNotification, setShowErrorNotification] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const router = useRouter()

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setShowErrorNotification(true)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const response = await signUpUser(username, password)

      if (response.status === 201) {
        setShowSuccessNotification(true)
        setLoading(false)
        router.push("/dashboard")
      } else {
        throw new Error("Failed to sign up.")
      }
    } catch (error: any) {
      console.error("Sign up error:", error)
      setError(error.message)
      setShowErrorNotification(true)
      setLoading(false)
    }
  }

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  useEffect(() => {
    let successTimeout: NodeJS.Timeout
    let errorTimeout: NodeJS.Timeout

    if (showSuccessNotification) {
      successTimeout = setTimeout(() => {
        setShowSuccessNotification(false)
      }, 5000)
    }

    if (showErrorNotification) {
      errorTimeout = setTimeout(() => {
        setShowErrorNotification(false)
      }, 3000)
    }

    return () => {
      clearTimeout(successTimeout)
      clearTimeout(errorTimeout)
    }
  }, [showSuccessNotification, showErrorNotification])

  return (
    <>
      <div className="flex h-screen w-full items-center justify-center bg-[#22266A]">
        <div
          className="auth flex rounded-[20px] bg-[#FFFFFF] max-sm:w-[95%] xl:max-w-[434px]"
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="500"
        >
          <div className="w-full justify-center px-[53px] py-[60px] max-sm:px-7">
            <div className="mb-8 flex items-center justify-center">
              <Image src="/AuthImages/amd-logo.png" width={250} height={74} alt="profile" />
            </div>
            <div className="mb-8 flex items-center justify-center">
              <Image src="AuthImages/CreateAccount.svg" width={233} height={38} alt="profile" />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="search-bg mb-3 h-[56px] items-center justify-between rounded-[10px] px-3 py-2 hover:border-[#EEC202] focus:border-[#EEC202] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[328px]">
                <p className="text-xs text-[#9D99AC]">Email</p>
                <div className="flex">
                  <input
                    type="text"
                    id="username"
                    placeholder="Shereefadamu001@gmail.com"
                    className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                    style={{ width: "100%", height: "24px" }}
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </div>
              </div>

              <div className="search-bg mb-3 h-[56px] items-center justify-between rounded-[10px] px-3 py-2 hover:border-[#EEC202] focus:border-[#EEC202] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[328px]">
                <p className="text-xs text-[#9D99AC]">Password</p>
                <div className="flex">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="password"
                    placeholder="Enter Password"
                    className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                    style={{ width: "100%", height: "24px" }}
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <button type="button" className="focus:outline-none" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? (
                      <RemoveRedEyeOutlinedIcon />
                    ) : (
                      <Image
                        className="icon-style"
                        src="/AuthImages/eye-close-line.svg"
                        width={24}
                        height={24}
                        alt="toggle password visibility"
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className="search-bg mb-3 h-[56px] items-center justify-between rounded-[10px] px-3 py-2 hover:border-[#EEC202] focus:border-[#EEC202] focus:bg-[#FBFAFC] max-sm:mb-2 xl:w-[328px]">
                <p className="text-xs text-[#9D99AC]">Confirm Password</p>
                <div className="flex">
                  <input
                    type={isPasswordVisible ? "text" : "password"}
                    id="confirm-password"
                    placeholder="Confirm Password"
                    className="h-[24px] w-full bg-transparent text-base outline-none focus:outline-none"
                    style={{ width: "100%", height: "24px" }}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <button type="button" className="focus:outline-none" onClick={togglePasswordVisibility}>
                    {isPasswordVisible ? (
                      <RemoveRedEyeOutlinedIcon />
                    ) : (
                      <Image
                        className="icon-style"
                        src="/AuthImages/eye-close-line.svg"
                        width={24}
                        height={24}
                        alt="toggle password visibility"
                      />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-5 flex w-full gap-6">
                <button
                  type="submit"
                  className="button-primary h-[50px] w-full rounded-md max-sm:h-[45px]"
                  disabled={loading}
                >
                  {loading ? "Signing Up..." : "Continue"}
                </button>
              </div>
            </form>

            <div className="mt-2 flex justify-center gap-1">
              <p className="text-xs text-[#044982]">Already have an Account </p>
              <Link href="/" className="text-xs text-[#EEC202] underline">
                Sign In
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {showSuccessNotification && (
        <div className="animation-fade-in absolute bottom-16 m-5 flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#000000] bg-[#92E3A9] text-[#000000] shadow-[#05420514] md:right-16">
          <span className="clash-font text-sm text-[#000000]">Sign Up Successfully</span>
          <Image src="AuthImages/Star2.svg" width={28.26} height={28.26} alt="dekalo" />
        </div>
      )}
      {showErrorNotification && (
        <div className="animation-fade-in absolute bottom-16 m-5 flex h-[50px] w-[339px] transform items-center justify-center gap-2 rounded-md border border-[#D14343] bg-[#FEE5E5] text-[#D14343] shadow-[#05420514] md:right-16">
          <Image src="/AuthImages/failed.png" width={16} height={16} alt="dekalo" />
          <span className="clash-font text-sm text-[#D14343]">{error}</span>
        </div>
      )}
    </>
  )
}

export default Page
