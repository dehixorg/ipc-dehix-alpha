import React from 'react';
import Link from 'react-router-dom';
import { ThemeToggle } from './components/shared/ThemeToggle';
import FreelancerRegisterForm from './components/form/register/FreelancerRegisterForm';
import { Button } from './components/ui/Button';

export default function SignUp() {
  return (
    <div className="relative min-h-screen">
      <div className="absolute left-4 top-4 sm:left-10 sm:top-10">
        <ThemeToggle />
      </div>
      <div className="flex items-center justify-center py-20 sm:py-12">
        <div className="mx-auto w-full px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6">
            <FreelancerRegisterForm />
            <div className="mt-4 text-center text-xs sm:text-sm">
              Already have an account?{' '}
              <Button 
                variant="outline" 
                size="sm" 
                className="ml-2"
                onClick={() => window.location.href = "/auth/login"}
              >
                Sign in
              </Button>
            </div>
            <p className="px-2 text-center text-xs text-muted-foreground sm:px-8 sm:text-sm">
              By clicking continue, you agree to our{' '}
              <Button 
                variant="link" 
                className="p-0"
                onClick={() => window.location.href = "/terms"}
              >
                Terms of Service
              </Button>{' '}
              and{' '}
              <Button 
                variant="link" 
                className="p-0"
                onClick={() => window.location.href = "/privacy"}
              >
                Privacy Policy
              </Button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}