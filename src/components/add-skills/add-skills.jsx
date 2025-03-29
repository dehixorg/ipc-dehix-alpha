'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';

const formSchema = z.object({
  skillName: z.string().nonempty('Skill name is required'),
  skillLevel: z
    .number()
    .min(0, 'Must be at least 0')
    .max(5, 'Max is 5'),
  yearsOfExperience: z
    .number()
    .min(0, 'Must be a non-negative number'),
  interviewStatus: z.string().nonempty('Interview status is required'),
  interviewInfoId: z.string().nonempty('Interview info ID is required'),
  interviewerRating: z
    .number()
    .min(0, 'Must be at least 0')
    .max(5, 'Max is 5'),
});

// type FormSchema = z.infer<typeof formSchema>;

export default function AddSkillForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      skillName: '',
      skillLevel: 0,
      yearsOfExperience: 0,
      interviewStatus: '',
      interviewInfoId: '',
      interviewerRating: 0,
    },
  });

  /** @param {import('zod').infer<typeof formSchema>} values */
  const handleSubmit = (values) => {
    console.log({ values });
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full grid gap-4"
          style={{ gridTemplateColumns: '1fr 1fr' }}
        >
          {/* Skill Name */}
          <FormField
            control={form.control}
            name="skillName"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Skill Name</FormLabel>
                <FormControl>
                  <Input placeholder="Skill name" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Skill Level - Dropdown */}
          <FormField
            control={form.control}
            name="skillLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Skill Level</FormLabel>
                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5].map((level) => (
                      <SelectItem key={level} value={String(level)}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Years of Experience */}
          <FormField
            control={form.control}
            name="yearsOfExperience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Years of Experience</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Years of experience"
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Interview Status */}
          <FormField
            control={form.control}
            name="interviewStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interview Status</FormLabel>
                <FormControl>
                  <Input placeholder="Interview status" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Interview Info ID */}
          <FormField
            control={form.control}
            name="interviewInfoId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interview Info ID</FormLabel>
                <FormControl>
                  <Input placeholder="Interview info ID" type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Interviewer Rating - Dropdown */}
          <FormField
            control={form.control}
            name="interviewerRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interviewer Rating</FormLabel>
                <Select onValueChange={(value) => field.onChange(Number(value))} defaultValue={String(field.value)}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[0, 1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem key={rating} value={String(rating)}>
                        {rating}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button type="submit" className="w-full col-span-2">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
