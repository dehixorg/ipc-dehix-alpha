export const MilestoneStatus = {
    NOT_STARTED: 'NOT_STARTED',
    ONGOING: 'ONGOING',
    COMPLETED: 'COMPLETED',
  };
  
  export const PaymentStatus = {
    PENDING: 'PENDING',
    PAID: 'PAID',
  };
  
  // Milestone structure
  export const Milestone = {
    _id: '', // Optional for creation
    date: '', // Optional for creation
    title: '',
    description: '',
    status: '',
    stories: [], // Optional for creation
    createdAt: '', // Optional for creation
    startDate: {
      expected: '',
      actual: '',
    },
    endDate: {
      expected: '',
      actual: '',
    },
    amount: undefined,
  };
  
  // Story structure
  export const Story = {
    _id: '',
    title: '',
    summary: '',
    storyStatus: '',
    tasks: [],
    importantUrls: [],
  };
  
  // Task structure
  export const Task = {
    _id: '',
    title: '',
    summary: '',
    taskStatus: '',
    freelancers: null,
  };
  
  // Important URL structure
  export const ImportantUrl = {
    urlName: '',
    url: '',
  };
  