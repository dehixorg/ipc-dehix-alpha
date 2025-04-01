import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSelector } from 'react-redux';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectItem,
  SelectValue,
  SelectContent,
} from '../../../components/ui/select';
import { axiosInstance } from '../../../lib/axiosinstance';
import { toast } from '../../../components/ui/use-toast';
import ConnectsDialog from '../../../components/shared/ConnectsDialog';

const skillSchema = z.object({
  label: z.string().nonempty('Please select a domain'),
  skillId: z.string().nonempty('Domain ID is required'),
  experience: z
    .string()
    .nonempty('Please enter your experience')
    .regex(/^\d+$/, 'Experience must be a number'),
  description: z.string().nonempty('Please enter description'),
  visible: z.boolean(),
  status: z.string(),
});

const SkillDialog = ({ skills, onSubmitSkill }) => {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    getValues,
    trigger,
  } = useForm({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skillId: '',
      label: '',
      experience: '',
      description: '',
      visible: false,
      status: 'ADDED',
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post(`/business/hire-dehixtalent`, {
        skillId: data.skillId,
        skillName: data.label,
        businessId: user.uid,
        experience: data.experience,
        description: data.description,
        status: data.status,
        visible: data.visible,
      });

      if (response.status === 200 && response?.data?.data) {
        onSubmitSkill({ ...data, uid: response.data.data._id });
        reset();
        setOpen(false);
        toast({
          title: 'Talent Added',
          description: 'The Hire Talent has been successfully added.',
        });

        const connectsCost = parseInt(
          process.env.NEXT_PUBLIC__APP_HIRE_TALENT_COST || '0',
          10
        );

        const currentConnects = Number(localStorage.getItem('DHX_CONNECTS')) || 0;
        const updatedConnects = Math.max(0, currentConnects - connectsCost);
        localStorage.setItem('DHX_CONNECTS', updatedConnects.toString());
        window.dispatchEvent(new Event('connectsUpdated'));
      } else {
        throw new Error('Failed to add hire talent');
      }
    } catch (error) {
      console.error('Error submitting skill data', error);
      reset();
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to add hire talent. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)} className="w-full sm:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add Skill
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Skill</DialogTitle>
          <DialogDescription>
            Select a skill, enter your experience and monthly pay.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <Controller
              control={control}
              name="label"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={(selectedLabel) => {
                    const selectedDomain = skills.find(
                      (skill) => skill.label === selectedLabel
                    );
                    field.onChange(selectedLabel);
                    setValue('skillId', selectedDomain?._id || '');
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {skills.map((skill) => (
                      <SelectItem key={skill.label} value={skill.label}>
                        {skill.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          {errors.label && <p className="text-red-600">{errors.label.message}</p>}
          <div className="mb-3">
            <Controller
              control={control}
              name="experience"
              render={({ field }) => (
                <div className="col-span-3 relative">
                  <input
                    type="number"
                    placeholder="Experience (years)"
                    min={0}
                    max={50}
                    step={0.1}
                    {...field}
                    className="border p-2 rounded mt-0 w-full"
                  />
                  <span className="absolute right-10 top-1/2 transform -translate-y-1/2 text-grey-500 pointer-events-none">
                    YEARS
                  </span>
                </div>
              )}
            />
          </div>
          {errors.experience && <p className="text-red-600">{errors.experience.message}</p>}
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <input
                type="text"
                placeholder="Description"
                {...field}
                className="border p-2 rounded mt-2 w-full"
              />
            )}
          />
          {errors.description && <p className="text-red-600">{errors.description.message}</p>}
          <ConnectsDialog
            loading={loading}
            setLoading={setLoading}
            onSubmit={onSubmit}
            isValidCheck={trigger}
            userId={user.uid}
            buttonText={'Submit'}
            userType={'BUSINESS'}
            requiredConnects={parseInt(process.env.NEXT_PUBLIC__APP_HIRE_TALENT_COST || '0', 10)}
            data={getValues()}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SkillDialog;