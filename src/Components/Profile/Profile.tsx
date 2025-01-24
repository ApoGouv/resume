import { useState, useEffect } from 'react';
import useLocale from '@/Hooks/useLocale';
import useExpandedView from '@/Hooks/useExpandedView';
import useMediaQuery from '@/Hooks/useMediaQuery';
import { replacePlaceholderWithYearDifference } from '@/Utils/dates';
import { printUrl } from '@/Utils/strings';
import {
  PROFILE_CONTACT_ICONS,
  PROFILE_LINKS_ICONS,
} from '@/Utils/iconsLibrary';

import '@/Components/Profile/Profile.css';

import ProfilePic from '@/Assets/Images/Profile/profile-160x160.opt.webp';

type ContactType = {
  type: string;
  value: string;
  isHidden: boolean;
  icon: string;
  link?: string;
  iconClass?: string;
};

type SocialType = {
  type: string;
  value: string;
  isHidden: boolean;
  icon: string;
  iconClass?: string;
};

type SocialSectionType = {
  sectionTitle: string;
  isHidden: boolean;
  entries: SocialType[];
};

type ImageType = {
  showImage: boolean;
};

export type ProfileProps = {
  data: {
    name: string;
    role: string;
    overallExperienceStartDate: string;
    bio: string;
    showBio: boolean;
    contact: ContactType[];
    socials: SocialSectionType;
    image: ImageType;
  };
};

function Profile({ data }: ProfileProps) {
  const [profileState, setProfileState] = useState(data);

  useEffect(() => {
    setProfileState({ ...data });
  }, [data]);

  const { appLocale } = useLocale();
  const { expandedView } = useExpandedView();
  const isNotMobile = useMediaQuery(`only screen and (min-width: 768px)`);

  const [isScrollUnderLeftSections, setIsScrollUnderLeftSections] =
    useState(false);
  useEffect(() => {
    const handleScrollUnderLeftSections = () => {
      let totalLeftSectionsHeight = 0;
      if (isNotMobile && expandedView) {
        document
          .querySelectorAll('.expanded-view .resume .resume__left section')
          .forEach((currentSection) => {
            totalLeftSectionsHeight += currentSection.scrollHeight;
          });

        setIsScrollUnderLeftSections(window.scrollY > totalLeftSectionsHeight);
      } else {
        setIsScrollUnderLeftSections(false);
      }
    };
    window.addEventListener('scroll', handleScrollUnderLeftSections);
    return () =>
      window.removeEventListener('scroll', handleScrollUnderLeftSections);
  }, [expandedView, isNotMobile]);

  // fetch the current profile picture name [user can save more than one]
  const profileImage = profileState.image?.showImage ? ProfilePic : '';

  const getBio = () => {
    return replacePlaceholderWithYearDifference(
      profileState.bio,
      profileState.overallExperienceStartDate,
      false,
      appLocale
    );
  };

  return (
    <section
      id="profile"
      className={`profile__section ${
        isScrollUnderLeftSections ? 'sticky' : ''
      }`}
    >
      <div className="profile__container">
        <div className="profile__bio-and-pic">
          {profileState.image?.showImage && (
            <div className="profile__picture-wrapper">
              <img
                src={profileImage}
                alt={`profile of ${profileState.name}`}
                className="profile__picture"
                width="160"
                height="160"
              />
            </div>
          )}
          <div className="profile__bio-wrapper">
            <div className="profile__name">{profileState.name}</div>
            <div className="profile__role">{profileState.role}</div>
            {profileState.showBio && (
              <div className="profile__bio">{getBio()}</div>
            )}
          </div>
        </div>

        <div className="profile__contacts-and-socials">
          <div className="profile__contacts-wrapper">
            {profileState.contact
              .filter((contact) => !contact.isHidden)
              .map((contact) => {
                let contactElement;

                switch (contact.type) {
                  case 'email':
                    contactElement = (
                      <a
                        className="profile__email"
                        href={`mailto:${contact.value}`}
                        rel="noreferrer noopener"
                      >
                        {contact.value}
                      </a>
                    );
                    break;
                  case 'phone':
                    contactElement = (
                      <a
                        className="profile__phone"
                        href={`tel:${contact.value.replace(/\s+/g, '')}`}
                        rel="noreferrer noopener"
                      >
                        {contact.value}
                      </a>
                    );
                    break;
                  case 'website':
                    if ('link' in contact && contact.link) {
                      contactElement = (
                        <a
                          className="profile__website"
                          href={contact.link}
                          rel="noreferrer noopener"
                        >
                          {printUrl(contact.link)}
                        </a>
                      );
                    }
                    break;
                  default:
                    contactElement = (
                      <p className="profile__other-contact">{contact.value}</p>
                    );
                    break;
                }
                return (
                  <div
                    className="profile__contact"
                    key={`contact-${contact.type}`}
                  >
                    <div
                      className={`profile__contact-icon ${
                        contact.iconClass ?? ''
                      }`}
                    >
                      {
                        PROFILE_CONTACT_ICONS[
                          contact.icon as keyof typeof PROFILE_CONTACT_ICONS
                        ]
                      }
                    </div>
                    <div className="profile__contact-text">
                      {contactElement}
                    </div>
                  </div>
                );
              })}
          </div>

          <div className="profile__socials-wrapper">
            <h2 className="profile__social-heading section-title">
              {profileState.socials.sectionTitle}
            </h2>
            {profileState.socials.entries
              .filter((social) => !social.isHidden)
              .map((social) => (
                <div className="profile__social" key={`social-${social.type}`}>
                  <div
                    className={`profile__social-icon ${social.iconClass ?? ''}`}
                  >
                    {
                      PROFILE_LINKS_ICONS[
                        social.icon as keyof typeof PROFILE_LINKS_ICONS
                      ]
                    }
                  </div>
                  <div className="profile__social-text">
                    <a
                      href={social.value}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {printUrl(social.value)}
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
