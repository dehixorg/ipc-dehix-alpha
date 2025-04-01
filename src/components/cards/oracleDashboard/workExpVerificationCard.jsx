'use client';
import React, { useEffect, useState } from 'react';
import {
  MessageSquareIcon,
  Github,
  User2Icon,
  Phone,
  Building,
} from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { axiosInstance } from '../../../lib/axiosinstance';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../../components/ui/form';
import { RadioGroup, RadioGroupItem } from '../../../components/ui/radio-group';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '../../../components/ui/tooltip';
import { Textarea } from '../../../components/ui/textarea';
import { toast } from '../../../components/ui/use-toast';

const FormSchema = z.object({
  type: z.enum(['Approved', 'Denied'], {
    required_error: 'You need to select a type.',
  }),
  comment: z.string().optional(),
});

const WorkExpVerificationCard = ({
  _id,
  jobTitle,
  workDescription,
  startFrom,
  company,
  endTo,
  referencePersonName,
  referencePersonContact,
  githubRepoLink,
  comments,
  status,
  onStatusUpdate,
  onCommentUpdate,
}) => {
  const [verificationStatus, setVerificationStatus] = useState(status);
  const form = useForm({
    resolver: zodResolver(FormSchema),
  });
  const selectedType = form.watch('type');
  useEffect(() => {
    setVerificationStatus(status);
  }, [status]);

  async function onSubmit(data) {
    try {
      await axiosInstance.put(
        `/verification/${_id}/oracle?doc_type=experience`,
        {
          comments: data.comment,
          verification_status: data.type,
        },
      );
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    }
    setVerificationStatus(data.type);
    onStatusUpdate(data.type);
    onCommentUpdate(data.comment || '');
  }

  return (
    <Card className="max-w-full mx-auto md:min-w-[30vw]">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{jobTitle}</span>
          {githubRepoLink && (
            <a
              href={githubRepoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white underline ml-auto"
            >
              <Github />
            </a>
          )}
        </CardTitle>
        <CardDescription className="text-justify text-gray-600">
          <Badge
            className={
              verificationStatus === 'Pending'
                ? 'bg-warning-foreground text-white my-2'
                : verificationStatus === 'Approved'
                ? 'bg-success text-white my-2'
                : 'bg-red-500 text-white my-2'
            }
          >
            {verificationStatus}
          </Badge>
          <br />
          {workDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-4">
          <p className="mt-4 mb-3 text-m text-gray-600 flex items-center">
            <Building className="mr-2" />
            {company}
          </p>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm text-gray-600 flex items-center">
                <User2Icon className="mr-2" />
                {referencePersonName}
              </p>
            </TooltipTrigger>
            <TooltipContent side="bottom">{referencePersonName}</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm text-gray-600 flex items-center mt-2">
                <Phone className="mr-2" />
                {referencePersonContact}
              </p>
            </TooltipTrigger>
            <TooltipContent side="bottom">{referencePersonContact}</TooltipContent>
          </Tooltip>
          {comments && (
            <p className="mt-2 flex items-center text-gray-500 border p-3 rounded">
              <MessageSquareIcon className="mr-2" />
              {comments}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <div className="flex gap-4 text-gray-500">
          {new Date(startFrom).toLocaleDateString()} -{' '}
          {endTo !== 'current'
            ? new Date(endTo).toLocaleDateString()
            : 'Current'}
        </div>

        {verificationStatus === 'Pending' && (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Choose Verification Status:</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="Approved" />
                          </FormControl>
                          <FormLabel className="font-normal">Approved</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3">
                          <FormControl>
                            <RadioGroupItem value="Denied" />
                          </FormControl>
                          <FormLabel className="font-normal">Denied</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Comments:</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter comments:" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={!selectedType || form.formState.isSubmitting}>
                Submit
              </Button>
            </form>
          </Form>
        )}
      </CardFooter>
    </Card>
  );
};

export default WorkExpVerificationCard;