import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Award, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { authAPI } from "@/lib/api";

export default function Login() {
  const [, setLocation] = useLocation();
  const [loginData, setLoginData] = useState({ idCardNumber: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showIdCard, setShowIdCard] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const response = await authAPI.userLogin(loginData);
      const result = response.data;

      if (result.success) {
        localStorage.setItem('user_token', result.token);
        localStorage.setItem('user_data', JSON.stringify(result.user));
        setLocation('/dashboard');
      } else {
        alert(result.error || 'Invalid ID card number');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      const errorMessage = error.response?.data?.error || 'Login failed - please try again';
      alert(errorMessage);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => setLocation('/')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>

        <Card>
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-primary" />
            </div>
            <CardTitle>Student Login</CardTitle>
            <p className="text-sm text-muted-foreground">Access your certificates and learning progress</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="idCardNumber">ID Card Number</Label>
                <div className="relative">
                  <Input
                    id="idCardNumber"
                    value={loginData.idCardNumber}
                    onChange={(e) => setLoginData(prev => ({ ...prev, idCardNumber: e.target.value.toUpperCase() }))}
                    placeholder="STU2024001"
                    required
                    type={showIdCard ? "text" : "password"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowIdCard(!showIdCard)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showIdCard ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Enter your student ID card number to access your certificates
                </p>
              </div>

              <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"></div>
                    Logging in...
                  </div>
                ) : (
                  'Login'
                )}
              </Button>
            </form>

         
          </CardContent>
        </Card>
      </div>
    </div>
  );
}