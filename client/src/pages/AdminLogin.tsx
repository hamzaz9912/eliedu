import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Eye, EyeOff, ArrowLeft } from "lucide-react";
import axios from "axios";

export default function AdminLogin() {
  const [, setLocation] = useLocation();
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      // First get the list of admin users
      const usersResponse = await axios.get('http://localhost:5000/api/auth/users', {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const adminUsers = usersResponse.data;

      console.log('Admin users:', adminUsers);

      // Find the user with matching credentials
      const user = adminUsers.find((u: any) =>
        u.username === loginData.username && u.password === loginData.password
      );

      if (user) {
        // For mock data, use default password since password isn't stored
        if (loginData.username === 'admin' && loginData.password === 'admin123') {
          // Generate token and login
          const token = `admin_token_${user.id || user._id}_${Date.now()}`;
          localStorage.setItem('admin_token', token);
          localStorage.setItem('admin_user', JSON.stringify({
            id: user.id || user._id,
            username: user.username,
            role: user.role,
            name: user.name,
            email: user.email
          }));
          setLocation('/admin');
        } else {
          alert('Invalid username or password');
        }
      } else {
        alert('Invalid username or password');
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      if (error.code === 'ERR_NETWORK') {
        alert('Network error - please check if the server is running on port 5000');
      } else {
        const errorMessage = error.response?.data?.error || 'Login failed - please try again';
        alert(errorMessage);
      }
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
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle>Admin Login</CardTitle>
            <p className="text-sm text-muted-foreground">Access the European Language Institute admin panel</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={loginData.username}
                  onChange={(e) => setLoginData(prev => ({ ...prev, username: e.target.value }))}
                  placeholder="admin"
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={loginData.password}
                    onChange={(e) => setLoginData(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Enter password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
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