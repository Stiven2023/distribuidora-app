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
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/dropdown";
import { Avatar } from "@heroui/avatar";
import { UserIcon, BellIcon, CogIcon, LogOutIcon, ShoppingBagIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import { ShoppingCartIcon } from "@/components/icons";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  const pathname = usePathname();
  const isAuthPage = pathname === "/login" || pathname === "/register";
  // Simulación del estado de autenticación
  // En una aplicación real, esto vendría de un AuthContext, NextAuth, etc.
  const [isAuthenticated] = useState(true); // Cambiado a true para mostrar el dropdown
  const user = {
    name: "Juan Pérez",
    email: "juan@email.com",
    avatar: undefined, // Puedes poner una URL de imagen aquí
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">DulceApp</p>
          </NextLink>
        </NavbarBrand>
        {!isAuthPage && (
          <ul className="justify-start hidden gap-4 ml-2 lg:flex">
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
        <NavbarItem className="hidden gap-2 sm:flex">
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
          <NavbarItem className="items-center hidden gap-2 md:flex">
            <Button
              isIconOnly
              aria-label="Carrito de compras"
              as={Link}
              color="secondary"
              href="/cart"
              variant="flat"
            >
              <ShoppingCartIcon className="w-5 h-5" />
            </Button>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  size="sm"
                  src={user.avatar}
                  icon={<UserIcon />}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Opciones de usuario" className="w-56">
                <DropdownItem key="profile" startContent={<UserIcon className="w-5 h-5" />} href="/profile">
                  Perfil
                </DropdownItem>
                <DropdownItem key="orders" startContent={<ShoppingBagIcon className="w-5 h-5" />} href="/orders">
                  Mis pedidos
                </DropdownItem>
                <DropdownItem key="notifications" startContent={<BellIcon className="w-5 h-5" />} href="/notifications">
                  Notificaciones
                </DropdownItem>
                <DropdownItem key="settings" startContent={<CogIcon className="w-5 h-5" />} href="/settings">
                  Opciones
                </DropdownItem>
                <DropdownItem key="logout" startContent={<LogOutIcon className="w-5 h-5" />} className="text-danger" href="/logout">
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
            <ShoppingCartIcon className="w-5 h-5" />
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="pl-4 lg:hidden basis-1" justify="end">
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
                <ShoppingCartIcon className="w-5 h-5" />
              </Button>
            </NavbarItem>
            <NavbarMenuToggle />
          </>
        )}
      </NavbarContent>

      {!isAuthPage && (
        <NavbarMenu>
          <div className="flex flex-col gap-2 mx-4 mt-2">
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
