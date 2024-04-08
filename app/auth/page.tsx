"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  email: string;
  password: string;
}

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupData>({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.email || !isValidEmail(loginData.email)) {
      toast("Please enter a valid email.");
      return;
    }
    if (!loginData.password || !isStrongPassword(loginData.password)) {
      toast(
        "Password should be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character."
      );
      return;
    }
    console.log("Logging in with:", loginData);
  };

  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signupData.email || !isValidEmail(signupData.email)) {
      toast("Please enter a valid email.");
      return;
    }
    if (!signupData.password || !isStrongPassword(signupData.password)) {
      toast("Incorrect password. Please enter a valid password.");
      return;
    }
    console.log("Signing up with:", signupData);
  };

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    formType: "login" | "signup"
  ) => {
    const { name, value } = e.target;
    if (formType === "login") {
      setLoginData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setSignupData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  const isValidEmail = (email: string) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isStrongPassword = (password: string) => {
    // Password validation regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="flex justify-center w-screen h-screen">
      <Tabs defaultValue={activeTab} className="w-[400px] pt-[12.5%]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" onClick={() => setActiveTab("login")}>
            Login
          </TabsTrigger>
          <TabsTrigger value="signup" onClick={() => setActiveTab("signup")}>
            Signup
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <form onSubmit={handleLoginSubmit}>
              <CardHeader className="text-center">
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your credentials to login.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    name="email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => handleInputChange(e, "login")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    name="password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => handleInputChange(e, "login")}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button type="submit">Login</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card>
            <form onSubmit={handleSignupSubmit}>
              <CardHeader className="text-center">
                <CardTitle>Signup</CardTitle>
                <CardDescription>Create a new account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => handleInputChange(e, "signup")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    value={signupData.password}
                    onChange={(e) => handleInputChange(e, "signup")}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button type="submit">Signup</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthPage;
