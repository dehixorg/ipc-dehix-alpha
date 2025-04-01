import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';

const CustomCard = ({
  heading,
  icon: IconComponent,
  content = "No content available", // Default content if none is provided
}) => {
  return (
    <Card className="sm:w-fit h-[234px] md:w-[320px] lg:w-[375px]">
      <CardHeader>
        <div className="grid grid-cols-[auto,auto] items-center ml-10">
          <CardTitle className="text-white text-3xl font-bold items-center">
            {heading}
          </CardTitle>
          <div className="items-center ml-4">
            {IconComponent && <IconComponent />} {/* Render icon if provided */}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="items-center ml-4 p-6">
          <h1>{content}</h1>
        </div>
      </CardContent>
    </Card>
  );
};

// Add PropTypes validation
CustomCard.propTypes = {
  heading: PropTypes.string.isRequired,
  icon: PropTypes.elementType, // For component types
  content: PropTypes.string,
};

// Add default props
CustomCard.defaultProps = {
  content: "No content available",
  icon: undefined,
};

export default CustomCard;