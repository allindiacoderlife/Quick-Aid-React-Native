import { AnimationObject } from 'lottie-react-native';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require('../assets/animation/L7.json'),
    text: 'Welcome to the Health-Care ',
    textColor: '#005b4f',
    backgroundColor: '#ffa3ce',
  },
  {
    id: 2,
    animation: require('../assets/animation/L5.json'),
    text: 'Book Appointments & Track Medications',
    textColor: '#1e2169',
    backgroundColor: '#bae4fd',
  },
  {
    id: 3,
    animation: require('../assets/animation/L6.json'),
    text: 'Get Notified & Stay Healthy',
    textColor: '#F15937',
    backgroundColor: '#faeb8a',
  },
];

export default data;
