import React, { useEffect, useRef, useState } from 'react';
import { ListFilter, Search, Table } from 'lucide-react';
import { BoxModelIcon } from '@radix-ui/react-icons';
import { useSelector } from 'react-redux';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../../components/ui/dropdown-menu';
import Header from '../../../components/header/header';
import SidebarMenu from '../../../components/menu/sidebarMenu';
import {
  menuItemsBottom,
  menuItemsTop,
} from '../../../config/menuItems/freelancer/interviewMenuItems';
import { Button } from '../../../components/ui/button';
import DehixInterviews from '../../../components/freelancer/dehix-talent-interview/DehixInterviews';
import { Input } from '../../../components/ui/input';
import { axiosInstance } from '../../../lib/axiosinstance';
import SkeletonLoader from '../../../components/shared/SkeletonLoader';
import Projects from '../../../components/freelancer/projectInterview/ProjectInterviews';
import { toast } from '../../../components/ui/use-toast';

export default function CurrentPage() {
  const [filter, setFilter] = useState('All');
  const [isTableView, setIsTableView] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const user = useSelector((state) => state.user);
  const [skillData, setSkillData] = useState([]);
  const [domainData, setDomainData] = useState([]);
  const [projectSkill, setProjectSkill] = useState([]);
  const [projectDomain, setProjectDomain] = useState([]);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        setIsloading(true);
        const response = await axiosInstance.get(
          '/interview/current-interview',
          {
            params: {
              intervieweeId: user.uid,
            },
          },
        );

        const interviewData = response.data?.data.dehixTalent ?? [];
        const projectData = response.data?.data.projects ?? [];

        // Normalize both interviewData and projectData into arrays if not already
        const normalizedInterviewData = Array.isArray(interviewData)
          ? interviewData
          : [interviewData];

        const normalizedProjectData = Array.isArray(projectData)
          ? projectData
          : [projectData];

        // Split interviewData into SKILL and DOMAIN
        const skillArray = normalizedInterviewData.filter(
          (item) => item?.talentType === 'SKILL',
        );
        const domainArray = normalizedInterviewData.filter(
          (item) => item?.talentType === 'DOMAIN',
        );

        // Split projectData into SKILL and DOMAIN
        const projectSkillArray = normalizedProjectData.filter(
          (item) => item?.talentType === 'SKILL',
        );
        const projectDomainArray = normalizedProjectData.filter(
          (item) => item?.talentType === 'DOMAIN',
        );

        // Set state
        setSkillData(skillArray ?? []);
        setDomainData(domainArray ?? []);
        setProjectSkill(projectSkillArray ?? []);
        setProjectDomain(projectDomainArray ?? []);
      } catch (err) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong. Please try again.',
        }); // Error toast
        console.error('Failed to load data. Please try again.', err);
        setSkillData([]);
        setDomainData([]);
      } finally {
        setIsloading(false);
      }
    };

    fetchInterviews();
  }, [user?.uid]);

  const breadcrumbItems = [
    { label: 'Freelancer', link: '/dashboard/freelancer' },
    {
      label: 'Interview',
      link: '/freelancer/interview/profile',
    },
    { label: 'Current Interviews', link: '#' },
  ];

  return (
    <div className="flex min-h-screen w-full bg-muted/40">
      <SidebarMenu
        menuItemsTop={menuItemsTop}
        menuItemsBottom={menuItemsBottom}
        active="Current"
      />
      <div className="flex flex-col mb-8 sm:gap-4 sm:py-0 sm:pl-14 w-full">
        <Header
          breadcrumbItems={breadcrumbItems}
          menuItemsTop={menuItemsTop}
          menuItemsBottom={menuItemsBottom}
          activeMenu="Current"
        />
        <div className="ml-10">
          <h1 className="text-3xl font-bold">Current Interviews</h1>
          <p className="text-gray-400 mt-2">
            View and manage your current interviews, and update skills for
            better matches.
          </p>
        </div>
        <div className="flex flex-col flex-1 items-start gap-4 p-2 sm:px-6 sm:py-0 md:gap-8 lg:flex-col xl:flex-col pt-2 pl-4 sm:pt-4 sm:pl-6 md:pt-6 md:pl-8">
          <div className="flex justify-between items-center w-full">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1  text-sm"
                >
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only">Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={filter === 'All'}
                  onSelect={() => setFilter('All')}
                >
                  All
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter === 'Skills'}
                  onSelect={() => setFilter('Skills')}
                >
                  Skills
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={filter === 'Domain'}
                  onSelect={() => setFilter('Domain')}
                >
                  Domain
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="flex justify-center gap-3 items-center">
              <div className="relative flex-1 mr-2">
                {!isFocused && (
                  <Search
                    size="sm"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 sm:block md:hidden ml-0.5 cursor-pointer"
                    onClick={() => setIsFocused(true)}
                  />
                )}

                <Search
                  size="sm"
                  className={`absolute h-7 gap-1 text-sm left-2 top-1/2 transform -translate-y-1/2 w-5 text-gray-400 cursor-pointer 
      ${isFocused ? 'sm:flex' : 'hidden md:flex'}`}
                />

                <Input
                  placeholder="Search interview"
                  value={searchQuery}
                  ref={inputRef}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className={`pl-8 transition-all duration-300 ease-in-out
        ${isFocused ? 'w-full sm:w-72' : 'w-0 sm:w-0 md:w-full'} sm:hidden `}
                />
                <Input
                  placeholder="Search interview by..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="pl-8 hidden md:flex border focus-visible:ring-1  focus:ring-0 "
                />
              </div>

              {!isFocused && (
                <div className="gap-2 md:hidden flex">
                  <Button
                    onClick={() => setIsTableView(true)}
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <Table className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    onClick={() => setIsTableView(false)}
                    variant="outline"
                    size="sm"
                    className="h-7 gap-1 text-sm"
                  >
                    <BoxModelIcon className="h-3.5 w-3.5" />
                  </Button>
                </div>
              )}

              {/* Always visible in md+ */}
              <div className="gap-2 md:flex hidden">
                <Button
                  onClick={() => setIsTableView(true)}
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <Table className="h-3.5 w-3.5" />
                </Button>
                <Button
                  onClick={() => setIsTableView(false)}
                  variant="outline"
                  size="sm"
                  className="h-7 gap-1 text-sm"
                >
                  <BoxModelIcon className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center items-center flex-col">
            {isLoading ? (
              <SkeletonLoader isTableView={isTableView} />
            ) : (
              <>
                <DehixInterviews
                  skillData={skillData}
                  domainData={domainData}
                  searchQuery={searchQuery}
                  isTableView={isTableView}
                  filter={filter}
                />
                <Projects
                  searchQuery={searchQuery}
                  isTableView={isTableView}
                  skillData={projectSkill}
                  domainData={projectDomain}
                  filter={filter}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}