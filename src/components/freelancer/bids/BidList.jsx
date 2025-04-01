import React from 'react';
import PropTypes from 'prop-types';
import BidCard from './BidCard';

const BidList = ({ interview, setConfirmAction }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
    {Object.values(interview?.interviewBids || {}).map((bid) => (
      <BidCard
        key={bid?._id}
        bid={bid}
        interviewId={interview?._id}
        setConfirmAction={setConfirmAction}
      />
    ))}
  </div>
);

BidList.propTypes = {
  interview: PropTypes.shape({
    _id: PropTypes.string,
    talentId: PropTypes.shape({
      label: PropTypes.string
    }),
    interviewBids: PropTypes.objectOf(
      PropTypes.shape({
        _id: PropTypes.string,
        interviewerId: PropTypes.string,
        suggestedDateTime: PropTypes.string,
        fee: PropTypes.string,
        interviewer: PropTypes.shape({
          _id: PropTypes.string,
          userName: PropTypes.string,
          skills: PropTypes.arrayOf(PropTypes.string),
          workExperience: PropTypes.number
        }),
        status: PropTypes.string
      })
    ),
    InterviewStatus: PropTypes.string
  }),
  setConfirmAction: PropTypes.func.isRequired
};

BidList.defaultProps = {
  interview: {
    interviewBids: {}
  }
};

export default BidList;