'use client';

import { useState } from 'react';

const useNestedFormState = (formData, setFormData) => {
  const handleNestedChange = (field, key, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: {
        ...prevState[field],
        [key]: value,
      },
    }));
  };

  const handleDateChange = (field, key, date) => {
    handleNestedChange(field, key, date ? date.toISOString() : '');
  };

  return { handleNestedChange, handleDateChange };
};

export default useNestedFormState;
