import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';

import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetTrigger,
} from '../../../components/ui/sheet';
import { Button } from '../../../components/ui/button';

const SHEET_SIDES = ['left'];

const FreelancerCard = ({
  name,
  skills,
  domains,
  experience,
  profile,
  userName,
  monthlyPay,
  Github,
  LinkedIn,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="sm:mx-10 mb-3 max-w-3xl">
      <Card className="w-full">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12 rounded-full">
              <AvatarImage src={profile} alt={name} />
            </Avatar>
            <div>
              <CardTitle className="text-lg font-semibold">{name}</CardTitle>
              <p className="text-sm text-gray-500">@{userName}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Skills Section */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Domains Section */}
            <div>
              <h3 className="text-sm font-semibold mb-2">Domains</h3>
              <div className="flex flex-wrap gap-2">
                {domains.map((domain, index) => (
                  <Badge key={index} variant="outline">
                    {domain}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Experience and Monthly Pay */}
            <div className="flex justify-between items-center">
              <div>
                <span className="text-sm font-semibold">Experience: </span>
                <span>{experience} years</span>
              </div>
              <div>
                <span className="text-sm font-semibold">Monthly Pay: </span>
                <span>${monthlyPay}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {Github && (
                <Link
                  href={Github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  GitHub
                </Link>
              )}
              {LinkedIn && (
                <Link
                  href={LinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  LinkedIn
                </Link>
              )}
            </div>

            {/* Sheet Trigger */}
            <div className="flex justify-end">
              {SHEET_SIDES.map((side) => (
                <Sheet key={side}>
                  <SheetTrigger asChild>
                    <Button variant="outline">View Profile</Button>
                  </SheetTrigger>
                  <SheetContent side={side} className="w-[400px] sm:w-[540px]">
                    <SheetHeader>
                      <SheetTitle>Freelancer Profile</SheetTitle>
                    </SheetHeader>
                    <div className="py-6">
                      {/* Add detailed profile content here */}
                    </div>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Add PropTypes validation
FreelancerCard.propTypes = {
  name: PropTypes.string.isRequired,
  skills: PropTypes.arrayOf(PropTypes.string),
  domains: PropTypes.arrayOf(PropTypes.string),
  experience: PropTypes.string,
  profile: PropTypes.string,
  userName: PropTypes.string,
  monthlyPay: PropTypes.string,
  Github: PropTypes.string,
  LinkedIn: PropTypes.string,
};

// Add default props
FreelancerCard.defaultProps = {
  skills: [],
  domains: [],
  experience: 'N/A',
  profile: '/path/to/default-avatar.jpg',
  userName: '',
  monthlyPay: 'N/A',
  Github: '',
  LinkedIn: '',
};

export default FreelancerCard;