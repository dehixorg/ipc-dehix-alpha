import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

import { Button } from '../../components/ui/button';
import { GeneralInfo } from '../form/resumeform/GeneralInfo';
import { PersonalInfo } from '../form/resumeform/PersonalInfo';
import { EducationInfo } from '../form/resumeform/EducationInfo';
import { SkillInfo } from '../form/resumeform/SkillInfo';
import { WorkExperienceInfo } from '../form/resumeform/WorkExperienceInfo';
import { SummaryInfo } from '../form/resumeform/SummaryInfo';
import { AchievementInfo } from '../form/resumeform/Achievement';
import { ResumePreview1 } from './ResumePreview1';
import { ResumePreview2 } from './ResumePreview2';
import { AtsScore } from './atsScore';
import {
  menuItemsBottom,
  menuItemsTop,
} from '../../config/menuItems/freelancer/settingsMenuItems';
import Header from '../../components/header/header';
import SidebarMenu from '../../components/menu/sidebarMenu';

function ResumeEditor() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState('ResumePreview2');
  const [showAtsScore, setShowAtsScore] = useState(false);
  const [personalData, setPersonalData] = useState([{
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    phone: '123-456-7890',
    location: 'New York, USA',
    linkedin: 'linkedin.com/in/johndoe',
    github: 'github.com/johndoe'
  }]);
  const [educationData, setEducationData] = useState([
    {
      degree: 'Bachelor of Science in Computer Science',
      school: 'ABC University',
      startDate: '2023-12-31',
      endDate: '2023-12-31',
    }
  ]);
  const [workExperienceData, setWorkExperienceData] = useState([
    {
      jobTitle: 'Software Developer',
      company: 'Tech Company',
      startDate: '2023-01-01',
      endDate: '2023-12-31',
      description: 'Led development of key features'
    }
  ]);
  const [skillData, setSkillData] = useState([
    { skillName: 'React' },
    { skillName: 'JavaScript' },
    { skillName: 'Node.js' }
  ]);
  const [projectData, setProjectData] = useState([
    {
      title: 'Project 1',
      description: 'A sample project'
    }
  ]);
  const [achievementData, setAchievementData] = useState([
    {
      achievementName: 'Achievement 1',
      description: 'A notable achievement'
    }
  ]);
  const [summaryData, setSummaryData] = useState([
    'Experienced software developer with expertise in web technologies.'
  ]);
  const [selectedColor, setSelectedColor] = useState('#000000');

  const resumeRef = useRef(null);

  const steps = [
    <PersonalInfo
      key="personal"
      personalData={personalData}
      setPersonalData={setPersonalData}
    />,
    <WorkExperienceInfo
      key="experience"
      workExperienceData={workExperienceData}
      setWorkExperienceData={setWorkExperienceData}
    />,
    <EducationInfo
      key="education"
      educationData={educationData}
      setEducationData={setEducationData}
    />,
    <GeneralInfo
      key="projects"
      projectData={projectData}
      setProjectData={setProjectData}
    />,
    <SkillInfo
      key="skills"
      skillData={skillData}
      setSkillData={setSkillData}
      projectData={projectData}
    />,
    <AchievementInfo
      key="achievements"
      achievementData={achievementData}
      setAchievementData={setAchievementData}
    />,
    <SummaryInfo
      key="summary"
      summaryData={summaryData}
      setSummaryData={setSummaryData}
      workExperienceData={workExperienceData}
    />
  ];

  const handleTemplateChange = (page) => {
    setSelectedTemplate(page === 1 ? 'ResumePreview1' : 'ResumePreview2');
  };

  const downloadPDF = async () => {
    const element = resumeRef.current;
    if (!element) return;

    const resumeContentElement = element.querySelector('.resumeContent');
    if (!resumeContentElement) return;

    try {
      const canvas = await html2canvas(resumeContentElement, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('portrait', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Resume.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  const renderContent = () => (
    <div className="flex flex-col md:flex-row gap-8 p-6">
      <div className="w-full md:w-1/2">
        <div className="flex justify-between items-center mb-6">
          <Button
            onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
            disabled={currentStep === 0}
          >
            <ChevronLeft className="mr-2" /> Previous
          </Button>
          <span>Step {currentStep + 1} of {steps.length}</span>
          <Button
            onClick={() => setCurrentStep(prev => Math.min(steps.length - 1, prev + 1))}
            disabled={currentStep === steps.length - 1}
          >
            Next <ChevronRight className="ml-2" />
          </Button>
        </div>
        {steps[currentStep]}
      </div>

      <div className="w-full md:w-1/2" ref={resumeRef}>
        <div className="sticky top-6">
          <div className="flex justify-between mb-4">
            <div className="space-x-2">
              <Button
                variant={selectedTemplate === 'ResumePreview1' ? 'default' : 'outline'}
                onClick={() => handleTemplateChange(1)}
              >
                Template 1
              </Button>
              <Button
                variant={selectedTemplate === 'ResumePreview2' ? 'default' : 'outline'}
                onClick={() => handleTemplateChange(2)}
              >
                Template 2
              </Button>
            </div>
            <div className="space-x-2">
              <Button variant="outline" onClick={() => setShowAtsScore(!showAtsScore)}>
                ATS Score
              </Button>
              <Button onClick={downloadPDF}>Download PDF</Button>
            </div>
          </div>

          <div className="resumeContent bg-white rounded-lg shadow-lg p-8">
            {selectedTemplate === 'ResumePreview1' ? (
              <ResumePreview1
                personalData={personalData[0]}
                educationData={educationData}
                workExperienceData={workExperienceData}
                projectData={projectData}
                skillData={skillData}
                achievementData={achievementData}
                summaryData={summaryData[0]}
                selectedColor={selectedColor}
              />
            ) : (
              <ResumePreview2
                personalData={personalData[0]}
                educationData={educationData}
                workExperienceData={workExperienceData}
                projectData={projectData}
                skillData={skillData}
                achievementData={achievementData}
                summaryData={summaryData[0]}
                selectedColor={selectedColor}
              />
            )}
          </div>

          {showAtsScore && (
            <div className="mt-4">
              <AtsScore
                personalData={personalData[0]}
                educationData={educationData}
                workExperienceData={workExperienceData}
                projectData={projectData}
                skillData={skillData}
                achievementData={achievementData}
                summaryData={summaryData[0]}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen flex-col bg-muted/40">
      <SidebarMenu
        menuItemsTop={menuItemsTop}
        menuItemsBottom={menuItemsBottom}
        active="Resume Editor"
      />
      <div className="flex flex-1 flex-col sm:gap-8 sm:py-0 sm:pl-14">
        <Header
          menuItemsTop={menuItemsTop}
          menuItemsBottom={menuItemsBottom}
          activeMenu="Resume Editor"
          breadcrumbItems={[
            { label: 'Settings', link: '#' },
            { label: 'Resume Building', link: '#' },
            { label: 'Resume Editor', link: '#' },
          ]}
        />
        {renderContent()}
      </div>
    </div>
  );
}

ResumeEditor.propTypes = {
  // No props needed as this is a standalone component
};

export default ResumeEditor;