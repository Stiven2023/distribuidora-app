"use client";

import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { title } from "@/components/primitives";
import { motion, AnimatePresence } from "framer-motion";
import { addToast } from "@heroui/toast";

const steps = [
  { id: 1, name: "Información Personal" },
  { id: 2, name: "Verificación" },
  { id: 3, name: "Seguridad" },
];

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = () => {
    setIsLoading(true);
    addToast({ title: "Enviando código de verificación...", color: "secondary" });

    // Simula una llamada a la API
    setTimeout(() => {
      setIsLoading(false);
      addToast({
        title: "¡Código enviado!",
        description: "Revisa tu bandeja de entrada.",
        color: "success",
      });
    }, 2000);
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const slideVariants = {
    hidden: { x: "100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-10"
    >
      <div className="w-full max-w-md rounded-2xl border border-default-200/50 bg-background/60 p-6 shadow-xl backdrop-blur-sm md:p-8">
        <div className="text-center">
          <h1 className={title()}>Crear una Cuenta</h1>
          <p className="mt-2 text-sm text-default-500">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" size="sm" color="secondary">
              Inicia sesión
            </Link>
          </p>
        </div>

        {/* Stepper */}
        <div className="my-8 flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${currentStep >= step.id ? "bg-secondary text-white" : "bg-default-200 text-default-600"}`}
              >
                {step.id}
              </div>
              {index < steps.length - 1 && (
                <div className={`h-1 w-16 ${currentStep > step.id ? "bg-secondary" : "bg-default-200"}`} />
              )}
            </div>
          ))}
        </div>

        <form className="mt-8 min-h-[280px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
              className="space-y-6"
            >
              {currentStep === 1 && (
                <>
                  <h2 className="font-semibold text-center">{steps[0].name}</h2>
                  <Input isRequired label="Nombre Completo" placeholder="Ingresa tu nombre" type="text" variant="bordered" />
                  <Input isRequired label="Teléfono" placeholder="Tu número de teléfono" type="tel" variant="bordered" />
                </>
              )}
              {currentStep === 2 && (
                <>
                  <h2 className="font-semibold text-center">{steps[1].name}</h2>
                  <Input
                    isRequired
                    label="Correo Electrónico"
                    placeholder="tu@email.com"
                    type="email"
                    variant="bordered"
                    endContent={
                      <Button
                        color="secondary"
                        variant="flat"
                        isLoading={isLoading}
                        onClick={handleSendCode}
                      >
                        Enviar Código
                      </Button>
                    }
                  />
                  <Input isRequired label="Código de Verificación" placeholder="Ingresa el código" type="text" variant="bordered" />
                </>
              )}
              {currentStep === 3 && (
                <>
                  <h2 className="font-semibold text-center">{steps[2].name}</h2>
                  <Input isRequired label="Contraseña" placeholder="Crea una contraseña segura" type="password" variant="bordered" />
                  <Input isRequired label="Confirmar Contraseña" placeholder="Confirma tu contraseña" type="password" variant="bordered" />
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </form>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between">
          <Button color="default" variant="bordered" isDisabled={currentStep === 1} onClick={handlePrev}>
            Anterior
          </Button>
          {currentStep < steps.length ? (
            <Button color="secondary" onClick={handleNext}>
              Siguiente
            </Button>
          ) : (
            <Button color="secondary" type="submit" className="shadow-lg">
              Registrarse
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}