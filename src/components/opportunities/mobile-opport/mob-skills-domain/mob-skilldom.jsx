'use client';
import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown, ChevronUp } from 'lucide-react';

import { Checkbox } from '../../../../components/ui/checkbox';
import { Label } from '../../../../components/ui/label';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';

const MobileSkillDom = ({
  label,
  heading,
  checkboxLabels,
  selectedValues,
  setSelectedValues,
}) => {
  const [showMore, setShowMore] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Handle checkbox changes, adding/removing items in selectedValues
  const handleCheckboxChange = (label) => {
    if (selectedValues.includes(label)) {
      setSelectedValues(selectedValues.filter((item) => item !== label));
    } else {
      setSelectedValues([...selectedValues, label]);
    }
  };

  // Filter skills based on searchTerm
  const filteredSkills = checkboxLabels.filter((label) =>
    label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Display the first 3 filtered skills
  const visibleSkills = filteredSkills.slice(0, 3);
  // Skills hidden until "More" is clicked
  const hiddenSkills = filteredSkills.slice(3);

  return (
    <div>
      <h1 className="mt-2 text-white">{heading}</h1>
      <div className="items-center p-2">
        {/* Search bar */}
        <Input
          placeholder={`Search ${label}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-2 bg-secondary border-black"
        />
        
        {/* Render visible skills */}
        {visibleSkills.map((label) => (
          <div key={label} className="flex items-center space-x-2 mb-1">
            <Checkbox
              id={label}
              checked={selectedValues.includes(label)}
              onCheckedChange={() => handleCheckboxChange(label)}
            />
            <Label htmlFor={label} className="text-sm">
              {label}
            </Label>
          </div>
        ))}
        
        {/* Render hidden skills when "Show more" is clicked */}
        {showMore &&
          hiddenSkills.map((label) => (
            <div key={label} className="flex items-center space-x-2 mb-1">
              <Checkbox
                id={label}
                checked={selectedValues.includes(label)}
                onCheckedChange={() => handleCheckboxChange(label)}
              />
              <Label htmlFor={label} className="text-sm">
                {label}
              </Label>
            </div>
          ))}
        
        {/* Show "More" or "Less" button if there are hidden skills */}
        {filteredSkills.length > 3 && (
          <div className="flex items-center mb-1">
            <Button
              size="sm"
              variant="ghost"
              className="flex items-center text-sm cursor-pointer ml-auto"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Less' : 'More'}
              {showMore ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              )}
            </Button>
          </div>
        )}

        {/* Display a message when no skills are found */}
        {filteredSkills.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">No skills found.</p>
        )}
      </div>
    </div>
  );
};

// Add PropTypes validation
MobileSkillDom.propTypes = {
  label: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  checkboxLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedValues: PropTypes.func.isRequired,
};

export default MobileSkillDom;