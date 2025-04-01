import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Loader2, Briefcase, Building2, DollarSign, Clock } from 'lucide-react';

import { axiosInstance } from '../../../lib/axiosinstance';
import { toast } from '../../../components/ui/use-toast';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../..//components/ui/badge';
import { Button } from '../../../components/ui/button';
import { ScrollArea } from '../../../components/ui/scroll-area';

const JobCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [bidProfiles, setBidProfiles] = useState([]);
  const [jobs, setJobs] = useState([]);
  const user = useSelector(state => state.user);

  const fetchBidData = useCallback(async () => {
    try {
      const [bidResponse, jobsResponse] = await Promise.all([
        axiosInstance.get(`/bid/${user.uid}/bid`),
        axiosInstance.get('/jobs/available')
      ]);

      const profileIds = bidResponse.data.data.map(bid => bid.profile_id);
      setBidProfiles(profileIds);
      setJobs(jobsResponse.data.data || []);
    } catch (error) {
      console.error('API Error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [user.uid]);

  const handleApply = async (jobId) => {
    try {
      await axiosInstance.post(`/jobs/${jobId}/apply`, {
        userId: user.uid
      });
      toast({
        title: 'Success',
        description: 'Successfully applied for the job',
      });
      fetchBidData(); // Refresh data
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.response?.data?.message || 'Failed to apply for job',
      });
    }
  };

  React.useEffect(() => {
    fetchBidData();
  }, [fetchBidData]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[80vh] w-full px-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <Card key={job.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                {job.title}
              </CardTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                {job.company}
              </div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {job.skills?.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    {job.salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {job.duration}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-3">
                  {job.description}
                </p>

                <Button 
                  className="w-full"
                  disabled={bidProfiles.includes(job.id)}
                  onClick={() => handleApply(job.id)}
                >
                  {bidProfiles.includes(job.id) ? 'Applied' : 'Apply Now'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
};

JobCard.propTypes = {
  // No props needed as it uses Redux state
};

export default JobCard;