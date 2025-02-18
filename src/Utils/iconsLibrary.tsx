import { EL_LOCALE, EN_LOCALE } from '@/constants';

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
  FaPlus,
} from 'react-icons/fa6';

import { CgWebsite, CgDetailsMore, CgDetailsLess } from 'react-icons/cg';

import { US, GR } from 'country-flag-icons/react/3x2';

import FileBack from '@/Assets/svg/fileBack.svg?react';
import FileFront from '@/Assets/svg/fileFront.svg?react';
import FilePage from '@/Assets/svg/filePage.svg?react';

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
  menu: <FaPlus />,
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

/**
 * Returns the icon key for the opposite locale, falling back to Greek if unsupported.
 *
 * @param locale The current app locale (e.g., 'el-GR', 'en-US').
 * @returns The icon key for the opposite locale (e.g., 'en_us' for 'el-GR').
 */
const getOppositeLocaleIconKey = (locale: string): string => {
  const opositeLocale = locale === EL_LOCALE ? EN_LOCALE : EL_LOCALE;
  const iconKey = opositeLocale.toLowerCase().replace('-', '_');
  if (MENU_ICONS[iconKey as keyof typeof MENU_ICONS]) {
    return iconKey;
  }
  return EL_LOCALE.toLowerCase().replace('-', '_'); // Fallback to Greek
};

export {
  MENU_ICONS,
  PROFILE_CONTACT_ICONS,
  PROFILE_LINKS_ICONS,
  PROJECT_ICONS,
  WORK_EXPERIENCE_ICONS,
  RESUME_NOT_FOUND_ICONS,
  getOppositeLocaleIconKey
};
