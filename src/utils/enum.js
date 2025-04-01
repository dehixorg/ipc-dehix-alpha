// created by Tushar Rajput
// date: 24/9/2024

export const Dehix_Talent_Card_Pagination = {
    BATCH: 3,
  };
  
  // Notification Types
  export const UserNotificationTypeEnum = {
    PROJECT_HIRING: 'PROJECT_HIRING',
    SKILL_INTERVIEW: 'SKILL_INTERVIEW',
    DOMAIN_INTERVIEW: 'DOMAIN_INTERVIEW',
    TALENT_INTERVIEW: 'TALENT_INTERVIEW',
  };
  
  // User Notification Interface (Converted to Object Structure)
  export const UserNotification = {
    id: '',
    message: '',
    type: '',
    entity: '',
    path: '',
    userId: '',
  };
  
  // Hiring Status
  export const HireDehixTalentStatusEnum = {
    ADDED: 'Added',
    APPROVED: 'Approved',
    CLOSED: 'Closed',
    COMPLETED: 'Completed',
  };
  
  // Business Status
  export const BusinessStatusEnum = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
    NOT_VERIFIED: 'Not Verified',
  };
  
  // Notification Type
  export const NotificationTypeEnum = {
    BUSINESS: 'Business',
    FREELANCER: 'Freelancer',
    BOTH: 'Both',
  };
  
  // Notification Status
  export const NotificationStatusEnum = {
    ACTIVE: 'Active',
    INACTIVE: 'Inactive',
  };
  
  // Oracle Status
  export const OracleStatusEnum = {
    APPLIED: 'APPLIED',
    NOT_APPLIED: 'NOT_APPLIED',
    APPROVED: 'APPROVED',
    FAILED: 'FAILED',
    STOPPED: 'STOPPED',
    REAPPLIED: 'REAPPLIED',
  };
  
  // Bid Status
  export const BidstatusEnum = {
    PENDING: 'Pending',
    ACCEPTED: 'Accepted',
    REJECTED: 'Rejected',
    PANEL: 'Panel',
    INTERVIEW: 'Interview',
  };
  
  // Domain Status
  export const DomainStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    ARCHIVED: 'ARCHIVED',
  };
  
  // Freelancer Status
  export const FreelancerStatusEnum = {
    ACTIVE: 'Active',
    PENDING: 'Pending',
    INACTIVE: 'Inactive',
    CLOSED: 'Closed',
  };
  
  // User Types
  export const Type = {
    FREELANCER: 'FREELANCER',
    ADMIN: 'ADMIN',
    BUSINESS: 'BUSINESS',
  };
  
  // Ticket Status
  export const TicketStatus = {
    CREATED: 'Created',
    CLOSED: 'Closed',
    ACTIVE: 'Active',
  };
  