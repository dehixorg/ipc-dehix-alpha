import React, { useState, useEffect, useCallback } from 'react';
import { PackageOpen } from 'lucide-react';
import { useSelector } from 'react-redux';

import SkillDialog from './skillDiag';
import DomainDialog from './domainDiag';

import { Card } from '../../../components/ui/card';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../../components/ui/table'
import { axiosInstance } from '../../../lib/axiosinstance';
import { Switch } from '../../../components/ui/switch';
import { toast } from '../../../components/ui/use-toast';
import { Badge } from '../../../components/ui/badge';
import { getBadgeColor } from '../../../utils/common/getBadgeStatus';

const SkillDomainForm = ({ setFilterSkill, setFilterDomain }) => {
  const [skills, setSkills] = useState([]);
  const [domains, setDomains] = useState([]);
  const [skillDomainData, setSkillDomainData] = useState([]);
  const [statusVisibility, setStatusVisibility] = useState([]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchSkillsAndDomains = async () => {
      try {
        const [skillsResponse, domainsResponse] = await Promise.all([
          axiosInstance.get('/skills'),
          axiosInstance.get('/domain'),
        ]);

        setSkills(skillsResponse.data?.data || []);
        setDomains(domainsResponse.data?.data || []);
      } catch (error) {
        console.error('Error fetching skills and domains:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to load skills and domains. Please try again.',
        });
      }
    };

    fetchSkillsAndDomains();
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      const hireTalentResponse = await axiosInstance.get('/business/hire-dehixtalent');
      const hireTalentData = hireTalentResponse.data?.data || [];

      const formattedHireTalentData = hireTalentData.map((item) => ({
        uid: item._id,
        label: item.skillName || item.domainName || 'N/A',
        experience: item.experience || 'N/A',
        description: item.description || 'N/A',
        status: item.status,
        visible: item.visible,
      }));

      setSkillDomainData(formattedHireTalentData);
      setStatusVisibility(formattedHireTalentData.map((item) => item.visible));

      setFilterSkill(hireTalentData.filter((item) => item.skillName && item.visible).map((item) => ({ _id: item.skillId, label: item.skillName })));
      setFilterDomain(hireTalentData.filter((item) => item.domainName && item.visible).map((item) => ({ _id: item.domainId, label: item.domainName })));
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    }
  }, [setFilterSkill, setFilterDomain]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const handleToggleVisibility = async (index, value, hireDehixTalentId) => {
    try {
      const response = await axiosInstance.patch(`/business/hire-dehixtalent/${hireDehixTalentId}`, { visible: value });

      if (response.status === 200) {
        const updatedVisibility = [...statusVisibility];
        updatedVisibility[index] = value;
        setStatusVisibility(updatedVisibility);
        await fetchUserData();
      }
    } catch (error) {
      console.error('Error updating visibility:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  return (
    <div className="ml-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Hire Talent</h1>
        <p className="text-gray-400 mt-2">
          Help us understand the skills and domain you are looking for in potential hires.
        </p>
      </div>
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex space-x-4">
            <SkillDialog skills={skills} onSubmitSkill={(data) => setSkillDomainData([...skillDomainData, { ...data, status: 'ADDED', visible: false }])} />
            <DomainDialog domains={domains} onSubmitDomain={(data) => setSkillDomainData([...skillDomainData, { ...data, status: 'ADDED', visible: false }])} />
          </div>
        </div>
        <Card className="h-[65.4vh] overflow-auto no-scrollbar">
          <Table className="w-full">
            <TableHeader className="sticky top-0 z-10">
              <TableRow>
                <TableHead>Label</TableHead>
                <TableHead>Experience</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {skillDomainData.length > 0 ? (
                skillDomainData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.label}</TableCell>
                    <TableCell>{item.experience} years</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <Badge className={getBadgeColor(item.status)}>
                        {item.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Switch
                        checked={statusVisibility[index]}
                        onCheckedChange={(value) => item.uid && handleToggleVisibility(index, value, item.uid)}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-10">
                    <PackageOpen className="mx-auto text-gray-500" size="100" />
                    <p className="text-gray-500">No data available.</p>
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
};

export default SkillDomainForm;