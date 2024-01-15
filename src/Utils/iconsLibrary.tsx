/* eslint-disable import/no-extraneous-dependencies */
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';

import {
  FaGlobe,
  FaGithub,
  FaLinkedin,
  FaStackOverflow,
  FaSquareXTwitter,
  FaTerminal,
  FaLaptopCode,
} from 'react-icons/fa6';

import { CgWebsite } from 'react-icons/cg';

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
};

const PROJECT_ICONS = {
  website: <CgWebsite />,
};

export {
  PROFILE_CONTACT_ICONS,
  PROFILE_LINKS_ICONS,
  PROJECT_ICONS,
  WORK_EXPERIENCE_ICONS,
};
