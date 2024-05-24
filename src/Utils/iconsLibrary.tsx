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

import { CgWebsite, CgDetailsMore, CgDetailsLess } from 'react-icons/cg';

import { US, GR } from 'country-flag-icons/react/3x2';

import FileBack from '../Assets/svg/fileBack.svg?react';
import FileFront from '../Assets/svg/fileFront.svg?react';
import FilePage from '../Assets/svg/filePage.svg?react';

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
  more_details: <CgDetailsMore />,
  less_details: <CgDetailsLess />,
};

const RESUME_NOT_FOUND_ICONS = {
  fileBack: <FileBack />,
  fileFront: <FileFront />,
  filePage: <FilePage />,
};

export {
  MENU_ICONS,
  PROFILE_CONTACT_ICONS,
  PROFILE_LINKS_ICONS,
  PROJECT_ICONS,
  WORK_EXPERIENCE_ICONS,
  RESUME_NOT_FOUND_ICONS,
};
