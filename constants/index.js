import {
  Bars3Icon,
  BellIcon,
  CalendarIcon,
  ChartPieIcon,
  Cog6ToothIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
export const navigation = [
  { name: "Home", href: "/", icon: HomeIcon, current: true },
  {
    name: "Articles",
    href: "/articles",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  { name: "Podcasts", href: "/podcasts", icon: CalendarIcon, current: false },
  { name: "Messages", href: "/anonymous", icon: CalendarIcon, current: false },
  {
    name: "Newsletter",
    href: "/newsletter",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  {
    name: "Courses",
    href: "/courses",
    icon: DocumentDuplicateIcon,
    current: false,
  },
  
  { name: "Resources", href: "/resources", icon: ChartPieIcon, current: false },
];

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

import moment from 'moment';

// Global utility function to format a date
export const formatMonth = (date) => {
  return moment(date).format('MMMM');
};

export const formatDay = (date) => {
  return moment(date).format('DD');
};

export const GenerateSlug = (text)=>{
  return text
    .toString() // Convert to string
    .normalize('NFKD') // Normalize Unicode characters
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing whitespace
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars except -
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}