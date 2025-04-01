'use client';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';

const CompanyCard = ({ heading, setLimits }) => {
  const [lowerLimit, setLowerLimit] = useState('');
  const [higherLimit, setHigherLimit] = useState('');
  const [error, setError] = useState('');

  const validateAndSetLimits = (lower, higher) => {
    // Reset error when user starts typing
    setError('');

    const lowerValue = lower ? Number(lower) : 0;
    const higherValue = higher ? Number(higher) : 0;

    if (lowerValue < 0 || higherValue < 0) {
      setError('Experience cannot be negative.');
      return;
    }

    if (higherValue > 30) {
      setError('Maximum experience cannot exceed 30 years.');
      return;
    }

    if (lowerValue > higherValue && higher !== '') {
      setError('Please enter the maximum experience first');
      return;
    }

    setLowerLimit(lower);
    setHigherLimit(higher);
    setLimits(`${lower || 0}-${higher || 0}`);
  };

  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{heading}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {/* Lower limit input */}
          <div className="flex flex-col">
            <Label htmlFor="lowerLimit" className="text-sm">
              Minimum
            </Label>
            <Input
              id="lowerLimit"
              type="number"
              value={lowerLimit}
              onChange={(e) =>
                validateAndSetLimits(e.target.value, higherLimit)
              }
              className="mt-1 w-full"
              placeholder="0"
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
              onChange={(e) => validateAndSetLimits(lowerLimit, e.target.value)}
              className="mt-1 w-full"
              placeholder="30"
            />
          </div>
        </div>

        {/* Validation message below inputs */}
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </CardContent>
    </Card>
  );
};

// Add PropTypes validation
CompanyCard.propTypes = {
  heading: PropTypes.string.isRequired,
  setLimits: PropTypes.func.isRequired,
};

export default CompanyCard;