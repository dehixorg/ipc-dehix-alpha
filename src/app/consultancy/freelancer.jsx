'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Boxes, Home, PackageOpen, Plus, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { z } from 'zod';

import ConsultantCard from '../../components/cards/ConsultantCard';
import { ProjectCard } from '../../components/cards/projectCard';
import Header from '../../components/header/header';
import SidebarMenu from '../../components/menu/sidebarMenu';
import { Button } from '../../components/ui/button';
import { CardTitle } from '../../components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../../components/ui/dialog';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../../components/ui/form';
import { Input } from '../../components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../components/ui/select';
import { Separator } from '../../components/ui/separator';
import { toast } from '../../components/ui/use-toast';
import { axiosInstance } from '../../lib/axiosinstance';
import { ProjectStatus } from '../../utils/freelancer/enum';

// Define the schema for the form using Zod
const consultancyFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  skills: z.string().min(1, 'Skill is required'),
  domains: z.string().min(1, 'Domain is required'),
  description: z.string().optional(),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      }),
    )
    .optional(),
  perHourRate: z
    .preprocess(
      (val) => (val === '' ? undefined : Number(val)),
      z.number().min(0, 'Per hour rate must be a positive number'),
    )
    .optional(),
});

export default function ConsultancyPage() {
  const experience = 5;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [consultants, setConsultants] = useState([]);
  const [skills, setSkills] = useState([]);
  const [domains, setDomains] = useState([]);
  const user = useSelector((state) => state.user);
  const [responseData, setResponseData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/project/business`);
        setResponseData(response.data.data);

        const skillsResponse = await axiosInstance.get('/skills');
        setSkills(skillsResponse.data.data);

        const domainsResponse = await axiosInstance.get('/domain');
        setDomains(domainsResponse.data.data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong.Please try again.',
        });
        console.error('API Error:', error);
      }
    };

    fetchData();
  }, [user.uid]);

  const completedProjects = responseData.filter(
    (project) => project.status === ProjectStatus.COMPLETED,
  );
  const pendingProjects = responseData.filter(
    (project) => project.status !== ProjectStatus.COMPLETED,
  );

  const form = useForm({
    resolver: zodResolver(consultancyFormSchema),
    defaultValues: {
      name: '',
      skills: '',
      description: '',
      urls: [{ value: '' }],
      perHourRate: undefined,
    },
    mode: 'all',
  });

  const {
    fields: urlFields,
    append: appendUrl,
    remove: removeUrl,
  } = useFieldArray({
    name: 'urls',
    control: form.control,
  });

  const menuItemsTop = [
    {
      href: '#',
      icon: <Boxes className="h-4 w-4 transition-all group-hover:scale-110" />,
      label: 'Dehix',
    },
  ];

  const menuItemsBottom = [
    {
      href: '/dashboard/freelancer',
      icon: <Home className="h-5 w-5" />,
      label: 'Settings',
    },
  ];

  const onSubmit = async (data) => {
    try {
      setConsultants([...consultants, data]);
      form.reset();
      setIsDialogOpen(false);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong.Please try again.',
      });
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarMenu
        menuItemsTop={menuItemsTop}
        menuItemsBottom={menuItemsBottom}
        active="Consultancy Info"
      />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 mb-8">
        <Header
          menuItemsTop={menuItemsTop}
          menuItemsBottom={menuItemsBottom}
          activeMenu="Consultancy Info"
          breadcrumbItems={[
            { label: 'Consultancy', link: '#' },
            { label: 'Consultancy Info', link: '#' },
          ]}
        />
        {experience < 5 ? (
          <div className="flex flex-col items-center justify-center mt-[10rem]">
            <PackageOpen className="mx-auto text-gray-500" size="100" />
            <p className="text-gray-500 mt-4">
              Your Experience is not Eligible for Consultancy
            </p>
          </div>
        ) : (
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="lg:col-span-2 xl:col-span-2 space-y-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add Consultancy</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Consultancy</DialogTitle>
                    <DialogDescription>
                      Fill in the details of the consultancy below.
                    </DialogDescription>
                  </DialogHeader>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter Title" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="skills"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Skills</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={(value) => field.onChange(value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a skill" />
                                </SelectTrigger>
                                <SelectContent>
                                  {skills.map((skill) => (
                                    <SelectItem
                                      key={skill.label}
                                      value={skill.label}
                                    >
                                      {skill.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="domains"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Domains</FormLabel>
                            <FormControl>
                              <Select
                                {...field}
                                onValueChange={(value) => field.onChange(value)}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a domain" />
                                </SelectTrigger>
                                <SelectContent>
                                  {domains.map((domain) => (
                                    <SelectItem
                                      key={domain.label}
                                      value={domain.label}
                                    >
                                      {domain.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter description"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="perHourRate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Per Hour Rate</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter per hour rate"
                                {...field}
                                onChange={(e) => field.onChange(e.target.value)}
                                value={field.value ?? ''}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormItem>
                        <FormLabel>URLs</FormLabel>
                        <br />
                        {urlFields.map((urlField, index) => (
                          <div
                            key={urlField.id}
                            className="flex items-center space-x-2"
                          >
                            <FormControl>
                              <Controller
                                name={`urls.${index}.value`}
                                control={form.control}
                                render={({ field }) => (
                                  <Input placeholder="Enter URL" {...field} />
                                )}
                              />
                            </FormControl>
                            <Button
                              type="button"
                              onClick={() => removeUrl(index)}
                              size="icon"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => appendUrl({ value: '' })}
                          className="mt-2"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add URL
                        </Button>
                      </FormItem>
                      <DialogFooter>
                        <Button type="submit">Submit</Button>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
              <div className="flex flex-wrap gap-8">
                {consultants.length == 0 ? (
                  <div className="flex flex-col items-center justify-center w-full">
                    <PackageOpen className="text-gray-500" size="100" />
                    <p className="text-gray-500">No consultancy added</p>
                  </div>
                ) : (
                  <div>
                    {consultants.map((consultant, index) => (
                      <ConsultantCard
                        key={index}
                        name={consultant.name}
                        skills={consultant.skills}
                        domains={consultant.domains}
                        description={consultant.description}
                        urls={consultant.urls}
                        perHourRate={consultant.perHourRate}
                      />
                    ))}
                  </div>
                )}
              </div>
              <Separator className="my-1" />
              <div className="grid grid-cols-1 gap-4">
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  Current Projects {`(${pendingProjects.length})`}
                </h2>
                <div className="flex gap-4 overflow-x-scroll no-scrollbar pb-8">
                  {pendingProjects.length > 0 ? (
                    pendingProjects.map((project, index) => (
                      <ProjectCard
                        key={index}
                        cardClassName="min-w-[45%]"
                        project={project}
                      />
                    ))
                  ) : (
                    <div className="text-center py-10 w-[100%] ">
                      <PackageOpen
                        className="mx-auto text-gray-500"
                        size="100"
                      />
                      <p className="text-gray-500">No projects available</p>
                    </div>
                  )}
                </div>

                <Separator className="my-1" />
                <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                  Completed Projects {`(${completedProjects.length})`}
                </h2>
                <div className="flex gap-4 overflow-x-scroll no-scrollbar pb-8">
                  {completedProjects.length > 0 ? (
                    completedProjects.map((project, index) => (
                      <ProjectCard
                        key={index}
                        cardClassName="min-w-[45%]"
                        project={project}
                      />
                    ))
                  ) : (
                    <div className="text-center py-10 w-[100%] ">
                      <PackageOpen
                        className="mx-auto text-gray-500"
                        size="100"
                      />
                      <p className="text-gray-500">No projects available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:col-span-1 xl:col-span-1 space-y-4">
              <CardTitle className="group flex items-center gap-2 text-2xl">
                Consultancy Invitations
              </CardTitle>
              <div className="text-center py-10">
                <PackageOpen className="mx-auto text-gray-500" size="100" />
                <p className="text-gray-500">No Consultancy Invitation</p>
              </div>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}