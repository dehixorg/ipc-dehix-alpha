import React from 'react';

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '../components/ui/form';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const TextInput = ({
  control,
  name,
  label,
  placeholder = 'Enter value',
  type = 'text',
  description = '',
  className = '',
}) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input
                placeholder={placeholder}
                type={type}
                {...field}
                className={`p-2 border rounded-md ${className}`}
                onChange={(e) => {
                  const value = e.target.value;
                  if (type === 'number') {
                    field.onChange(value ? parseFloat(value) : '');
                  } else {
                    field.onChange(value);
                  }
                }}
                value={type === 'number' ? field.value ?? '' : field.value}
              />
            </FormControl>
            <FormDescription>{description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TextInput;