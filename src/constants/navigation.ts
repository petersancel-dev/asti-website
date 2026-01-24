export interface NavItem {
  label: string;
  href: string;
  image?: string;
  children?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'About ASTI', href: '/about', image: '/images/nav/about-asti.jpg' },
      { label: 'Our Story', href: '/about#story', image: '/images/nav/our-story.jpg' },
      { label: 'Careers', href: '/careers', image: '/images/nav/careers.jpg' },
      { label: 'Map & Directions', href: '/about#map', image: '/images/nav/map.jpg' },
      { label: 'FAQ', href: '/about#faq', image: '/images/nav/faq.jpg' },
    ],
  },
  {
    label: 'Academics',
    href: '/academics',
    children: [
      { label: 'Overview', href: '/academics', image: '/images/nav/academics-overview.jpg' },
      { label: 'Academic Calendar', href: '/academics#calendar', image: '/images/nav/academic-calendar.jpg' },
      { label: 'Faculty & Staff', href: '/academics#faculty', image: '/images/nav/faculty.jpg' },
    ],
  },
  {
    label: 'Online Learning',
    href: '/distance-learning',
  },
  {
    label: 'Admissions',
    href: '/admissions',
    children: [
      { label: 'Overview', href: '/admissions', image: '/images/nav/programs-levels.jpg' },
      { label: 'Financial Aid', href: '/admissions#financial-aid', image: '/images/nav/financial-aid.jpg' },
      { label: 'How to Apply', href: '/admissions#apply', image: '/images/nav/how-to-apply.jpg' },
      { label: 'Application Forms', href: '/admissions#forms', image: '/images/nav/application-forms.jpg' },
    ],
  },
  {
    label: 'Programmes',
    href: '/programmes',
  },
  {
    label: 'Alumni',
    href: '/alumni',
  },
  {
    label: 'Campus Life',
    href: '/campus-life',
    children: [
      { label: 'Overview', href: '/campus-life', image: '/images/nav/campus-overview.jpg' },
      { label: 'Events', href: '/campus-life#events', image: '/images/nav/events.jpg' },
      { label: 'Student Resources', href: '/campus-life#resources', image: '/images/nav/student-resources.jpg' },
    ],
  },
  {
    label: 'Research',
    href: '/research',
    children: [
      { label: 'Digital Library', href: '/research#library', image: '/images/nav/digital-library.jpg' },
      { label: 'Online LMS', href: '/research#lms', image: '/images/nav/online-lms.jpg' },
      { label: 'Research Guides', href: '/research#guides', image: '/images/nav/research-guides.jpg' },
    ],
  },
  {
    label: 'Contact',
    href: '/contact',
  },
];

export const CTA_BUTTON = {
  label: 'Apply Now',
  href: '/admissions',
};

