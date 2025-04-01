'use client';
import { Loader2, PackageOpen } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { SidebarMenu } from '../../../components/menu/sidebarMenu';
import {
  menuItemsBottom,
  menuItemsTop,
} from '../../../config/menuItems/freelancer/projectMenuItems';
import { axiosInstance } from '../../../lib/axiosinstance';
import { ProjectCard } from '../../../components/cards/projectCard';
import { StatusEnum } from '../../../utils/freelancer/enum';
import Header from '../../../components/header/header';
import { toast } from '../../../components/ui/use-toast';

export default function AppliedProject() {
  const user = useSelector((state) => state.user);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get(
          `/freelancer/${user.uid}/project?status=PENDING`,
        );
        setProjects(response.data.data);
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong. Please try again.',
        });
        console.error('API Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user.uid]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <SidebarMenu
        menuItemsTop={menuItemsTop}
        menuItemsBottom={menuItemsBottom}
        active="Under Verification"
      />
      <div className="flex flex-col sm:gap-8 sm:py-0 sm:pl-14 mb-8">
        <Header
          menuItemsTop={menuItemsTop}
          menuItemsBottom={menuItemsBottom}
          activeMenu="Under Verification"
          breadcrumbItems={[
            { label: 'Freelancer', link: '/dashboard/freelancer' },
            {
              label: 'Projects',
              link: '/freelancer/project/current',
            },
            {
              label: 'Under Verification',
              link: '#',
            },
          ]}
        />
        <div className="mb-8 ml-10">
          <h1 className="text-3xl font-bold">Projects Under Verification</h1>
          <p className="text-gray-400 mt-2">
            Track the status of your projects currently undergoing verification
            before final approval.
          </p>
        </div>
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Loader2 size={40} className="animate-spin" />
          </div>
        ) : (
          <main
            className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 
                grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
          >
            {projects.length === 0 ? (
              <div className="col-span-full text-center mt-20 w-full">
                <PackageOpen className="mx-auto text-gray-500" size="100" />
                <p className="text-gray-500">No projects available</p>
              </div>
            ) : (
              projects.map((project, index) => (
                <ProjectCard key={index} project={project} type={user.type} />
              ))
            )}
          </main>
        )}
      </div>
    </div>
  );
}