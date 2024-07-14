import Image from "next/image"

export const DashboardIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Graph-active.svg" : "/Icons/Graph.svg"} alt="Dashboard" width={20} height={20} />
)

export const EstatesIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Estates-active.svg" : "/Icons/Estates.svg"} alt="Estates" width={20} height={20} />
)

export const HomeIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Home-active.svg" : "/Icons/Home.svg"} alt="Home" width={20} height={20} />
)

export const UtilityIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Utility-active.svg" : "/Icons/Utility.svg"} alt="Utility" width={20} height={20} />
)

export const ChatIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Chat.svg" : "/Icons/Chat.svg"} alt="Utility" width={20} height={20} />
)

export const ServiceIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Utility-active.svg" : "/Icons/Utility.svg"} alt="Utility" width={20} height={20} />
)

export const SupportIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Utility-active.svg" : "/Icons/Support.svg"} alt="Utility" width={20} height={20} />
)

export const AdminIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Utility-active.svg" : "/Icons/Admin.svg"} alt="Utility" width={20} height={20} />
)

export const LogoutIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Utility-active.svg" : "/Icons/Logout.svg"} alt="Utility" width={20} height={20} />
)

export const PropertyIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Property-active.svg" : "/Icons/Property.svg"} alt="Utility" width={20} height={20} />
)

export const VisitorIcon = ({ isActive }: { isActive: boolean }) => (
  <Image src={isActive ? "/Icons/Visitor-active.svg" : "/Icons/Visitor.svg"} alt="Utility" width={20} height={20} />
)
