import React, { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { Plus, Save, X } from 'lucide-react';
import { useSelector } from 'react-redux';

// Replace TypeScript type definitions with PropTypes
import PropTypes from 'prop-types';

// Remove type imports and replace with regular imports
import { Card } from '../ui/card';
import ConnectsDialog from '../shared/ConnectsDialog';
import DraftDialog from '../shared/DraftDialog';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';
import { cn } from '@/lib/utils';
import { Button } from '../../components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../components/ui/form';
// ... rest of imports

const FormSteps = {
  ProjectInfo: 'ProjectInfo',
  ProfileInfo: 'ProfileInfo',
};

const defaultValues = {
  projectName: '',
  email: '',
  projectDomain: [],
  urls: [],
  description: '',
  profiles: [
    {
      domain: '',
      freelancersRequired: '',
      skills: [],
      experience: '',
      minConnect: '',
      rate: '',
      description: '',
      domain_id: '',
    },
  ],
};

const FORM_DRAFT_KEY = 'DEHIX-BUSINESS-DRAFT';

function CreateProjectBusinessForm() {
  // Replace RootState type with plain object
  const user = useSelector(state => state.user);
  const [skills, setSkills] = useState([]);
  const [currSkills, setCurrSkills] = useState([]);
  const [tmpSkill, setTmpSkill] = useState('');
  // ... rest of state declarations

  // Replace type annotations with JSDoc comments
  /**
   * @param {string} domainToDelete
   */
  const handleDeleteProjectDomain = (domainToDelete) => {
    const updatedDomains = currProjectDomains.filter(
      domain => domain !== domainToDelete
    );
    setCurrProjectDomains(updatedDomains);
    form.setValue('projectDomain', updatedDomains);
  };

  // ... rest of component logic

  return (
    <Card className="p-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="gap-5 lg:grid lg:grid-cols-2 xl:grid-cols-2"
        >
          {currentStep === FormSteps.ProjectInfo && renderProjectInfoStep()}
          {currentStep === FormSteps.ProfileInfo && renderProfileInfoStep()}
          
          <div className="w-full mt-4 flex col-span-2 justify-end">
            {currentStep === FormSteps.ProjectInfo && (
              <Button type="button" variant="outline" onClick={nextStep}>
                Next
              </Button>
            )}
          </div>
          <div className="w-full mt-4 flex col-span-2 justify-start">
            {currentStep === FormSteps.ProfileInfo && (
              <Button type="button" variant="outline" onClick={prevStep}>
                Prev
              </Button>
            )}
          </div>
        </form>
      </Form>
      {showLoadDraftDialog && (
        <DraftDialog
          dialogChange={showLoadDraftDialog}
          setDialogChange={setShowLoadDraftDialog}
          heading="Load Draft?"
          desc="A saved draft was found. Do you want to load it?"
          handleClose={discardDraft}
          handleSave={loadDraft}
          btn1Txt="Discard"
          btn2Txt="Load Draft"
        />
      )}
    </Card>
  );
}

// Add PropTypes validation
CreateProjectBusinessForm.propTypes = {
  // Add prop validations if needed
};

export default CreateProjectBusinessForm;