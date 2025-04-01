import { useState } from 'react';
import { LoaderCircle, Chrome, Key, Eye, EyeOff } from 'lucide-react';
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

// Mock user login functions
const loginUser = async (email, password) => {
  return new Promise((resolve, reject) => {
    if (email && password) {
      setTimeout(() => resolve({ user: { uid: 'mock-uid' } }), 1000);
    } else {
      reject(new Error('Invalid credentials'));
    }
  });
};

const loginGoogleUser = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ user: { uid: 'mock-google-uid' } }), 1000);
  });
};

const getUserData = async (userCredential) => {
  // Simulate fetching user data
  return {
    user: {
      uid: userCredential.user.uid,
      email: 'user@example.com',
      displayName: 'User Name',
    },
    claims: {
      type: 'freelancer',
    },
  };
};

// Mock OTP Login component
const OtpLogin = ({ phoneNumber, isModalOpen, setIsModalOpen }) => {
  return isModalOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Enter OTP</h2>
        <p>A verification code has been sent to {phoneNumber}</p>
        <div className="flex mt-4 justify-end">
          <Button variant="outline" onClick={() => setIsModalOpen(false)}>Close</Button>
        </div>
      </div>
    </div>
  ) : null;
};

// Mock axios instance
const axiosInstance = {
  get: async (url) => {
    if (url.includes('user_email')) {
      return {
        data: {
          phone: '+1234567890',
          phoneVerify: true,
        },
      };
    }
    return { data: { status: 'approved' } };
  },
};

export default function Login() {
  // State variables
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEmailLoginLoading, setIsEmailLoginLoading] = useState(false);
  const [isGoogleLoginLoading, setIsGoogleLoginLoading] = useState(false);
  
  // Mock Redux dispatch
  const dispatch = (action) => {
    console.log('Dispatched action:', action);
  };
  
  // Mock Redux action creator
  const setUser = (userData) => ({
    type: 'SET_USER',
    payload: userData,
  });

  const fetchKYCDetails = async (userId, userType) => {
    try {
      let endpoint = '';

      if (userType.toLowerCase() === 'business') {
        endpoint = `/business/kyc`;
      } else if (userType.toLowerCase() === 'freelancer') {
        endpoint = `/freelancer/${userId}/kyc`;
      }

      const userResponse = await axiosInstance.get(endpoint);
      const status = userResponse.data.status || null;

      return status;
    } catch (error) {
      console.error('KYC Fetch Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch KYC data. Please try again.',
      });
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsEmailLoginLoading(true);

    try {
      const response = await axiosInstance.get(
        `/public/user_email?user=${email}`,
      );
      setPhone(response.data.phone);
      if (!response.data.phoneVerify) {
        setIsModalOpen(true);
      } else {
        try {
          const userCredential = await loginUser(email, pass);
          const { user, claims } = await getUserData(userCredential);

          const result = await fetchKYCDetails(user.uid, claims.type);

          if (result) {
            dispatch(
              setUser({
                ...user,
                type: claims.type,
                kycStatus: result,
              }),
            );
          } else {
            dispatch(setUser({ ...user, type: claims.type }));
          }
          // In React, would typically use React Router for navigation
          window.location.href = `/dashboard/${claims.type}`;

          toast({
            title: 'Login Successful',
            description: 'You have successfully logged in.',
          });
        } catch (error) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Invalid Email or Password. Please try again.',
          });
          console.error(error.message);
        }
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Invalid Email or Password. Please try again.',
      });
      console.error(error.message);
    } finally {
      setIsEmailLoginLoading(false);
    }
  };

  const handleGoogle = async (e) => {
    e.preventDefault();
    setIsGoogleLoginLoading(true);

    try {
      const userCredential = await loginGoogleUser();
      const { user, claims } = await getUserData(userCredential);
      dispatch(setUser({ ...user, type: claims.type }));
      // In React, would typically use React Router for navigation
      window.location.href = `/dashboard/${claims.type}`;

      toast({
        title: 'Login Successful',
        description: 'You have successfully logged in with Google.',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to login with Google. Please try again.',
      });
      console.error(error.message);
    } finally {
      setIsGoogleLoginLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="w-full lg:grid lg:min-h-600 lg:grid-cols-2 xl:min-h-screen">
      <div className="absolute left-10 top-10">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-350 gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-gray-500">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleLogin}>
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
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="/auth/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = "/auth/forgot-password";
                    }}
                  >
                    Forgot your password?
                  </a>
                </div>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    onChange={(e) => setPass(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={toggleShowPassword}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={isEmailLoginLoading}
              >
                {isEmailLoginLoading ? (
                  <>
                    <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                    <span>Logging in...</span>
                  </>
                ) : (
                  <>
                    <Key className="mr-2 h-4 w-4" />
                    <span>Login</span>
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                className="w-full"
                disabled={isGoogleLoginLoading}
                onClick={handleGoogle}
              >
                {isGoogleLoginLoading ? (
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Chrome className="mr-2 h-4 w-4" />
                )}{' '}
                <span>Google Login</span>
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Button 
              variant="outline" 
              size="sm" 
              className="ml-2"
              onClick={() => window.location.href = "/auth/sign-up/freelancer"}
            >
              Sign up
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
      {/* OTP Login */}
      <OtpLogin
        phoneNumber={phone}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </div>
  );
}