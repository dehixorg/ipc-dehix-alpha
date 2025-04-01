import React from 'react';
import PropTypes from 'prop-types';
import {
  Briefcase,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  User,
  XCircle,
} from 'lucide-react';

import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Card, CardContent } from '../../../components/ui/card';
import { ScrollArea, ScrollBar } from '../../../components/ui/scroll-area';

const BidCard = ({ bid, interviewId, setConfirmAction }) => (
  <Card className="relative w-full max-w-lg mx-auto p-6 rounded-2xl border shadow-lg hover:shadow-2xl transition-all space-y-4">
    <Badge
      className={`absolute top-3 right-3 text-xs flex items-center gap-2 px-2 py-1 font-semibold rounded-full shadow-md transition-all 
      ${
        bid?.status === 'ACCEPTED'
          ? 'text-green-800 bg-green-100'
          : bid?.status === 'REJECTED'
            ? 'text-red-800 bg-red-100'
            : 'text-yellow-800 bg-yellow-100'
      }`}
    >
      {bid?.status === 'ACCEPTED' ? (
        <CheckCircle className="w-4 h-4" />
      ) : bid?.status === 'REJECTED' ? (
        <XCircle className="w-4 h-4" />
      ) : (
        <Clock className="w-4 h-4" />
      )}
      {bid?.status?.toUpperCase() || 'PENDING'}
    </Badge>
    {/* ...existing CardContent... */}
  </Card>
);

// Add PropTypes validation
BidCard.propTypes = {
  bid: PropTypes.shape({
    _id: PropTypes.string,
    interviewerId: PropTypes.string,
    suggestedDateTime: PropTypes.string,
    fee: PropTypes.string,
    interviewer: PropTypes.shape({
      _id: PropTypes.string,
      userName: PropTypes.string,
      skills: PropTypes.arrayOf(PropTypes.string),
      workExperience: PropTypes.number,
    }),
    status: PropTypes.string,
  }),
  interviewId: PropTypes.string,
  setConfirmAction: PropTypes.func.isRequired,
};

BidCard.defaultProps = {
  bid: {},
  interviewId: '',
};

export default BidCard;