import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';

import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Textarea } from '../../../components/ui/textarea';

const SkillInfo = ({ skillData, setSkillData, projectData }) => {
  const [aiResponse, setAiResponse] = useState(''); // AI-generated skills

  const handleSkillChange = (index, value) => {
    const updatedSkills = [...skillData];
    updatedSkills[index] = { skillName: value };
    setSkillData(updatedSkills);
  };

  const handleAddSkill = () => {
    setSkillData([...skillData, { skillName: '' }]);
  };

  const handleRemoveSkill = (index) => {
    const updatedSkills = skillData.filter((_, i) => i !== index);
    setSkillData(updatedSkills);
  };

  return (
    <div>
      <div className="space-y-1.5 ml-5 mb-5">
        <h2 className="text-2xl">Skills</h2>
        <p className="text-sm text-gray-500">What are you good at?</p>
      </div>

      <form className="space-y-5 mt-5">
        {skillData.map((skill, index) => (
          <div key={index} className="relative space-y-4 p-6 shadow-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-semibold">Skill {index + 1}</h3>
              {index > 0 && (
                <Button
                  variant="outline"
                  onClick={() => handleRemoveSkill(index)}
                  className="p-1 rounded-full"
                >
                  <X className="h-5 w-5 text-red-500" />
                </Button>
              )}
            </div>
            <div>
              <Label
                htmlFor={`skillName-${index}`}
                className="block text-sm font-medium text-gray-500"
              >
                Skill Name
              </Label>
              <Input
                id={`skillName-${index}`}
                type="text"
                value={skill.skillName}
                onChange={(e) => handleSkillChange(index, e.target.value)}
                placeholder="e.g., React.js, Node.js, graphic design"
                className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
              />
            </div>
          </div>
        ))}
      </form>

      <div className="flex justify-center mt-4">
        <Button
          onClick={handleAddSkill}
          className="text-center justify-items-centerdark:text-black  light:bg-black"
        >
          <PlusCircle />
        </Button>
      </div>

      {aiResponse && (
        <div className="mt-8 p-6 shadow-lg">
          <h3 className="text-lg font-semibold mb-4">AI Suggestion</h3>
          <Textarea
            value={aiResponse}
            readOnly
            className="w-full border-4 border-transparent rounded-xl shadow-sm sm:text-sm 
                 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 
                 focus:outline-none"
            style={{
              backgroundClip: 'padding-box',
              backgroundColor: 'white',
            }}
            placeholder="AI-generated skills will appear here..."
          />
        </div>
      )}
    </div>
  );
};

export default SkillInfo;
