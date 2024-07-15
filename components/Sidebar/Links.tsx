"use client"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import {
  AdminIcon,
  ChatIcon,
  DashboardIcon,
  EstatesIcon,
  HomeIcon,
  LogoutIcon,
  PropertyIcon,
  ServiceIcon,
  SupportIcon,
  UtilityIcon,
  VisitorIcon,
} from "./Icons"
import { LogoIcon } from "components/Icons/Icons"

const links = [
  { name: "Dashboard", href: "/dashboard", icon: DashboardIcon },
  { name: "Estates", href: "/estates", icon: EstatesIcon },
  { name: "Rents", href: "/rents", icon: HomeIcon },
  { name: "Properties", href: "/properties", icon: PropertyIcon },
  {
    name: "Utilities",
    href: "",
    icon: UtilityIcon,
    sublinks: [
      { name: "Power", href: "/utilities/power" },
      { name: "Water", href: "/utilities/water" },
      { name: "Gas", href: "/utilities/gas" },
    ],
  },
]

const secondlinks = [
  { name: "Chats", href: "/chats", icon: ChatIcon },
  { name: "Service Charge", href: "/service-charge", icon: ServiceIcon },
  { name: "Visitors Management", href: "/visitors-management", icon: VisitorIcon },
  { name: "Admin", href: "/admin", icon: AdminIcon },
  { name: "Logout", href: "/logout", icon: LogoutIcon },
]

interface LinksProps {
  isCollapsed: boolean
}

export function Links({ isCollapsed }: LinksProps) {
  const pathname = usePathname()
  const [expandedLink, setExpandedLink] = useState<string | null>(null)

  const handleExpand = (linkName: string) => {
    setExpandedLink(expandedLink === linkName ? null : linkName)
  }

  return (
    <div className="flex  flex-col border-black">
      {links.map((link) => {
        const LinkIcon = link.icon
        const isActive = pathname.startsWith(link.href)
        const isExpanded = expandedLink === link.name

        return (
          <div key={link.name}>
            <div
              onClick={() => link.sublinks && handleExpand(link.name)}
              className={clsx("dashboard-style cursor-pointer", {
                "active-dashboard": isActive,
              })}
            >
              <Link href={link.href}>
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
                  {link.sublinks && (
                    <span
                      className={clsx("arrow", {
                        down: isExpanded,
                      })}
                    />
                  )}
                </div>
              </Link>
            </div>
            {isExpanded && !isCollapsed && link.sublinks && (
              <div className="ml-6">
                {link.sublinks.map((sublink) => (
                  <Link key={sublink.name} href={sublink.href} className="dashboard-style">
                    <div className="flex items-center gap-2 pl-5">
                      <p className="text-sm font-semibold">{sublink.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export function SecondLinks({ isCollapsed }: LinksProps) {
  const pathname = usePathname()
  return (
    <div className="flex  flex-col border-black lg:h-80">
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
