'use client';
import React, { useEffect, useState } from 'react';
import { MessageSquareIcon, MapPin } from 'lucide-react';
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

const EducationVerificationCard = ({
  _id,
  type,
  degree,
  location,
  startFrom,
  endTo,
  grade,
  fieldOfStudy,
  comments,
  status,
  onStatusUpdate,
  onCommentUpdate,
}) => {
  const [verificationStatus, setVerificationStatus] = useState(status);
  const form = useForm({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
  });

  const selectedType = form.watch('type');

  useEffect(() => {
    setVerificationStatus(status);
  }, [status]);

  async function onSubmit(data) {
    try {
      await axiosInstance.put(
        `/verification/${_id}/oracle?doc_type=education`,
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
    <Card className="max-w-full md:max-w-2xl">
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>{type}</span>
          {verificationStatus === 'pending' || verificationStatus === 'added' ? (
            <Badge className="bg-warning-foreground text-white">PENDING</Badge>
          ) : verificationStatus === 'Approved' ? (
            <Badge className="bg-success text-white">Approved</Badge>
          ) : (
            <Badge className="bg-red-500 text-white">Denied</Badge>
          )}
        </CardTitle>
        <CardDescription className="text-justify text-gray-600">
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-lg text-gray-600 flex items-center mt-3">
                <MapPin className="mr-2" />
                {location}
              </p>
            </TooltipTrigger>
            <TooltipContent side="bottom">Location</TooltipContent>
          </Tooltip>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mt-2">
          <p className="text-m text-gray-600 mb-2">
            <span className="text-gray-500 font-semibold">Degree:</span> {degree}
          </p>
          <p className="text-m text-gray-600 mb-2">
            <span className="text-gray-500 font-semibold">Field Of Study:</span> {fieldOfStudy}
          </p>
          <p className="text-m text-gray-600 mb-2">
            <span className="text-gray-500 font-semibold">Grade:</span> {grade}
          </p>
          {comments && (
            <p className="mt-2 flex items-center text-gray-500 border p-3 rounded">
              <MessageSquareIcon className="mr-2" />
              {comments}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <div className="flex flex-1 gap-4">
          {new Date(startFrom).toLocaleDateString()} -
          {endTo !== 'current' ? new Date(endTo).toLocaleDateString() : 'Current'}
        </div>
        {(verificationStatus === 'pending' || verificationStatus === 'added') && (
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
                        className="flex flex-row space-x-4"
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

export default EducationVerificationCard;
