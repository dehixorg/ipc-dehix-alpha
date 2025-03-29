import React, { useState, useEffect, useMemo } from 'react';

// Note: Replace with appropriate imports for your project
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify'; // Assuming you're using react-toastify

const BidsPage = () => {
  // Note: Replace with actual Redux selector or state management
  const user = {
    uid: 'mockUserId' // This should come from your actual state management
  };

  const [projectIds, setProjectIds] = useState([]);
  const [bidsArray, setBidsArray] = useState([]);

  const errorToast = useMemo(
    () => ({
      type: 'error',
      title: 'Error',
      message: 'Something went wrong. Please try again.',
    }),
    []
  );

  useEffect(() => {
    const fetchProjectIds = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await axios.get(`/api/project/business`, {
          params: { status: 'Pending' }
        });

        const ids = response.data.data.map((project) => project._id);
        setProjectIds(ids);
      } catch (error) {
        console.error('Error fetching project IDs:', error);
      }
    };

    fetchProjectIds();
  }, [user.uid]);

  useEffect(() => {
    const fetchBidsForProjects = async () => {
      try {
        const pendingBids = [];

        for (const projectId of projectIds) {
          // Replace with your actual API endpoint
          const response = await axios.get(`/api/bid/${projectId}/bids`);

          const data = response.data.data;
          data.forEach((bid) => {
            if (bid.bid_status === 'Pending') {
              pendingBids.push(bid);
            }
          });
        }

        setBidsArray(pendingBids);
      } catch (error) {
        toast.error(errorToast.message);
        console.error('Error fetching bids:', error);
      }
    };

    if (projectIds.length) {
      fetchBidsForProjects();
    }
  }, [projectIds]);

  const handleAction = async (bidId, actionType) => {
    let updatedStatus;
    switch (actionType) {
      case 'Accept':
        updatedStatus = 'Accepted';
        break;
      case 'Reject':
        updatedStatus = 'Rejected';
        break;
      case 'Schedule Interview':
        updatedStatus = 'Interview';
        break;
      case 'Lobby':
        updatedStatus = 'Lobby';
        break;
      default:
        return;
    }

    try {
      // Replace with your actual API endpoint
      await axios.put(`/api/bid/${bidId}/status`, {
        bid_status: updatedStatus,
      });
      
      // Optionally refresh bids or update UI
      toast.success('Bid status updated successfully');
    } catch (error) {
      toast.error(errorToast.message);
      console.error('Error updating bid status:', error);
    }
  };

  // Mock AppliedBids component since original wasn't provided
  const AppliedBids = ({ bids, onAction }) => (
    <div className="applied-bids">
      {bids.map(bid => (
        <div key={bid._id} className="bid-item">
          <p>Bid ID: {bid._id}</p>
          <p>Status: {bid.bid_status}</p>
          <div className="actions">
            <button onClick={() => onAction(bid._id, 'Accept')}>Accept</button>
            <button onClick={() => onAction(bid._id, 'Reject')}>Reject</button>
            <button onClick={() => onAction(bid._id, 'Schedule Interview')}>Schedule Interview</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="bids-page max-w-6xl mx-auto p-8 mb-8">
      <h1 className="text-3xl font-bold mb-8">Manage Bids</h1>
      {bidsArray.length ? (
        <AppliedBids bids={bidsArray} onAction={handleAction} />
      ) : (
        <p>No bids available.</p>
      )}
    </div>
  );
};

export default BidsPage;