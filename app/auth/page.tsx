"use client";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
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
import { signIn, useSession } from "next-auth/react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LoginData {
  email: string;
  password: string;
}

interface SignupData {
  name: string;
  email: string;
  password: string;
}

const TogglePasswordVisibility: React.FC<{
  isVisible: boolean;
  onToggle: () => void;
}> = ({ isVisible, onToggle }) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="absolute cursor-pointer select-none inset-y-0 right-4 flex items-center justify-center"
      aria-label={isVisible ? "Hide password" : "Show password"}
    >
      {isVisible ? (
        <EyeOff width={15} height={15} />
      ) : (
        <Eye width={15} height={15} />
      )}
    </button>
  );
};

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [loginData, setLoginData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [signupData, setSignupData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
  });
  const [isLoginPasswordVisible, setIsLoginPasswordVisible] = useState(false);
  const [isSignupPasswordVisible, setIsSignupPasswordVisible] = useState(false);

  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/");
    }
  }, [session, router]);

  const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!loginData.email || !isValidEmail(loginData.email)) {
      toast("Please enter a valid email.");
      return;
    }
    if (!loginData.password || !isStrongPassword(loginData.password)) {
      toast("Password is incorrect.");
      return;
    }

    try {
      const response = await signIn("credentials", {
        redirect: false,
        email: loginData.email,
        password: loginData.password,
      });

      if (response?.error) {
        toast("Invalid credentials" + response?.error);

        if (response?.url) {
          router.replace("/");
        }
      }

      if (response?.ok) {
        toast("Logged in successfully. 🎉");
        router.replace("/");
      }
    } catch (error: any) {
      toast("An error occurred. Please try again later.");
    }
  };

  const handleSignupSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!signupData.name) {
      toast("Please enter your name.");
      return;
    }
    if (!signupData.email || !isValidEmail(signupData.email)) {
      toast("Please enter a valid email.");
      return;
    }
    if (!signupData.password || !isStrongPassword(signupData.password)) {
      toast(
        "Password should be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one numeric digit, and one special character."
      );
      return;
    }

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
        }),
      });

      if (response.status === 400) {
        toast("Email already exists");
        return;
      }

      if (response.status === 200) {
        toast("Account created successfully. 🎉");

        // Sign in the user after account creation
        const signInResponse = await signIn("credentials", {
          redirect: false,
          email: signupData.email,
          password: signupData.password,
        });

        if (signInResponse?.error) {
          toast("Unable to signin, try again!");

          if (signInResponse?.url) router.replace("/");
        }
        return;
      }
    } catch (error: any) {
      toast("An error occurred. Please try again.");
    }
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

  const togglePasswordVisibility = (type: "login" | "signup") => {
    if (type === "login") {
      setIsLoginPasswordVisible((prev) => !prev);
    } else {
      setIsSignupPasswordVisible((prev) => !prev);
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
                <div className="space-y-1 relative">
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
                  <div className="relative">
                    <Input
                      id="login-password"
                      name="password"
                      className="pr-12"
                      type={isLoginPasswordVisible ? "text" : "password"}
                      value={loginData.password}
                      onChange={(e) => handleInputChange(e, "login")}
                    />
                    <TogglePasswordVisibility
                      isVisible={isLoginPasswordVisible}
                      onToggle={() => togglePasswordVisibility("login")}
                    />
                  </div>
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
                <div className="space-y-1 relative">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    id="signup-name"
                    name="name"
                    type="text"
                    value={signupData.name}
                    onChange={(e) => handleInputChange(e, "signup")}
                  />
                </div>
                <div className="space-y-1 relative">
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
                  <div className="relative">
                    <Input
                      id="signup-password"
                      name="password"
                      className="pr-12"
                      type={isSignupPasswordVisible ? "text" : "password"}
                      value={signupData.password}
                      onChange={(e) => handleInputChange(e, "signup")}
                    />
                    <TogglePasswordVisibility
                      isVisible={isSignupPasswordVisible}
                      onToggle={() => togglePasswordVisibility("signup")}
                    />
                  </div>
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
