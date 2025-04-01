import React from 'react';
import { Github, MessageSquareIcon, CalendarIcon } from 'lucide-react';
import { Badge } from '../../components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../components/ui/card';

const DateRange = ({ startDate, endDate }) => {
  const formattedStartDate = startDate
    ? new Date(startDate).toLocaleDateString()
    : 'Start Date N/A';
  const formattedEndDate =
    endDate === 'current' || !endDate
      ? 'Still Going On!'
      : new Date(endDate).toLocaleDateString();

  return (
    <div className="flex relative whitespace-nowrap items-start sm:items-center gap-1 rounded-md">
      <div className="flex items-center gap-1 sm:gap-2">
        <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        <span className="text-xs sm:text-sm font-medium">{`Start: ${formattedStartDate}`}</span>
      </div>
      <p>-</p>
      <div className="flex items-center">
        <span className="text-xs sm:text-sm font-medium">{formattedEndDate}</span>
      </div>
    </div>
  );
};

const ExperienceCard = ({
  company,
  jobTitle,
  workDescription,
  workFrom,
  workTo,
  referencePersonName,
  referencePersonContact,
  githubRepoLink,
  verificationStatus,
  comments,
}) => {
  const getBadgeStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-500 hover:bg-yellow-600';
      case 'verified':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return 'bg-blue-500 hover:bg-blue-600';
    }
  };

  return (
    <Card className="w-full mx-auto md:max-w-2xl bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="flex items-center">
          {company}
          {githubRepoLink && (
            <a href={githubRepoLink} className="ml-auto text-white underline" target="_blank" rel="noopener noreferrer">
              <Github className="w-5 h-5" />
            </a>
          )}
        </CardTitle>
        <CardDescription className="block mt-1 uppercase tracking-wide leading-tight font-medium">
          {jobTitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Badge className={`px-3 py-1 text-xs font-bold rounded-full border transition ${getBadgeStyle(verificationStatus)}`}>
          {verificationStatus.toUpperCase()}
        </Badge>
        <p className="text-gray-300 pt-4">{workDescription}</p>
        <p className="mt-2 flex items-center text-gray-500 border p-3 rounded">
          <MessageSquareIcon className="pr-1 w-4 h-4" />
          {comments}
        </p>
        <div className="mt-4">
          <p className="text-sm text-gray-400">Reference: {referencePersonName}</p>
          <p className="text-sm text-gray-400">Contact: {referencePersonContact}</p>
        </div>
      </CardContent>
      <CardFooter className="flex">
        <DateRange startDate={workFrom} endDate={workTo} />
      </CardFooter>
    </Card>
  );
};

export default ExperienceCard;