import React from 'react';
import PropTypes from 'prop-types';
import { ArrowDownNarrowWide } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const CardWithForm = ({ title, itemCounts }) => {
  const { total, low, medium, high } = itemCounts;

  return (
    <Card className="sm:w-fit md:w-[320px] lg:w-[375px]">
      <CardHeader>
        <div className="grid grid-cols-[auto,auto] items-center ml-9">
          <CardTitle className="text-white text-3xl font-bold">{title}</CardTitle>
          <ArrowDownNarrowWide className="mr-10" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center text-white text-4xl font-bold">
            +{total || 0} {/* Fallback to 0 if total is not provided */}
          </div>
          <div className="grid grid-rows-3 gap-2">
            <div className="flex items-center">
              <span>{low || 0}</span>
              <span className="badge bg-green-500 text-white text-xs px-2 py-1 rounded-md ml-2">
                Low
              </span>
            </div>
            <div className="flex items-center">
              <span>{medium || 0}</span>
              <span className="badge bg-yellow-500 text-white text-xs px-2 py-1 rounded-md ml-2">
                Medium
              </span>
            </div>
            <div className="flex items-center">
              <span>{high || 0}</span>
              <span className="badge bg-red-500 text-white text-xs px-2 py-1 rounded-md ml-2">
                High
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Add PropTypes validation
CardWithForm.propTypes = {
  title: PropTypes.string.isRequired,
  itemCounts: PropTypes.shape({
    total: PropTypes.number,
    low: PropTypes.number,
    medium: PropTypes.number,
    high: PropTypes.number,
  }).isRequired,
};

// Add default props
CardWithForm.defaultProps = {
  itemCounts: {
    total: 0,
    low: 0,
    medium: 0,
    high: 0,
  },
};

export default CardWithForm;