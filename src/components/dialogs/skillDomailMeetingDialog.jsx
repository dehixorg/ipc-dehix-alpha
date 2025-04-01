'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

import { Button } from '../../components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { axiosInstance } from '../../lib/axiosinstance';
// import { RootState } from '@/lib/store';
import { toast } from '../../hooks/use-toast';

const SkillDomainMeetingDialog = ({ isOpen, onClose, doc_id, doc_type }) => {
  const user = useSelector((state) => state.user);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [summary, setSummary] = useState('');
  const [description, setDescription] = useState('');
  const [startDateTime, setStartDateTime] = useState(
    dayjs().add(1, 'day').format('YYYY-MM-DD')
  );
  const [endDateTime, setEndDateTime] = useState(
    dayjs().add(1, 'day').add(1, 'hour').format('YYYY-MM-DD')
  );
  const [attendees, setAttendees] = useState(['']);
  const [interviewer, setInterviewer] = useState([]);

  const handleRequest = async (meetingData) => {
    const query = Object.fromEntries(searchParams.entries());
    if (query.code) {
      await handleCreateMeet(meetingData, query.code);
    } else {
      handleAuth();
    }
  };

  const handleCreateMeet = async (meetingData, code) => {
    await axiosInstance.post('/meeting', meetingData, {
      params: {
        code: code,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const meetingData = {
      summary,
      description,
      start: {
        dateTime: dayjs(startDateTime).toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      end: {
        dateTime: dayjs(endDateTime).toISOString(),
        timeZone: 'Asia/Kolkata',
      },
      attendees,
    };
    handleRequest(meetingData);
    // onClose();
  };

  const handleAuth = async () => {
    try {
      const baseUrl = window.location.origin + window.location.pathname;
      const response = await axiosInstance.get('/meeting/auth-url', {
        params: { redirectUri: baseUrl },
      });
      const authUrl = response.data.url;
      if (authUrl) {
        router.push(authUrl);
      }
    } catch (error) {
      console.error('Error fetching Google Auth URL:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axiosInstance.get(
          `/freelancer/${user.uid}/doc_id/${doc_id}?doc_type=${doc_type}`
        );
        setInterviewer(response?.data?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong. Please try again.',
        });
      }
    }
    fetchData();
  }, [doc_id, doc_type, user.uid]);

  const handleDateTimeChange = (type, dateTime, time) => {
    const updatedDateTime = dayjs(dateTime)
      .set('hour', parseInt(time.split(':')[0]))
      .set('minute', parseInt(time.split(':')[1]))
      .format('YYYY-MM-DDTHH:mm');

    if (type === 'start') {
      setStartDateTime(updatedDateTime);
    } else {
      setEndDateTime(updatedDateTime);
    }
  };

  const validateEndDateTime = (newEndDateTime) => {
    if (dayjs(newEndDateTime).isBefore(dayjs(startDateTime))) {
      setEndDateTime(dayjs(startDateTime).add(1, 'hour').format('YYYY-MM-DDTHH:mm'));
    } else {
      setEndDateTime(newEndDateTime);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Meeting</DialogTitle>
          <DialogDescription>
            Fill in the details below to schedule a new meeting.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="summary" className="text-right">
              Summary
            </Label>
            <Input
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="col-span-3"
              placeholder="Meeting Summary"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              placeholder="Meeting Description"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start-date" className="text-right">
              Start Date
            </Label>
            <Input
              type="date"
              value={dayjs(startDateTime).format('YYYY-MM-DD')}
              onChange={(e) =>
                setStartDateTime(
                  e.target.value + 'T' + dayjs(startDateTime).format('HH:mm')
                )
              }
              className="col-span-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end-date" className="text-right">
              End Date
            </Label>
            <Input
              type="date"
              value={dayjs(endDateTime).format('YYYY-MM-DD')}
              onChange={(e) =>
                validateEndDateTime(
                  e.target.value + 'T' + dayjs(endDateTime).format('HH:mm')
                )
              }
              className="col-span-3"
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="start-time" className="text-right">
              Start Time
            </Label>
            <Input
              type="time"
              className="col-span-3"
              value={dayjs(startDateTime).format('HH:mm')}
              onChange={(e) =>
                handleDateTimeChange(
                  'start',
                  dayjs(startDateTime).format('YYYY-MM-DD'),
                  e.target.value
                )
              }
              required
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="end-time" className="text-right">
              End Time
            </Label>
            <Input
              type="time"
              className="col-span-3"
              value={dayjs(endDateTime).format('HH:mm')}
              onChange={(e) =>
                handleDateTimeChange(
                  'end',
                  dayjs(endDateTime).format('YYYY-MM-DD'),
                  e.target.value
                )
              }
              required
            />
          </div>

          <DialogFooter className="flex justify-center">
            <Button type="submit">Create Meeting</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SkillDomainMeetingDialog;
