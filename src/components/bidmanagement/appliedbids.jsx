import React from 'react';
import BidItem from './biditem';
// import { BidstatusEnum } from '@/utils/enum';

const AppliedBids = ({ bids, onAction }) => {
  const action = [
    { label: 'Select', type: 'select', variant: 'success' },
    { label: 'Reject', type: 'reject', variant: 'danger' },
    { label: 'Schedule Interview', type: 'schedule', variant: 'primary' },
    { label: 'Move to Lobby', type: 'lobby', variant: 'secondary' },
  ];

  return (
    <div className="applied-bids">
      {bids.map((bid) => (
        <BidItem key={bid._id} bid={bid} onAction={onAction} actions={action} />
      ))}
    </div>
  );
};

export default AppliedBids;
