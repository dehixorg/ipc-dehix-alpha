import { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

// Assuming these components are available in your React project
// You'll need to create or import equivalent components
const ThemeToggle = () => <button>Toggle Theme</button>;
const Button = ({ children, type, className, disabled, asChild, variant, size, onClick }) => (
  <button 
    type={type} 
    className={`${className} ${variant === 'outline' ? 'border border-gray-300' : 'bg-blue-600 text-white'} 
              ${size === 'sm' ? 'text-sm py-1 px-2' : 'py-2 px-4'} rounded`}
    disabled={disabled}
    onClick={onClick}
  >
    {children}
  </button>
);
const Input = ({ id, type, placeholder, value, onChange, required }) => (
  <input
    id={id}
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    required={required}
    className="w-full p-2 border rounded"
  />
);
const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="font-medium">
    {children}
  </label>
);

// Mock toast function
const toast = ({ title, description, variant }) => {
  console.log(`${variant || 'default'} toast: ${title} - ${description}`);
};

// Mock password reset function
const resetPassword = async (email) => {
  // Simulate API call
  return new Promise((resolve, reject) => {
    if (email && email.includes('@')) {
      setTimeout(resolve, 1000);
    } else {
      reject(new Error('Invalid email'));
    }
  });
};

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await resetPassword(email);
      toast({
        title: 'Success',
        description: 'Password reset email sent! Please check your inbox.',
      });
      // In React, you would typically use React Router for navigation
      // This is a simplified approach
      window.location.href = '/auth/login';
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid Email or Password. Please try again.',
      });
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-600 lg:grid-cols-2 xl:min-h-screen">
      <div className="absolute left-10 top-10">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-350 gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Forgot Password</h1>
            <p className="text-balance text-gray-500">
              Enter your email address below to reset your password
            </p>
          </div>
          <form onSubmit={handleForgotPassword}>
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Remembered your password?{' '}
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2"
              onClick={() => window.location.href = '/auth/sign-in'}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden lg:block">
        <img
          src="/bg.png"
          alt="Background"
          className="h-full w-full object-cover dark:brightness-20 dark:invert"
        />
      </div>
    </div>
  );
}