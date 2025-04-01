import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SkeletonLoader from './SkeletonLoader';
import BidList from './BidList';
import { axiosInstance } from '../../../lib/axiosinstance';
import { Button } from '../../../components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../../components/ui/dialog';
import { toast } from '../../../components/ui/use-toast';

const BidsPage = ({ userId }) => {
  const [bidsData, setBidsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirmAction, setConfirmAction] = useState(null);

  useEffect(() => {
    const fetchBids = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get('/interview', {
          params: {
            intervieweeId: userId,
          },
        });
        console.log(response);
        setBidsData(response?.data?.data || []);
      } catch (error) {
        console.error('Error fetching interview bids', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Something went wrong. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBids();
  }, [userId]);

  const handleActionConfirm = async () => {
    if (!confirmAction) return;

    const { interviewId, bidId, action } = confirmAction;
    const interviewToUpdate = bidsData.find(
      (interview) => interview._id === interviewId,
    );
    if (!interviewToUpdate) return;

    const updatedTalentId = interviewToUpdate.talentId?.id;
    const isAccepted = action === 'ACCEPTED';

    const updatedBidsArray = Object.values(
      interviewToUpdate.interviewBids || {},
    )
      .map((bid) => ({
        _id: bid._id,
        interviewerId: bid.interviewer?._id || bid.interviewerId,
        dateTimeAgreement: bid.dateTimeAgreement || false,
        suggestedDateTime: bid.suggestedDateTime || null,
        fee: bid.fee || '0',
        status:
          bid._id === bidId ? action : isAccepted ? 'REJECTED' : bid.status,
      }))
      .filter((bid) => bid.interviewerId);

    const updatedBidsObject = updatedBidsArray.reduce((acc, bid) => {
      acc[bid._id] = bid;
      return acc;
    }, {});

    const hasAcceptedBid = Object.values(updatedBidsObject).some(
      (bid) => bid.status === 'ACCEPTED',
    );
    const updatedInterviewStatus = hasAcceptedBid ? 'SCHEDULED' : 'BIDDING';

    const updatedInterview = {
      _id: interviewToUpdate._id,
      talentId: updatedTalentId,
      interviewBids: updatedBidsObject,
      InterviewStatus: updatedInterviewStatus,
    };

    try {
      await axiosInstance.put(`/interview/${interviewId}`, updatedInterview);

      setBidsData((prevData) =>
        isAccepted
          ? prevData.filter((interview) => interview._id !== interviewId)
          : prevData.map((interview) =>
              interview._id === interviewId
                ? {
                    ...interview,
                    interviewBids: updatedBidsObject,
                    InterviewStatus: updatedInterviewStatus,
                  }
                : interview,
            ),
      );
    } catch (error) {
      console.error('Error updating interview bid:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Something went wrong. Please try again.',
      });
    }

    setConfirmAction(null);
  };

  return (
    <div className="w-[84vw] mx-auto">
      {loading ? (
        <SkeletonLoader />
      ) : bidsData?.length > 0 ? (
        <Accordion type="single" collapsible defaultValue={bidsData?.[0]?._id}>
          {bidsData.map((interview) => (
            <AccordionItem key={interview?._id} value={interview?._id || ''}>
              <AccordionTrigger className="text-xl w-full font-semibold hover:no-underline">
                <div className="flex justify-between items-center w-full mx-3">
                  <div>{interview?.talentId?.label || 'No Talent Label'}</div>
                  <div>
                    {Object.keys(interview?.interviewBids || {}).length} Bids
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <BidList
                  interview={interview}
                  setConfirmAction={setConfirmAction}
                />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      ) : (
        <div className="text-center text-lg font-semibold mt-4">
          No bids available
        </div>
      )}

      {confirmAction && (
        <Dialog
          open={!!confirmAction}
          onOpenChange={() => setConfirmAction(null)}
        >
          <DialogContent className="m-2 w-[80vw] md:max-w-lg">
            <DialogHeader>
              <DialogTitle>
                Confirm {confirmAction.action?.toLowerCase()} action?
              </DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmAction(null)}>
                Cancel
              </Button>
              <Button className="mb-3" onClick={handleActionConfirm}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

BidsPage.propTypes = {
  userId: PropTypes.string
};

BidsPage.defaultProps = {
  userId: ''
};

export default BidsPage;