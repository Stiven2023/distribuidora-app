"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { title } from "@/components/primitives";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-10"
    >
      <div className="w-full max-w-md rounded-2xl border border-default-200/50 bg-background/60 p-6 shadow-xl backdrop-blur-sm md:p-8">
        <div className="text-center">
          <h1 className={title()}>Iniciar Sesión</h1>
          <p className="mt-2 text-sm text-default-500">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" size="sm" color="secondary">
              Regístrate aquí
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6">
          <Input
            isRequired
            label="Correo Electrónico"
            placeholder="tu@email.com"
            type="email"
            variant="bordered"
          />
          <Input
            isRequired
            label="Contraseña"
            placeholder="Ingresa tu contraseña"
            type="password"
            variant="bordered"
          />
          <Button color="secondary" fullWidth type="submit" className="shadow-lg">
            Ingresar
          </Button>
        </form>
      </div>
    </motion.div>
  );
}