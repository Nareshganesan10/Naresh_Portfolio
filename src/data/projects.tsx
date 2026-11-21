import type { ReactNode } from 'react';

export type Project = {
  id: string;
  name: string;
  type: string;
  status: string;
  description: string;
  stack: string[];
  details: string[];
  note?: ReactNode;
};

export const projects: Project[] = [
  {
    id: 'ge-engine', name: 'GE Reporting Workloads', type: 'PROFESSIONAL EXPERIENCE', status: 'CASE STUDY',
    description: 'Backend APIs and Kubernetes-based services supporting monitoring, streaming and reporting workloads for industrial data.',
    stack: ['Python', 'Flask', 'PostgreSQL', 'Redis', 'Kafka', 'Kubernetes', 'AWS S3'],
    details: [
      'Developed backend REST APIs for monitoring and reporting data from electrical appliances and industrial machinery.',
      'Worked across Kubernetes microservices, scheduled CronJobs and data integrations.',
      'Processed reporting data one month at a time and maintained aggregations in Python dictionaries.',
      'For the discussed workload, reduced the per-job memory requirement from 1 GB to a maximum of approximately 550 MB after addressing Kubernetes OOM-kill issues.',
      'The workload covered approximately 100,000 records across sites.',
    ],
    note: 'The 1 GB → ~550 MB figure and ~100,000-record workload come from additional project details you previously shared, not from the uploaded resume. Confirm these figures and the exact measurement context before publishing.',
  },
  {
    id: 'hdfc-platform', name: 'Insurance Agent Platform', type: 'PROFESSIONAL EXPERIENCE', status: 'CASE STUDY',
    description: 'Serverless backend services supporting agent workflows and customer communication for an insurance platform.',
    stack: ['Python', 'AWS Lambda', 'API Gateway', 'DynamoDB', 'SNS', 'Pinpoint', 'Gupshup'],
    details: [
      'Supported attendance, lead management, lead closure and customer communication workflows.',
      'Built services around AWS Lambda, API Gateway and DynamoDB.',
      'Integrated WhatsApp notifications and supporting email communication workflows.',
    ],
  },
  {
    id: 'cme-etl', name: 'ETL Modernization', type: 'PROFESSIONAL EXPERIENCE', status: 'CASE STUDY',
    description: 'Python-based data processing and automation work to modernize legacy ETL workflows.',
    stack: ['Python', 'PostgreSQL', 'AWS RDS', 'Docker', 'Jenkins'],
    details: [
      'Rewrote legacy ETL processes with a focus on performance and scalability.',
      'Automated data ingestion and validation using Python utilities.',
      'Containerized workflows and automated deployments through Jenkins CI/CD.',
    ],
  },
  {
    id: 'stoqo', name: 'STOQO', type: 'PERSONAL PROJECT', status: 'IN DEVELOPMENT',
    description: 'A B2B inventory management product with a B2C marketplace direction.',
    stack: ['Django REST Framework', 'Python', 'PostgreSQL', 'React Native', 'Expo'],
    details: [
      'Product concept: connect inventory workflows with a customer-facing marketplace.',
      'Backend and frontend are separate applications.',
      'This is a personal project; implementation status and shipped features should be updated before public launch.',
    ],
  },
];
