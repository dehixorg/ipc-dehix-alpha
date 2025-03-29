'use client';
import React from 'react';
import { CalendarIcon, ExternalLink } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';

const DateRange = ({ startDate, endDate }) => {
  const formattedStartDate = startDate
    ? typeof startDate === 'string'
      ? new Date(startDate).toLocaleDateString()
      : new Date(startDate).toLocaleDateString()
    : 'Start Date N/A';

  const formattedEndDate =
    endDate === 'current' || !endDate
      ? 'Still Going On!'
      : typeof endDate === 'string'
      ? new Date(endDate).toLocaleDateString()
      : new Date(endDate).toLocaleDateString();

  return (
    <div className="flex items-center gap-2">
      <CalendarIcon className="w-4 h-4" />
      <span className="text-sm font-medium">{formattedStartDate} - {formattedEndDate}</span>
    </div>
  );
};

const EducationInfoCard = ({ degree, universityName, fieldOfStudy, startDate, endDate, grade }) => {
  return (
    <Card className="w-full mx-auto md:max-w-2xl">
      <CardHeader>
        <CardTitle>{universityName || 'University Name'}</CardTitle>
        <CardDescription className="uppercase font-medium">
          {degree || 'Degree'} in {fieldOfStudy || 'Field of Study'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="pt-4">Grade: {grade || 'N/A'}</p>
      </CardContent>
      <CardFooter>
        <DateRange startDate={startDate} endDate={endDate} />
      </CardFooter>
    </Card>
  );
};

const ConsultantCard = ({ name, skills, domains, description, urls, perHourRate }) => {
  const skillList = skills.split(',').map(skill => skill.trim());
  const domainList = domains.split(',').map(domain => domain.trim());

  return (
    <Card className="mb-4 bg-black text-white">
      <CardHeader className="p-4 border-b border-gray-700">
        <CardTitle className="text-xl font-semibold">{name}</CardTitle>
        <CardDescription className="text-sm text-gray-400 mt-1">
          {skillList.map(skill => <Badge key={skill} className="mr-2">{skill}</Badge>)}
          {domainList.map(domain => <Badge key={domain} className="mr-2">{domain}</Badge>)}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4">
        {description && <p className="mb-2">{description}</p>}
        {urls?.length > 0 && (
          <div className="mb-2">
            <p className="font-semibold text-gray-300 mb-1">URLs:</p>
            <ul>
              {urls.map((url, index) => (
                <li key={index} className="mb-1">
                  <a href={url.value} target="_blank" rel="noopener noreferrer" className="text-blue-400 flex items-center">
                    <ExternalLink className="mr-1 w-4 h-4" /> {url.value}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 border-t border-gray-700">
        {perHourRate !== undefined && <p className="mt-2 font-semibold">Per Hour Rate: ${perHourRate}</p>}
      </CardFooter>
    </Card>
  );
};

export { EducationInfoCard, ConsultantCard };