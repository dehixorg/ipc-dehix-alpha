import React from 'react';

import Dropdown from './Dropdown';

const DropdownNavNotes = ({ navItems }) => {
  return (
    <div className="relative overflow-visible">
      <Dropdown items={navItems} />
    </div>
  );
};

export default DropdownNavNotes;