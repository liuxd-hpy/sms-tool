import { create } from 'zustand';

export interface SMSTemplate {
  id: string;
  name: string;
  content: string;
}

const defaultTemplates: SMSTemplate[] = [
  {
    id: '1',
    name: '问候短信',
    content: '您好！希望您今天过得愉快！',
  },
  {
    id: '2',
    name: '会议提醒',
    content: '您好，提醒您今天下午3点有会议，请准时参加。',
  },
  {
    id: '3',
    name: '感谢短信',
    content: '非常感谢您的帮助！',
  },
];

interface AppState {
  templates: SMSTemplate[];
}

export const useStore = create<AppState>()(() => ({
  templates: defaultTemplates,
}));
