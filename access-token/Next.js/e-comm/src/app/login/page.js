"use client";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { api } from "../../lib/api";

export default function LoginPage() {
  const [formData, setFormData] = useState({});


  let handleChange = (e) => {
    let { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  let handleSubmit = async (e) => {
    e.preventDefault()

    try{
      let res = await api.post("/api/auth/login", formData);
      console.log(res)
    }catch(error) {
      console.log("error in login", error)
      console.log(error.response?.status);
  console.log(error.response?.data);
    }
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to continue to your account</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                onChange={handleChange}
                id="email"
                type="email"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                name={"password"}
                onChange={handleChange}
                id="password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <Button className="w-full">Login</Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Dont have an account?{" "}
            <Link
              href="/register"
              className="font-semibold text-primary hover:underline"
            >
              Register
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
