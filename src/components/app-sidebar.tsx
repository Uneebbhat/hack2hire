"use client";

import { useMemo } from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  LayoutDashboardIcon,
  BriefcaseBusiness,
  Terminal,
  Users,
  Building2,
} from "lucide-react";

import Link from "next/link";

type UserType = "user" | "company";

type TokenPayload = {
  type: UserType;
};

function getCookie(name: string) {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }

  console.log(value);
  console.log(parts);

  return null;
}

function getUserTypeFromToken(): UserType | null {
  try {
    const token = getCookie("access_token");
    console.log(token);

    if (!token) return null;

    const payload = token.split(".")[1];

    const decodedPayload = atob(payload);

    const parsed: TokenPayload = JSON.parse(decodedPayload);

    return parsed.type;
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const userType = getUserTypeFromToken();

  const navMain = useMemo(() => {
    if (userType === "company") {
      return [
        {
          title: "Company Dashboard",
          url: "/company/dashboard",
          icon: <Building2 />,
        },
        {
          title: "Applicants",
          url: "/company/applicants",
          icon: <Users />,
        },
      ];
    }

    return [
      {
        title: "Dashboard",
        url: "/dashboard",
        icon: <LayoutDashboardIcon />,
      },
      {
        title: "My Applications",
        url: "/my-applications",
        icon: <BriefcaseBusiness />,
      },
    ];
  }, [userType]);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <Link
                className="rounded-md p-2 hover:bg-muted dark:hover:bg-muted/50 flex gap-2 items-center"
                href="/"
              >
                <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                  <Terminal className="w-5 h-5" />
                </div>
                Hack2Hire
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: "shadcn",
            email: "m@example.com",
            avatar: "/avatars/shadcn.jpg",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
