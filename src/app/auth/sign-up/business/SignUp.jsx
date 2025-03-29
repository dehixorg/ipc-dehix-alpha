import { useState } from 'react';

// Mock ThemeToggle component
const ThemeToggle = () => <button>Toggle Theme</button>;

// Mock Button component
const Button = ({ children, variant, size, className, asChild, onClick }) => (
  <button 
    className={`${className} ${variant === 'outline' ? 'border border-gray-300' : ''} 
               ${variant === 'link' ? 'underline' : ''} 
               ${size === 'sm' ? 'text-sm py-1 px-2' : 'py-2 px-4'} rounded`}
    onClick={onClick}
  >
    {children}
  </button>
);

// Mock business register form component
const BusinessRegisterForm = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Implement registration logic here
  };

  return (
    <div className="rounded-lg border p-6 shadow-md">
      <h1 className="mb-6 text-center text-2xl font-bold">Register Your Business</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="mb-2 block font-medium">Business Name</label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="mb-2 block font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <div className="mb-6">
          <label className="mb-2 block font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full rounded border p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded bg-blue-600 py-2 font-medium text-white"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default function SignUp() {
  return (
    <div className="relative min-h-screen w-full">
      <div className="absolute left-4 top-4 sm:left-10 sm:top-10">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center py-20 sm:py-12">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            <BusinessRegisterForm />
            <div className="mt-4 text-center text-xs sm:text-sm">
              Already have an account?{' '}
              <a 
                href="/auth/login"
                className="ml-2 border border-gray-300 rounded text-sm py-1 px-2 inline-block"
              >
                Sign in
              </a>
            </div>
            <p className="px-2 text-center text-xs text-gray-500 sm:px-8 sm:text-sm">
              By clicking continue, you agree to our{' '}
              <a href="/terms" className="underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="underline">
                Privacy Policy.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}