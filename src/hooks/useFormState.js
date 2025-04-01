'use client';

import { useState } from 'react';

const useFormState = ({ setErrors }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: {
      expected: '',
    },
    endDate: {
      expected: '',
    },
    amount: undefined,
    status: 'NOT_STARTED',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required.';
    }
    if (new Date(formData.startDate.expected) > new Date(formData.endDate.expected)) {
      newErrors.startDate = 'Start date cannot be after end date.';
    }
    if ((formData.amount ?? 0) < 0) {
      newErrors.amount = 'Amount must be a positive number.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    setFormData,
    handleChange,
    validateForm,
  };
};

export default useFormState;
