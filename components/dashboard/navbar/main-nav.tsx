"use client";

import { HTMLAttributes } from "react";
import { useParams } from "next/navigation";
import { cn } from "@/lib";
import { NavLink } from "./nav-link";

export type DashboardRoute = {
  href: string;
  label: string;
  active: string;
};

export const MainNav = ({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) => {
  // const pathname = usePathname();
  const params = useParams();
  // if (!params?.storeId) redirect("/");

  const routes: DashboardRoute[] = [
    {
      href: `/${params?.storeId}/settings`,
      label: "Settings",
      active: `/${params?.storeId}/settings`,
    },
  ];

  return (
    <nav
      {...props}
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
    >
      {routes.map((route) => (
        <NavLink key={route.href} route={route} />
      ))}
    </nav>
  );
};
