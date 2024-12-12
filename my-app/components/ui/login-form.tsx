"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDemo } from "./register-form";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleConsult = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/buy", {
        params: {
          email,
        },
      });
      setDialogMessage(`Tienes ${response.data.purchases} compras`);
    } catch (error) {
      setDialogMessage("Usuario no encontrado");
    } finally {
      setIsDialogOpen(true);
    }
  };

  const handlePurchase = async () => {
    try {
      const response = await axios.post("http://localhost:3001/api/buy", {
        email,
      });
      if (response.status === 201) {
        setDialogMessage("Compra realizada con éxito");
      }
    } catch (error: any) {
      if (error.response?.status === 429) {
        setDialogMessage("Solo se puede comprar un maíz por minuto");
      } else {
        setDialogMessage("Error al realizar la compra");
      }
    } finally {
      setIsDialogOpen(true);
    }
  };

  return (
    <>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Bob’s corn</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleConsult}
            >
              Consultar
            </Button>
            <Button className="w-full" onClick={handlePurchase}>
              Comprar
            </Button>
          </div>
          <DialogDemo />
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{dialogMessage}</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
