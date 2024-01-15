/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import { useState } from 'react';
import { calculateDiff } from '../../Utils/dates';
import {
  PROFILE_CONTACT_ICONS,
  PROFILE_LINKS_ICONS,
} from '../../Utils/iconsLibrary';
import './Profile.css';

import ProfilePic from '../../Assets/Images/profile.jpg';

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
  value?: string;
  isHidden: boolean;
  icon: string;
  iconClass?: string;
};

type ImageType = {
  showImage: boolean;
};

type ProfileProps = {
  data: {
    name: string;
    role: string;
    overallExperienceStartDate: string;
    bio: string;
    contact: ContactType[];
    socials: SocialType[];
    image: ImageType;
  };
};

function Profile({ data }: ProfileProps) {
  const [profileState] = useState(data);

  // fetch the current profile picture name [user can save more than one]
  const profileImage = profileState.image?.showImage ? ProfilePic : '';

  const getBio = (bio: string, propertyName: string, expStartDate: string) => {
    return bio.replace(`{{${propertyName}}}`, calculateDiff(expStartDate));
  };

  return (
    <div className="profile-section">
      <div className="main-info">
        <div className="bio-and-image">
          <div className="bio-wrapper">
            <div className="name-text">{profileState.name}</div>
            <div className="role-text">{profileState.role}</div>
            <div className="bio-text">
              {getBio(
                profileState.bio,
                'experience',
                profileState.overallExperienceStartDate
              )}
            </div>
          </div>
          {profileState.image?.showImage && (
            <div className="image-wrapper">
              <img
                src={profileImage}
                alt={`profile of ${profileState.name}`}
                className="profile-picture"
              />
            </div>
          )}
        </div>

        <div className="all-socials">
          <div className="contacts-wrapper">
            {profileState.contact
              .filter((contact) => !contact.isHidden)
              .map((contact) => {
                let contactElement;

                switch (contact.type) {
                  case 'email':
                    contactElement = (
                      <a
                        className="email-text"
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
                        className="phone-text"
                        href={`tel:${contact.value.replace(/\s+/g, '')}`}
                        rel="noreferrer noopener"
                      >
                        {contact.value}
                      </a>
                    );
                    break;
                  case 'website':
                    contactElement = (
                      <a
                        className="website-text"
                        href={contact.link}
                        rel="noreferrer noopener"
                      >
                        {contact.value}
                      </a>
                    );
                    break;
                  default:
                    contactElement = (
                      <p className="other-contact-text">{contact.value}</p>
                    );
                    break;
                }
                return (
                  <div className="contact" key={`contact-${contact.type}`}>
                    <div className={`contact-icon ${contact.iconClass ?? ''}`}>
                      {
                        PROFILE_CONTACT_ICONS[
                          contact.icon as keyof typeof PROFILE_CONTACT_ICONS
                        ]
                      }
                    </div>
                    <div className="contact-text">{contactElement}</div>
                  </div>
                );
              })}
          </div>

          <hr className="link-hr" />

          <div className="socials-wrapper all-socials-wrapper">
            {profileState.socials
              .filter((social) => !social.isHidden)
              .map((social) => (
                <div className="social" key={`social-${social.type}`}>
                  <div className={`social-icon ${social.iconClass ?? ''}`}>
                    {
                      PROFILE_LINKS_ICONS[
                        social.icon as keyof typeof PROFILE_LINKS_ICONS
                      ]
                    }
                  </div>
                  <div className="social-text">
                    <a
                      href={social.value}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      {social.type}
                    </a>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
