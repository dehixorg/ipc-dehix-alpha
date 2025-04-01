'use client';
import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent } from '../../../components/ui/card';
import { Checkbox } from '../../../components/ui/checkbox';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';

const Filter = ({
  label,
  heading,
  checkboxLabels,
  selectedValues,
  setSelectedValues,
}) => {
  const [showMore, setShowMore] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState('');

  // Handle checkbox change - toggle selection in `selectedValues`
  const handleCheckboxChange = (label) => {
    if (selectedValues.includes(label)) {
      setSelectedValues(selectedValues.filter((item) => item !== label));
    } else {
      setSelectedValues([...selectedValues, label]);
    }
  };

  // Filter the checkbox labels based on the search term
  const filteredSkills = checkboxLabels.filter((item) =>
    item?.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display the first 3 filtered options
  const visibleSkills = filteredSkills.slice(0, 3);
  // Additional hidden skills to show when "More" is clicked
  const hiddenSkills = filteredSkills.slice(3);

  return (
    <Card className="w-[250px]">
      <CardContent>
        <h1 className="mt-2">{heading}</h1>
        <div className="items-center p-2">
          {/* Search bar for filtering */}
          <Input
            placeholder={`Search ${label}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-2"
          />

          {/* Display the first 3 filtered options */}
          {visibleSkills.map((item) => (
            <div key={item.label} className="flex items-center space-x-2 mb-1">
              <Checkbox
                id={item.label}
                checked={selectedValues.includes(item.label)}
                onCheckedChange={() => handleCheckboxChange(item.label)}
              />
              <Label htmlFor={item.label} className="text-sm">
                {item.label}
              </Label>
            </div>
          ))}

          {/* Display hidden skills when "Show More" is clicked */}
          {showMore &&
            hiddenSkills.map((item) => (
              <div key={item.label} className="flex items-center space-x-2 mb-1">
                <Checkbox
                  id={item.label}
                  checked={selectedValues.includes(item.label)}
                  onCheckedChange={() => handleCheckboxChange(item.label)}
                />
                <Label htmlFor={item.label} className="text-sm">
                  {item.label}
                </Label>
              </div>
            ))}

          {/* Show More/Less button */}
          {filteredSkills.length > 3 && (
            <div className="flex items-center mb-1">
              <button
                className="text-sm text-blue-500 cursor-pointer"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? 'Less Options' : 'More Options'}
              </button>
            </div>
          )}

          {/* Message if no skills are found */}
          {filteredSkills.length === 0 && (
            <p className="text-sm text-gray-500 mt-2">No skills found.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

// Add PropTypes validation
Filter.propTypes = {
  label: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
  checkboxLabels: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedValues: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedValues: PropTypes.func.isRequired,
};

export default Filter;