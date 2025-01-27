import React, { useEffect, useMemo, useState } from 'react';
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
  displayAsSection: boolean;
  sectionTitle: string;
  isHidden: boolean;
  entries: SocialType[];
};

type ImageType = {
  showImage: boolean;
};

export type ProfileProps = {
  profileData: {
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

function Profile({ profileData }: ProfileProps) {
  const { appLocale } = useLocale();
  const { expandedView } = useExpandedView();
  const isNotMobile = useMediaQuery(`only screen and (min-width: 768px)`);

  const [isScrollUnderLeftSections, setIsScrollUnderLeftSections] =
    useState(false);

  useEffect(() => {
    let totalLeftSectionsHeight = 0;

    const calculateTotalHeight = () => {
      totalLeftSectionsHeight = 0;
      document
        .querySelectorAll('.expanded-view .resume .resume__left section')
        .forEach((currentSection) => {
          totalLeftSectionsHeight += currentSection.scrollHeight;
        });
    };

    const handleScrollUnderLeftSections = () => {
      if (isNotMobile && expandedView) {
        if (totalLeftSectionsHeight === 0) {
          // Only calculate once
          calculateTotalHeight();
        }

        const isUnder = window.scrollY > totalLeftSectionsHeight;
        setIsScrollUnderLeftSections((prev) => {
          // Avoid redundant state updates
          if (prev !== isUnder) {
            return isUnder;
          }
          return prev;
        });
      } else {
        setIsScrollUnderLeftSections(false);
      }
    };

    if (isNotMobile && expandedView) {
      // Initial calculation
      calculateTotalHeight();
    }

    window.addEventListener('scroll', handleScrollUnderLeftSections);
    return () =>
      window.removeEventListener('scroll', handleScrollUnderLeftSections);
  }, [expandedView, isNotMobile]);

  // fetch the current profile picture name [user can save more than one]
  const profileImage = profileData.image?.showImage ? ProfilePic : '';

  const bio = useMemo(() => {
    return replacePlaceholderWithYearDifference(
      profileData.bio,
      profileData.overallExperienceStartDate,
      false,
      appLocale
    );
  }, [profileData.bio, profileData.overallExperienceStartDate, appLocale]);

  // Contact Component
  const Contact = ({ contact }: { contact: ContactType }) => {
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
      <div className="profile__contact">
        <div className={`profile__contact-icon ${contact.iconClass ?? ''}`}>
          {
            PROFILE_CONTACT_ICONS[
              contact.icon as keyof typeof PROFILE_CONTACT_ICONS
            ]
          }
        </div>
        <div className="profile__contact-text">{contactElement}</div>
      </div>
    );
  };

  // Social Component
  const Social = ({ social }: { social: SocialType }) => (
    <div className="profile__social">
      <div className={`profile__social-icon ${social.iconClass ?? ''}`}>
        {PROFILE_LINKS_ICONS[social.icon as keyof typeof PROFILE_LINKS_ICONS]}
      </div>
      <div className="profile__social-text">
        <a href={social.value} target="_blank" rel="noreferrer noopener">
          {printUrl(social.value)}
        </a>
      </div>
    </div>
  );

  return (
    <section
      id="profile"
      className={`profile__section ${
        isScrollUnderLeftSections ? 'sticky' : ''
      }`}
    >
      <div className="profile__container">
        <div className="profile__bio-and-pic">
          {profileData.image?.showImage && (
            <div className="profile__picture-wrapper">
              <img
                src={profileImage}
                alt={`profile of ${profileData.name}`}
                className="profile__picture"
                width="160"
                height="160"
              />
            </div>
          )}
          <div className="profile__bio-wrapper">
            <div className="profile__name">{profileData.name}</div>
            <div className="profile__role">{profileData.role}</div>
            {profileData.showBio && (
              <div className="profile__bio">{bio}</div>
            )}
          </div>
        </div>

        <div className={`profile__contacts-and-socials ${profileData.socials.displayAsSection ? 'with_sections' : 'without_sections'}`}>
          <div className="profile__contacts-wrapper">
            {profileData.contact
              .filter((contact) => !contact.isHidden)
              .map((contact, index) => (
                <Contact contact={contact} key={`contact-${contact.type}-${index}`} />
              ))}
          </div>

          <div className="profile__socials-wrapper">
            {profileData.socials.displayAsSection && (
              <h2 className="profile__social-heading section-title">
                {profileData.socials.sectionTitle}
              </h2>
            )}

            {profileData.socials.entries
              .filter((social) => !social.isHidden)
              .map((social, index) => (
                <Social social={social} key={`social-${social.type}-${index}`} />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Profile);
