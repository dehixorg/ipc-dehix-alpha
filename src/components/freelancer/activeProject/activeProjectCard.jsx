'use client';
import React from 'react';
import { Mail } from 'lucide-react'; // Importing Mail icon from Lucide React

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip';

// Define the props structure for the project data
// @typedef {Object} ProjectProps
// @property {string} companyName
// @property {string} role
// @property {string} projectType
// @property {string} description
// @property {string[]} skillsRequired
// @property {string} [start]
// @property {string|'current'} [end]
// @property {string} email
// @property {string} experience

// Define the functional component for displaying the project information
// Define the functional component for displaying the project information
const ActiveProjectCards = ({
  role,
  projectType,
  description,
  skillsRequired,
  start,
  end,
  email,
  experience,
}) => {
  return (
    <Card className="max-w-full md:max-w-2xl">
      {/* Card Header containing company name and project details */}
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{companyName}</span>
        </CardTitle>
        <CardDescription className="mt-1 text-justify text-gray-400">
          {/* Badge for project status */}
          <Badge className="bg-orange-500 text-white my-2">PENDING</Badge>
          <br />
          <strong className="text-white">Project Type:</strong> {projectType}
          <div className="mt-2">
            <p>{description}</p>
          </div>
        </CardDescription>
      </CardHeader>
      
      {/* Card Content displaying skills, role, email, and experience */}
      <CardContent>
        <div className="mt-2">
          <span className="font-semibold">Skills Required:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {/* Loop through skills and display them as badges */}
            {skillsRequired.map((skill, index) => (
              <Badge key={index} className="uppercase" variant="secondary">
                {skill}
              </Badge>
            ))}
          </div>
          <div className="mt-2">
            <p className="text-gray-400">
              <strong className="font-semibold text-white mr-1">Role:</strong>{' '}
              {role}
            </p>
          </div>
        </div>
        
        {/* Tooltip for email address */}
        <div className="mt-5">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm text-gray-400 flex items-center">
                <Mail className="mr-2" />
                {email}
              </p>
            </TooltipTrigger>
            <TooltipContent side="bottom">{email}</TooltipContent>
          </Tooltip>
        </div>
        
        {/* Optional experience field */}
        {experience && (
          <p className="mt-2 flex items-center text-gray-400">
            <strong className="text-gray-400 mr-1">Experience:</strong>{' '}
            {experience}
          </p>
        )}
      </CardContent>

      {/* Card Footer with project duration */}
      <CardFooter className="flex flex-col items-center">
        <div className="flex gap-4 text-gray-400">
          {/* Display start and end dates */}
          {start ? new Date(start).toLocaleDateString() : 'N/A'} -
          {end && end !== 'current'
            ? new Date(end).toLocaleDateString()
            : end || 'N/A'}
        </div>
      </CardFooter>
    </Card>
  );
};

export default ActiveProjectCards;
