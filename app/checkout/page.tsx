"use client";

import { useState } from "react";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Image } from "@heroui/image";
import { PlusCircle, MinusCircle, Trash2 } from "lucide-react";
import { Card, CardBody, CardHeader } from "@heroui/card";

import { title } from "@/components/primitives";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Gomitas de Ositos (1kg)",
      price: 9.99,
      quantity: 2,
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Galletas con Chispas",
      price: 5.49,
      quantity: 1,
      imageUrl: "https://via.placeholder.com/150",
    },
  ]);

  const handleQuantityChange = (id: number, amount: number) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-lg text-center justify-center">
        <h1 className={title()}>Carrito de Compras</h1>
      </div>

      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {/* Cart Items List */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Resumen de tu Carrito</h2>
            </CardHeader>
            <Divider />
            <CardBody>
              <div className="flex flex-col gap-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <Image
                      width={80}
                      height={80}
                      alt={item.name}
                      src={item.imageUrl}
                      className="rounded-lg"
                    />
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-default-500">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button isIconOnly size="sm" variant="ghost" onPress={() => handleQuantityChange(item.id, -1)}>
                        <MinusCircle className="h-5 w-5" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button isIconOnly size="sm" variant="ghost" onPress={() => handleQuantityChange(item.id, 1)}>
                        <PlusCircle className="h-5 w-5" />
                      </Button>
                    </div>
                    <Button isIconOnly size="sm" variant="flat" color="danger" onPress={() => handleRemoveItem(item.id)}>
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <h2 className="text-xl font-bold">Resumen del Pedido</h2>
            </CardHeader>
            <Divider />
            <CardBody className="gap-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Envío</p>
                <p>Gratis</p>
              </div>
              <Divider />
              <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <Button color="secondary" size="lg" className="w-full mt-4">
                Proceder al Pago
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </section>
  );
}