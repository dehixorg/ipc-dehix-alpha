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

const formSchema = z.object({
  id: z.string().nonempty('ID is required'),
  projectName: z.string().nonempty('Project Name is required'),
  description: z.string().nonempty('Description is required'),
  verified: z.string().nonempty('Verified is required'),
  githubLink: z.string().url('Invalid URL'),
  startDate: z.string().nonempty('Start Date is required'),
  endDate: z.string().nonempty('End Date is required'),
  refer: z.string().nonempty('Refer is required'),
  techUsed: z.array(z.string()).min(1, 'At least one tech is required'),
  role: z.string().nonempty('Role is required'),
  projectType: z.string().nonempty('Project Type is required'),
  oracleAssigned: z.string().nonempty('Oracle Assigned is required'),
  verificationStatus: z.string().nonempty('Verification Status is required'),
  verificationUpdateTime: z.string().nonempty('Verification Update Time is required'),
  comments: z.string().nonempty('Comments are required'),
});

// type FormSchema = z.infer<typeof formSchema>;

export default function ProjectForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: '',
      projectName: '',
      description: '',
      verified: '',
      githubLink: '',
      startDate: '',
      endDate: '',
      refer: '',
      techUsed: [''], // Supports multiple technologies
      role: '',
      projectType: '',
      oracleAssigned: '',
      verificationStatus: '',
      verificationUpdateTime: new Date().toISOString().slice(0, 16), // Auto-format current date
      comments: '',
    },
  });

  const handleSubmit = (values) => {
    console.log('📝 Form Submission:', {
      ...values,
      verificationUpdateTime: new Date(values.verificationUpdateTime).toISOString(),
    });
  };

  const formFields = [
    { name: 'id', label: 'ID', type: 'text' },
    { name: 'projectName', label: 'Project Name', type: 'text' },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'verified', label: 'Verified', type: 'text' },
    { name: 'githubLink', label: 'GitHub Link', type: 'url' },
    { name: 'startDate', label: 'Start Date', type: 'date' },
    { name: 'endDate', label: 'End Date', type: 'date' },
    { name: 'refer', label: 'Refer', type: 'text' },
    { name: 'role', label: 'Role', type: 'text' },
    { name: 'projectType', label: 'Project Type', type: 'text' },
    { name: 'oracleAssigned', label: 'Oracle Assigned', type: 'text' },
    { name: 'verificationStatus', label: 'Verification Status', type: 'text' },
    { name: 'verificationUpdateTime', label: 'Verification Update Time', type: 'datetime-local' },
    { name: 'comments', label: 'Comments', type: 'text' },
  ];

  return (
    <main className="flex min-h-screen items-center justify-center p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="grid grid-cols-1 gap-6 max-w-md w-full md:grid-cols-2"
        >
          {formFields.map(({ name, label, type }) => (
            <FormField
              key={name}
              control={form.control}
              name={name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold">{label}</FormLabel>
                  <FormControl>
                    <Input placeholder={label} type={type} {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          {/* Multi-Input for Tech Used */}
          <FormField
            control={form.control}
            name="techUsed"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-bold">Tech Used</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Comma-separated technologies"
                    type="text"
                    value={field.value.join(', ')}
                    onChange={(e) => field.onChange(e.target.value.split(',').map((tech) => tech.trim()))}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full col-span-2">
            Submit
          </Button>
        </form>
      </Form>
    </main>
  );
}
