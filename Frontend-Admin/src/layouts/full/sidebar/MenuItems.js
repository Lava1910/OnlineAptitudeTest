import {
  IconBrandSuperhuman, IconLayoutDashboard, IconUserPlus, IconQuestionCircle, IconZoomQuestion
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'List',
  },
  {
    id: uniqueId(),
    title: 'Candicate List',
    icon: IconBrandSuperhuman,
    href: '/ui/candidatelist',
  },
  {
    id: uniqueId(),
    title: 'Question List',
    icon: IconQuestionCircle,
    href: '/ui/questionlist',
  },
  {
    navlabel: true,
    subheader: 'Action',
  },
  {
    id: uniqueId(),
    title: "Create account",
    icon: IconUserPlus,
    href: '/ui/create-account',
  },
  {
    id: uniqueId(),
    title: 'Create question',
    icon: IconZoomQuestion,
    href: '/ui/create-question',
  }
];

export default Menuitems;
