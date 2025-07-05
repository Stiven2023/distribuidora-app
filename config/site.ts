export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Su Negocio Distribuciones",
  description: "Tu distribuidora de dulces y golosinas.",
  navItems: [
    {
      label: "Tienda",
      href: "/tienda",
    },
    {
      label: "Categorías",
      href: "/categorias",
    },
    {
      label: "Ofertas",
      href: "/ofertas",
    },
    {
      label: "Nosotros",
      href: "/nosotros",
    },
  ],
  navMenuItems: [
    {
      label: "Tienda",
      href: "/tienda",
    },
    {
      label: "Categorías",
      href: "/categorias",
    },
    {
      label: "Ofertas",
      href: "/ofertas",
    },
    {
      label: "Nosotros",
      href: "/nosotros",
    },
    {
      label: "Iniciar Sesión",
      href: "/login",
    },
    {
      label: "Cerrar Sesión",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
  },
};
