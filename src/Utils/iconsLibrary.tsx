import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

import {
  FaRegCalendarDays,
  FaGlobe,
  FaGithub,
  FaLaptopCode,
  FaLinkedin,
  FaLocationDot,
  FaPrint,
  FaRegFilePdf,
  FaRegMoon,
  FaSpinner,
  FaSquareXTwitter,
  FaStackOverflow,
  FaSun,
  FaTerminal,
} from 'react-icons/fa6';

import { CgWebsite } from 'react-icons/cg';

import { US, GR } from 'country-flag-icons/react/3x2';

const PROFILE_CONTACT_ICONS = {
  email: <MdEmail />,
  phone: <MdPhone />,
  website: <FaGlobe />,
  address: <MdLocationOn />,
};

const PROFILE_LINKS_ICONS = {
  github: <FaGithub />,
  linkedin: <FaLinkedin />,
  terminal: <FaTerminal />,
  stackoverflow: <FaStackOverflow />,
  twitter: <FaSquareXTwitter />,
};

const WORK_EXPERIENCE_ICONS = {
  code: <FaLaptopCode />,
  calendar: <FaRegCalendarDays />,
  location: <FaLocationDot />,
};

const PROJECT_ICONS = {
  website: <CgWebsite />,
};

const MENU_ICONS = {
  el_gr: (
    <GR
      title="Αλλαγή γλώσσας σε Ελληνικά"
      className="language-flag language-el-gr"
    />
  ),
  en_us: (
    <US
      title="Change language to English - United States"
      className="language-flag language-en-us"
    />
  ),
  loading: <FaSpinner className="spinner" />,
  moon: <FaRegMoon />,
  pdf: <FaRegFilePdf />,
  print: <FaPrint />,
  sun: <FaSun />,
};

export {
  MENU_ICONS,
  PROFILE_CONTACT_ICONS,
  PROFILE_LINKS_ICONS,
  PROJECT_ICONS,
  WORK_EXPERIENCE_ICONS,
};
