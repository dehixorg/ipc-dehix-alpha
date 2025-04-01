'use client';
import React from 'react';
import PropTypes from 'prop-types';

import { CardContent, CardHeader, CardTitle } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Label } from '../../../../components/ui/label';

const CompanyCard = ({ heading, setLimits }) => {
  const [lowerLimit, setLowerLimit] = React.useState(0);
  const [higherLimit, setHigherLimit] = React.useState(10);

  const handleLowerLimitChange = (e) => {
    const newLowerLimit = Number(e.target.value);
    setLowerLimit(newLowerLimit);
    setLimits(`${newLowerLimit}-${higherLimit}`);
  };

  const handleHigherLimitChange = (e) => {
    const newHigherLimit = Number(e.target.value);
    setHigherLimit(newHigherLimit);
    setLimits(`${lowerLimit}-${newHigherLimit}`);
  };

  return (
    <div className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{heading}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 p-2">
          {/* Lower limit input */}
          <div className="flex flex-col">
            <Label htmlFor="lowerLimit" className="text-sm">
              Minimum
            </Label>
            <Input
              id="lowerLimit"
              type="number"
              value={lowerLimit}
              onChange={handleLowerLimitChange}
              className="w-20 mt-1"
            />
          </div>

          {/* Higher limit input */}
          <div className="flex flex-col">
            <Label htmlFor="higherLimit" className="text-sm">
              Maximum
            </Label>
            <Input
              id="higherLimit"
              type="number"
              value={higherLimit}
              onChange={handleHigherLimitChange}
              className="w-20 mt-1"
            />
          </div>
        </div>
      </CardContent>
    </div>
  );
};

// Add PropTypes validation
CompanyCard.propTypes = {
  heading: PropTypes.string.isRequired,
  setLimits: PropTypes.func.isRequired,
};

export default CompanyCard;