import React from 'react';
import { Github, MessageSquareIcon } from 'lucide-react';
import DateRange from './dateRange';
import { Badge } from '../../components/ui/badge';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../components/ui/card';

const ProjectCard = ({
  projectName,
  description,
  verified,
  githubLink,
  start,
  end,
  refer,
  techUsed,
  role,
  projectType,
  comments,
}) => {
  return (
    <Card className="w-full mx-auto md:max-w-2xl bg-black text-white">
      <CardHeader>
        <CardTitle className="flex items-center">
          {projectName}
          {githubLink && (
            <a
              href={githubLink}
              className="ml-auto text-white underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github />
            </a>
          )}
        </CardTitle>
        <CardDescription className="mt-1 uppercase tracking-wide leading-tight font-medium">
          {projectType}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {verified ? (
          <Badge className="bg-green-500 hover:bg-green-600">VERIFIED</Badge>
        ) : (
          <Badge className="bg-yellow-500 hover:bg-yellow-600">PENDING</Badge>
        )}
        <p className="text-gray-300 pt-4">{description}</p>
        <p className="mt-2 flex items-center text-gray-500 border p-3 rounded">
          <MessageSquareIcon className="mr-2" />
          {comments}
        </p>
        <div className="mt-4">
          <p className="text-sm text-gray-400">Reference: {refer}</p>
          <p className="text-sm text-gray-400">Role: {role}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {techUsed.map((tech, index) => (
            <Badge className="uppercase text-xs font-normal bg-gray-600 px-2 py-1" key={index}>
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <DateRange startDate={start} endDate={end} />
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;