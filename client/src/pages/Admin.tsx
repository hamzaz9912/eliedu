import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
  Users,
  FileText,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Award,
  Calendar,
  Mail,
  Phone,
  MapPin,
  Shield,
  LogOut,
  Plus,
  UserPlus
} from "lucide-react";
import { type CourseRegistration } from "@/shared/schema";
import { authAPI, courseAPI, adminAPI, logout } from "@/lib/api";

export default function Admin() {
  const [registrations, setRegistrations] = useState<CourseRegistration[]>([]);
  const [selectedRegistration, setSelectedRegistration] = useState<CourseRegistration | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginData, setLoginData] = useState({ username: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [loginStep, setLoginStep] = useState<'login' | 'welcome'>('login');
  const [filter, setFilter] = useState<'all' | 'pending' | 'verified' | 'rejected'>('all');
  const [adminUsers, setAdminUsers] = useState<any[]>([]);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showAddStudent, setShowAddStudent] = useState(false);
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const [adminFormData, setAdminFormData] = useState({
    username: '',
    email: '',
    password: '',
    name: '',
    role: 'admin' as 'admin' | 'super_admin'
  });
  const [studentData, setStudentData] = useState({
    studentName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    idCardNumber: '',
    courses: [] as Array<{ language: string; level: string }>
  });
  const [availableCourses] = useState([
    { id: 'french-a1', language: 'French', level: 'A1' },
    { id: 'french-a2', language: 'French', level: 'A2' },
    { id: 'french-b1', language: 'French', level: 'B1' },
    { id: 'french-b2', language: 'French', level: 'B2' },
    { id: 'german-a1', language: 'German', level: 'A1' },
    { id: 'german-a2', language: 'German', level: 'A2' },
    { id: 'german-b1', language: 'German', level: 'B1' },
    { id: 'german-b2', language: 'German', level: 'B2' },
    { id: 'spanish-a1', language: 'Spanish', level: 'A1' },
    { id: 'spanish-a2', language: 'Spanish', level: 'A2' },
    { id: 'spanish-b1', language: 'Spanish', level: 'B1' },
    { id: 'spanish-b2', language: 'Spanish', level: 'B2' },
    { id: 'english-a1', language: 'English', level: 'A1' },
    { id: 'english-a2', language: 'English', level: 'A2' },
    { id: 'english-b1', language: 'English', level: 'B1' },
    { id: 'english-b2', language: 'English', level: 'B2' }
  ]);

  const [, setLocation] = useLocation();

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('admin_token');
    if (token) {
      setIsLoggedIn(true);
      fetchRegistrations();
      fetchAdminUsers();
    } else {
      setLocation('/admin-login');
    }
  }, []);

  const fetchAdminUsers = async () => {
    try {
      const response = await authAPI.getAdminUsers();
      setAdminUsers(response.data);
    } catch (error) {
      console.error('Failed to fetch admin users:', error);
    }
  };

  const fetchRegistrations = async () => {
    try {
      const response = await courseAPI.getRegistrations();
      setRegistrations(response.data);
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);

    try {
      const response = await fetch('/api/auth/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      console.log('Login response:', result);

      if (response.ok && result.success) {
        localStorage.setItem('admin_token', result.token);
        localStorage.setItem('admin_user', JSON.stringify(result.user));
        setIsLoggedIn(true);
        setLoginStep('welcome');
        fetchRegistrations();
        fetchAdminUsers();

        // Auto-redirect to dashboard after 2 seconds
        setTimeout(() => {
          setLoginStep('login'); // Reset for next time
        }, 2000);
      } else {
        alert(result.error || 'Invalid credentials');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed - please try again');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    // Mock forgot password - in production, this would send reset email
    alert(`Password reset link sent to ${resetEmail}`);
    setShowForgotPassword(false);
    setResetEmail('');
  };

  const updateRegistrationStatus = async (id: string, status: 'pending' | 'verified' | 'rejected', notes?: string) => {
    try {
      const updates: any = {
        status,
        verifiedAt: status === 'verified' ? new Date().toISOString() : undefined,
        adminNotes: notes,
      };

      await courseAPI.updateRegistration(id, updates);
      fetchRegistrations();
      setSelectedRegistration(null);
    } catch (error) {
      alert('Failed to update registration');
    }
  };

  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adminAPI.addStudent(studentData);
      alert('Student certificate issued successfully!');
      setStudentData({
        studentName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        idCardNumber: '',
        courses: []
      });
      setShowAddStudent(false);
    } catch (error) {
      alert('Failed to issue certificate');
    }
  };

  const addCourse = (course: { language: string; level: string }) => {
    if (!studentData.courses.find(c => c.language === course.language && c.level === course.level)) {
      setStudentData(prev => ({
        ...prev,
        courses: [...prev.courses, course]
      }));
    }
  };

  const removeCourse = (index: number) => {
    setStudentData(prev => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index)
    }));
  };

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await authAPI.createAdminUser(adminFormData);
      alert('Admin user created successfully!');
      setAdminFormData({
        username: '',
        email: '',
        password: '',
        name: '',
        role: 'admin'
      });
      setShowAddAdmin(false);
      fetchAdminUsers();
    } catch (error) {
      alert('Failed to create admin user');
    }
  };

  const filteredRegistrations = registrations.filter(reg =>
    filter === 'all' || reg.status === filter
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  if (!isLoggedIn) {
    if (loginStep === 'welcome') {
      return (
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Card className="w-full max-w-md text-center">
            <CardContent className="p-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-800 mb-2">Welcome Back!</h2>
              <p className="text-muted-foreground mb-6">Login successful. Redirecting to dashboard...</p>
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          {/* Forgot Password Modal */}
          {showForgotPassword && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md mx-4">
                <CardHeader>
                  <CardTitle>Forgot Password</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div>
                      <Label htmlFor="resetEmail">Email Address</Label>
                      <Input
                        id="resetEmail"
                        type="email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        placeholder="admin@example.com"
                        required
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">Send Reset Link</Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowForgotPassword(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

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
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowForgotPassword(true)}
                    className="text-sm text-primary hover:underline"
                  >
                    Forgot password?
                  </button>
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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8" />
              <div>
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                <p className="text-primary-foreground/80">European Language Institute</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowAddAdmin(!showAddAdmin)}
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Shield className="w-4 h-4 mr-2" />
                Add Admin
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowAddStudent(!showAddStudent)}
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add Student
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowUserManagement(!showUserManagement)}
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Shield className="w-4 h-4 mr-2" />
                Manage Users
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  logout();
                  setLocation('/admin-login');
                }}
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Admin Form */}
        {showAddAdmin && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Add New Admin User
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="adminUsername">Username</Label>
                    <Input
                      id="adminUsername"
                      value={adminFormData.username}
                      onChange={(e) => setAdminFormData(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="admin_username"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="adminEmail">Email</Label>
                    <Input
                      id="adminEmail"
                      type="email"
                      value={adminFormData.email}
                      onChange={(e) => setAdminFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="adminPassword">Password</Label>
                    <Input
                      id="adminPassword"
                      type="password"
                      value={adminFormData.password}
                      onChange={(e) => setAdminFormData(prev => ({ ...prev, password: e.target.value }))}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="adminName">Full Name</Label>
                    <Input
                      id="adminName"
                      value={adminFormData.name}
                      onChange={(e) => setAdminFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Administrator Name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="adminRole">Role</Label>
                    <Select
                      value={adminFormData.role}
                      onValueChange={(value: 'admin' | 'super_admin') =>
                        setAdminFormData(prev => ({ ...prev, role: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="super_admin">Super Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    <Shield className="w-4 h-4 mr-2" />
                    Create Admin User
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddAdmin(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Add Student Form */}
        {showAddStudent && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5" />
                Add Student & Issue Certificate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAddStudent} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="studentName">Student Name</Label>
                    <Input
                      id="studentName"
                      value={studentData.studentName}
                      onChange={(e) => setStudentData(prev => ({ ...prev, studentName: e.target.value }))}
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={studentData.email}
                      onChange={(e) => setStudentData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="student@example.com"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={studentData.phone}
                      onChange={(e) => setStudentData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+971-123456789"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth">Date of Birth</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={studentData.dateOfBirth}
                      onChange={(e) => setStudentData(prev => ({ ...prev, dateOfBirth: e.target.value }))}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="idCardNumber">ID Card Number</Label>
                    <Input
                      id="idCardNumber"
                      value={studentData.idCardNumber}
                      onChange={(e) => setStudentData(prev => ({ ...prev, idCardNumber: e.target.value.toUpperCase() }))}
                      placeholder="STU2024001"
                      required
                    />
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <Label>Available Courses</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                    {availableCourses.map((course) => (
                      <Button
                        key={`${course.language}-${course.level}`}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addCourse(course)}
                        className="text-xs"
                      >
                        {course.language} {course.level}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Selected Courses */}
                {studentData.courses.length > 0 && (
                  <div>
                    <Label>Selected Courses</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {studentData.courses.map((course, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {course.language} {course.level}
                          <button
                            type="button"
                            onClick={() => removeCourse(index)}
                            className="ml-1 text-xs hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button type="submit" className="flex-1">
                    <Award className="w-4 h-4 mr-2" />
                    Issue Certificate
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowAddStudent(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Admin User Management */}
        {showUserManagement && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Admin User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Current Admin Users</h3>
                <div className="grid gap-4">
                  {adminUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Shield className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">@{user.username} • {user.role}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <Badge variant={user.role === 'super_admin' ? 'default' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Login Credentials</h4>
                  <div className="space-y-2 text-sm">
                    <div className="grid grid-cols-3 gap-4 font-mono text-xs">
                      <span className="font-semibold">Username</span>
                      <span className="font-semibold">Password</span>
                      <span className="font-semibold">Role</span>
                    </div>
                    {adminUsers.map((user) => (
                      <div key={user.id} className="grid grid-cols-3 gap-4 font-mono text-xs bg-background p-2 rounded">
                        <span>{user.username}</span>
                        <span>{user.password}</span>
                        <span>{user.role}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{registrations.length}</p>
                  <p className="text-sm text-muted-foreground">Total Registrations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{registrations.filter(r => r.status === 'pending').length}</p>
                  <p className="text-sm text-muted-foreground">Pending Review</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{registrations.filter(r => r.status === 'verified').length}</p>
                  <p className="text-sm text-muted-foreground">Verified</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{registrations.filter(r => r.status === 'rejected').length}</p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Registrations</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Registrations List */}
        <div className="space-y-4">
          {filteredRegistrations.map((registration) => (
            <Card key={registration.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">{registration.fullName}</h3>
                      <p className="text-muted-foreground">{registration.email}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          {registration.countryCode} {registration.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(registration.submittedAt || '').toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(registration.status)}>
                      {getStatusIcon(registration.status)}
                      <span className="ml-1 capitalize">{registration.status}</span>
                    </Badge>

                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Registration Details</DialogTitle>
                        </DialogHeader>

                        <div className="space-y-6">
                          {/* Personal Info */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>Full Name</Label>
                              <p className="font-medium">{registration.fullName}</p>
                            </div>
                            <div>
                              <Label>Email</Label>
                              <p className="font-medium">{registration.email}</p>
                            </div>
                            <div>
                              <Label>Phone</Label>
                              <p className="font-medium">{registration.countryCode} {registration.phone}</p>
                            </div>
                            <div>
                              <Label>Date of Birth</Label>
                              <p className="font-medium">{new Date(registration.dateOfBirth).toLocaleDateString()}</p>
                            </div>
                          </div>

                          {/* Address */}
                          <div>
                            <Label>Address</Label>
                            <p className="font-medium">{registration.address}</p>
                          </div>

                          {/* ID Info */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label>ID Type</Label>
                              <p className="font-medium capitalize">{registration.idType.replace('_', ' ')}</p>
                            </div>
                            <div>
                              <Label>ID Number</Label>
                              <p className="font-medium">{registration.idNumber}</p>
                            </div>
                          </div>

                          {/* ID Document */}
                          {registration.idDocument && (
                            <div>
                              <Label>ID Document</Label>
                              <div className="mt-2">
                                <img
                                  src={registration.idDocument}
                                  alt="ID Document"
                                  className="max-w-full h-auto max-h-48 rounded-lg border"
                                />
                              </div>
                            </div>
                          )}

                          {/* Selected Courses */}
                          <div>
                            <Label>Selected Courses</Label>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {registration.selectedCourses.map((courseId) => (
                                <Badge key={courseId} variant="secondary">
                                  {courseId.toUpperCase()}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Admin Notes */}
                          {registration.adminNotes && (
                            <div>
                              <Label>Admin Notes</Label>
                              <p className="text-sm bg-muted p-3 rounded-lg">{registration.adminNotes}</p>
                            </div>
                          )}

                          {/* Status Update */}
                          <div className="border-t pt-6">
                            <Label>Update Status</Label>
                            <div className="flex gap-2 mt-2">
                              <Button
                                size="sm"
                                onClick={() => updateRegistrationStatus(registration.id!, 'verified')}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Verify & Issue Certificate
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateRegistrationStatus(registration.id!, 'rejected')}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredRegistrations.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-muted-foreground">No registrations found</h3>
            <p className="text-muted-foreground">Try adjusting your filter criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}