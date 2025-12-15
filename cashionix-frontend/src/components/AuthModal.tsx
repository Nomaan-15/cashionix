"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Lock, Mail, User, UserPlus } from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function AuthModal({ isOpen, onClose, onSuccess }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const resetForm = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setFullName("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        await login(username, password);
      } else {
        if (!email || !fullName) {
          setError("All fields are required");
          setLoading(false);
          return;
        }
        await register(username, email, password, fullName);
      }
      
      resetForm();
      onClose();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-slate-800 border-slate-700 text-slate-100">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            {isLogin ? (
              <>
                <Lock className="w-6 h-6 text-cyan-400" />
                Welcome Back
              </>
            ) : (
              <>
                <UserPlus className="w-6 h-6 text-cyan-400" />
                Create Account
              </>
            )}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {isLogin
              ? "Login to continue selling your device"
              : "Register to get the best price for your device"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-900/20 border border-red-800 rounded-lg text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-slate-300 flex items-center gap-2">
                <User className="w-4 h-4 text-cyan-400" />
                Full Name
              </Label>
              <Input
                id="fullName"
                type="text"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin}
                className="bg-slate-900 border-slate-700 text-slate-300 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="username" className="text-slate-300 flex items-center gap-2">
              <User className="w-4 h-4 text-cyan-400" />
              Username
            </Label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="bg-slate-900 border-slate-700 text-slate-300 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-400" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={!isLogin}
                className="bg-slate-900 border-slate-700 text-slate-300 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300 flex items-center gap-2">
              <Lock className="w-4 h-4 text-cyan-400" />
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-slate-900 border-slate-700 text-slate-300 placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-6 text-lg shadow-lg shadow-cyan-500/20 transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isLogin ? "Logging in..." : "Creating account..."}
              </div>
            ) : (
              <>{isLogin ? "Login" : "Create Account"}</>
            )}
          </Button>

          <div className="text-center">
            <button
              type="button"
              onClick={switchMode}
              className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <span className="font-semibold underline">Register here</span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span className="font-semibold underline">Login here</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-700">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <AlertCircle className="w-4 h-4 text-cyan-400" />
            <span>Your data is secure and encrypted</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}