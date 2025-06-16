import React from "react";
import { NumberInput } from "@heroui/number-input";
import { Card } from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";

interface ProductCardFormProps {
  onClose: () => void;
  onSubmit: (quantity: number) => void;
  loading?: boolean;
}

export const ProductCardForm: React.FC<ProductCardFormProps> = ({ onClose, onSubmit, loading }) => {
  const [quantity, setQuantity] = React.useState(1);

  if (loading) {
    return (
      <Card className="w-full p-4 space-y-5" radius="lg">
        <Skeleton className="rounded-lg">
          <div className="h-24 rounded-lg bg-default-300" />
        </Skeleton>
        <div className="space-y-3">
          <Skeleton className="w-3/5 rounded-lg">
            <div className="w-3/5 h-3 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-4/5 rounded-lg">
            <div className="w-4/5 h-3 rounded-lg bg-default-200" />
          </Skeleton>
          <Skeleton className="w-2/5 rounded-lg">
            <div className="w-2/5 h-3 rounded-lg bg-default-300" />
          </Skeleton>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex flex-col w-full gap-4 p-4" radius="lg">
      <NumberInput
        className="max-w-xs"
        value={quantity}
        onChange={(e: React.ChangeEvent<HTMLInputElement> | number) => {
          if (typeof e === "number") {
            setQuantity(e);
          } else if (e && typeof e.target.value === "string") {
            setQuantity(Number(e.target.value));
          }
        }}
        label="Cantidad"
        min={1}
      />
      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 bg-gray-200 rounded dark:bg-gray-700" onClick={onClose}>Cancelar</button>
        <button className="px-4 py-2 text-white bg-blue-600 rounded" onClick={() => onSubmit(quantity)}>Agregar</button>
      </div>
    </Card>
  );
};
