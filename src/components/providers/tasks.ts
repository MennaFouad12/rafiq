// data/tasks.ts
export interface Task {
  id: string;
  title: string;
  status: 'todo' | 'in-progress' | 'blocked' | 'urgent' | 'completed';
  dueDate: string;
  assignee: string;
}

export const tasks: Task[] = [
  {
    id: 'TASK-125',
    title: 'Develop responsive bento grid components',
    status: 'in-progress',
    dueDate: '25 Oct 2025',
    assignee: 'JD',
  },
  {
    id: 'TASK-128',
    title: 'Refactor global navigation state management',
    status: 'todo',
    dueDate: '28 Oct 2025',
    assignee: 'SL',
  },
  {
    id: 'TASK-131',
    title: 'Implement glassmorphism effect on modals',
    status: 'completed',
    dueDate: '22 Oct 2025',
    assignee: 'MK',
  },
  {
    id: 'TASK-134',
    title: 'User research for enterprise dashboard layout',
    status: 'in-progress',
    dueDate: '30 Oct 2025',
    assignee: 'AM',
  },
  {
    id: 'TASK-142',
    title: 'Critical Bug: Fix navigation lag on Safari mobile',
    status: 'urgent',
    dueDate: '24 Oct 2025',
    assignee: 'RV',
  },
  {
    id: 'TASK-143',
    title: 'Incorporate stakeholder feedback from v1.2 Review',
    status: 'todo',
    dueDate: '12 Oct 2025',
    assignee: 'MT',
  },
  {
    id: 'TASK-144',
    title: 'Audit typography hierarchy for mobile views',
    status: 'todo',
    dueDate: '14 Oct 2025',
    assignee: 'JD',
  },
  {
    id: 'TASK-145',
    title: 'Interactive Prototype for Curator Dashboard',
    status: 'in-progress',
    dueDate: 'Today',
    assignee: 'SK',
  },
  {
    id: 'TASK-146',
    title: 'Sync external assets database to Curator core',
    status: 'blocked',
    dueDate: 'Delayed',
    assignee: 'MT',
  },
];