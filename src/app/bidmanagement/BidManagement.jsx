import React, { useState, useEffect, useMemo } from 'react';

import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify'; 

const BidsPage = () => {
  const user = {
    uid: 'mockUserId'
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
      await axios.put(`/api/bid/${bidId}/status`, {
        bid_status: updatedStatus,
      });
      toast.success('Bid status updated successfully');
    } catch (error) {
      toast.error(errorToast.message);
      console.error('Error updating bid status:', error);
    }
  };

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