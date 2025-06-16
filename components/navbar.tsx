"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
// import { Input } from "@heroui/input"; // Removed unused import
import { useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import NextLink from "next/link";
import { link as linkStyles } from "@heroui/theme";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { ShoppingCartIcon } from "@/components/icons";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  // Simulación del estado de autenticación
  // En una aplicación real, esto vendría de un AuthContext, NextAuth, etc.
  const [isAuthenticated] = useState(false);

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">DulceApp</p>
          </NextLink>
        </NavbarBrand>
        {!isAuthPage && (
          <ul className="hidden lg:flex gap-4 justify-start ml-2">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-secondary data-[active=true]:font-medium",
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
          </ul>
        )}
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <ThemeSwitch />
        </NavbarItem>
        {isAuthPage ? (
          <>
            <NavbarItem className="hidden md:flex">
              <Button
                as={Link}
                color="default"
                href="/login"
                variant="bordered"
              >
                Iniciar Sesión
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden md:flex">
              <Button
                as={Link}
                color="secondary"
                href="/register"
                variant="solid"
              >
                Registrarse
              </Button>
            </NavbarItem>
          </>
        ) : isAuthenticated ? (
          <NavbarItem className="hidden md:flex">
            <Button as={Link} color="danger" href="/logout" variant="flat">
              Cerrar Sesión
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden md:flex">
              <Button
                as={Link}
                color="default"
                href="/login"
                variant="bordered"
              >
                Iniciar Sesión
              </Button>
            </NavbarItem>
            <NavbarItem className="hidden md:flex">
              <Button
                as={Link}
                color="secondary"
                href="/register"
                variant="solid"
              >
                Registrarse
              </Button>
            </NavbarItem>
          </>
        )}
        <NavbarItem className="hidden md:flex">
          <Button
            isIconOnly
            aria-label="Carrito de compras"
            as={Link}
            color="secondary"
            href={isAuthenticated ? "/cart" : "/checkout"}
            variant="flat"
          >
            <ShoppingCartIcon className="h-5 w-5" />
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        {!isAuthPage && (
          <>
            <NavbarItem>
              <Button
                isIconOnly
                aria-label="Carrito de compras"
                as={Link}
                color="secondary"
                href={isAuthenticated ? "/cart" : "/checkout"}
                variant="flat"
              >
                <ShoppingCartIcon className="h-5 w-5" />
              </Button>
            </NavbarItem>
            <NavbarMenuToggle />
          </>
        )}
      </NavbarContent>

      {!isAuthPage && (
        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {siteConfig.navItems.map((item, index) => (
              <NavbarMenuItem key={`${item.href}-${index}`}>
                <Link href={item.href} size="lg">
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
            {/* Lógica de autenticación para el menú móvil */}
            {isAuthenticated ? (
              <NavbarMenuItem>
                <Link className="text-danger" href="/logout" size="lg">
                  Cerrar Sesión
                </Link>
              </NavbarMenuItem>
            ) : (
              <>
                <NavbarMenuItem>
                  <Link href="/login" size="lg">
                    Iniciar Sesión
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem>
                  <Link href="/register" size="lg">
                    Registrarse
                  </Link>
                </NavbarMenuItem>
              </>
            )}
          </div>
        </NavbarMenu>
      )}
    </HeroUINavbar>
  );
};
