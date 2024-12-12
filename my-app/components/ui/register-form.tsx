import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";

export function DialogDemo() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/users", {
        name,
        email,
      });
      if (response.status === 201) {
        toast.success("Cuenta creada con éxito");
      }
    } catch (error: any) {
      if (error.response?.status === 500) {
        toast.error("El usuario ya existe");
      } else {
        toast.error("Error al crear la cuenta");
      }
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="mt-4 text-center text-sm">
          No tienes una cuenta? <p className="underline">Registrar</p>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear cuenta</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Email*
            </Label>
            <Input
              id="username"
              className="col-span-3"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Toaster />
          <Button onClick={handleRegister}>Registrarse</Button> <Toaster />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
