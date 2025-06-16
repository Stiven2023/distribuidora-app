import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { ToastProvider } from "@heroui/toast";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import {
  TwitterIcon,
  InstagramIcon,
  FacebookIcon,
  TikTokIcon,
  Logo,
} from "@/components/icons";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full bg-background border-t border-divider">
              <div className="container mx-auto max-w-7xl px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Columna de Marca y Redes Sociales */}
                  <div className="flex flex-col items-start gap-4">
                    <div className="flex items-center gap-2">
                      <Logo />
                      <p className="font-bold text-inherit">
                        {siteConfig.name}
                      </p>
                    </div>
                    <p className="text-sm text-default-500">
                      {siteConfig.description}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <Link isExternal aria-label="Twitter" href="#">
                        <TwitterIcon className="text-default-500" />
                      </Link>
                      <Link isExternal aria-label="Instagram" href="#">
                        <InstagramIcon className="text-default-500" />
                      </Link>
                      <Link isExternal aria-label="Facebook" href="#">
                        <FacebookIcon className="text-default-500" />
                      </Link>
                      <Link isExternal aria-label="TikTok" href="#">
                        <TikTokIcon className="text-default-500" />
                      </Link>
                    </div>
                  </div>

                  {/* Columna de Navegación */}
                  <div>
                    <h3 className="font-bold mb-4">Navegación</h3>
                    <ul className="space-y-2">
                      {siteConfig.navItems.map((item) => (
                        <li key={item.href}>
                          <Link
                            className="text-sm text-default-500 hover:text-secondary"
                            href={item.href}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Columna Legal */}
                  <div>
                    <h3 className="font-bold mb-4">Legal</h3>
                    <ul className="space-y-2">
                      <li>
                        <Link
                          className="text-sm text-default-500 hover:text-secondary"
                          href="#"
                        >
                          Términos de Servicio
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-sm text-default-500 hover:text-secondary"
                          href="#"
                        >
                          Política de Privacidad
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="text-sm text-default-500 hover:text-secondary"
                          href="#"
                        >
                          Política de Cookies
                        </Link>
                      </li>
                    </ul>
                  </div>

                  {/* Columna de Suscripción */}
                  <div>
                    <h3 className="font-bold mb-4">
                      Suscríbete a nuestro boletín
                    </h3>
                    <p className="text-sm text-default-500 mb-4">
                      Recibe las últimas noticias, ofertas y tutoriales
                      directamente en tu bandeja de entrada.
                    </p>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input
                        aria-label="Email"
                        placeholder="Email"
                        type="email"
                      />
                      <Button color="secondary" type="submit">
                        Suscribirse
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="mt-12 border-t border-divider pt-8 text-center">
                  <p className="text-sm text-default-400">
                    {new Date().getFullYear()} {siteConfig.name}. Todos los
                    derechos reservados.
                  </p>
                </div>
              </div>
            </footer>
          </div>
          <ToastProvider placement="top-center" />
        </Providers>
      </body>
    </html>
  );
}
