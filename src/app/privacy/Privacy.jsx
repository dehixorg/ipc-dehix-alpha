import React from 'react';

// Since we're removing shadcn/ui components, I'll create basic styled components
const Card = ({ children, className }) => (
  <div className={`bg-white rounded-lg border shadow-lg ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="border-b p-4">
    {children}
  </div>
);

const CardDescription = ({ children }) => (
  <div className="p-4">
    {children}
  </div>
);

const Privacy = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-lg p-6">
        <CardHeader>
          <p className="text-center text-xl font-semibold">
            Page Under Development
          </p>
        </CardHeader>
        <CardDescription>
          <p className="text-center text-gray-600">
            We&apos;re working hard to bring this page to you. Stay tuned for
            updates!
          </p>
        </CardDescription>
      </Card>
    </div>
  );
};

export default Privacy;