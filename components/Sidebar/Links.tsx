"use client"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  AdminIcon,
  ChatIcon,
  DashboardIcon,
  EstatesIcon,
  HomeIcon,
  LogoutIcon,
  ServiceIcon,
  SupportIcon,
  UtilityIcon,
} from "./Icons"
import { LogoIcon } from "components/Icons/Icons"

const links = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { name: "Estates", href: "/estates", icon: EstatesIcon },
  { name: "Rents", href: "/rents", icon: HomeIcon },
  { name: "Properties", href: "/properties", icon: HomeIcon },
  { name: "Utilities", href: "/utilities", icon: UtilityIcon },
]

const secondlinks = [
  { name: "Chats", href: "/chats", icon: ChatIcon },
  { name: "Service Charge", href: "/service-charge", icon: ServiceIcon },
  { name: "Support", href: "/support", icon: SupportIcon },
  { name: "Admin", href: "/admin", icon: AdminIcon },
  { name: "Logout", href: "/logout", icon: LogoutIcon },
]

interface LinksProps {
  isCollapsed: boolean
}

export function Links({ isCollapsed }: LinksProps) {
  const pathname = usePathname()
  return (
    <div className="flex  flex-row border-black lg:flex-col">
      {links.map((link) => {
        const LinkIcon = link.icon
        const isActive = pathname.startsWith(link.href)
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("dashboard-style", {
              "active-dashboard": isActive,
            })}
          >
            <div className="flex items-center gap-2 pl-5">
              <LinkIcon isActive={isActive} />
              <p
                className={clsx("text-sm font-semibold transition-opacity duration-500", {
                  hidden: isCollapsed,
                  "font-extrabold transition-opacity duration-500": isActive,
                })}
              >
                {link.name}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}

export function SecondLinks({ isCollapsed }: LinksProps) {
  const pathname = usePathname()
  return (
    <div className="flex  flex-row border-black lg:h-80 lg:flex-col">
      {secondlinks.map((link) => {
        const LinkIcon = link.icon
        const isActive = pathname.startsWith(link.href)
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx("dashboard-style", {
              "active-dashboard": isActive,
            })}
          >
            <div className="flex items-center gap-2 pl-5">
              <LinkIcon isActive={isActive} />
              <p
                className={clsx("text-sm font-semibold transition-opacity duration-500", {
                  hidden: isCollapsed,
                  "font-extrabold transition-opacity duration-500": isActive,
                })}
              >
                {link.name}
              </p>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
