import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import infoCardsData from '../../assets/infocard.json'; // Import the JSON data
import footerContent from '../../assets/footercontent.json'; // Import the footer JSON data
import { FaFacebook, FaTwitter, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const LandingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`;

const ContentContainer = styled.div`
  padding: 40px;
  margin-bottom: 40px;
  background-color: ${({ theme }) => theme.background};
  border-radius: 10px;
  text-align: center;
  margin-bottom: 100px;
  padding-top: 100px;
  padding-bottom: 100px;
`;

const Title = styled.h1`
  font-size: 48px;
  margin-bottom: 20px;
  color: ${({ theme }) => theme.color};
`;

const Subtitle = styled.p`
  font-size: 24px;
  margin-bottom: 40px;
  text-align: center;
  max-width: 600px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
`;

const Button = styled(Link)`
  padding: 10px 20px;
  font-size: 18px;
  color: #fff;
  background-color: ${({ theme }) => theme.primaryColor};
  border: 2px solid ${({ theme }) => theme.primaryColor};
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: #fff;
    color: ${({ theme }) => theme.primaryColor};
    transform: translateY(-2px);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: ${({ theme }) => theme.secondaryColor};
  border: 2px solid ${({ theme }) => theme.secondaryColor};

  &:hover {
    background-color: #fff;
    color: ${({ theme }) => theme.secondaryColor};
    transform: translateY(-2px);
  }
`;

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid lightgray;
  margin-bottom: 40px;
`;

const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 40px;
  flex-wrap: wrap;
`;

const Card = styled.div`
  background-color: ${({ theme }) => theme.secondaryBackground};
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  margin-bottom: 100px;
`;

const CardTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 24px;
  color: ${({ theme }) => theme.color};
`;

const CardList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  color: ${({ theme }) => theme.color};
`;

const CardListItem = styled.li`
  margin-bottom: 10px;
`;

const FooterWrapper = styled.footer`
  width: 100%;
  padding: 40px 20px;
  background-color: ${({ theme }) => theme.footerBackground};
  color: ${({ theme }) => theme.footerTextColor};
  display: grid;
  grid-template-columns: 3fr 2fr 1fr 1fr;
  gap: 40px;
  border-top: 5px solid rgba(0, 0, 0, 0.2);
  box-shadow: 0 -4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
`;

const FooterSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const FooterTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 20px;
  color: ${({ theme }) => theme.footerTextColor};
`;

const FooterLinks = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const FooterLink = styled.li`
  margin-bottom: 10px;

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.footerTextColor};

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 10px;
`;

const FooterIcon = styled.span`
  margin-right: 10px;
`;

interface InfoCard {
  title: string;
  points: string[];
}

interface Section {
  sections: InfoCard[];
}

interface FooterContent {
  companyInfo: {
    aboutUs: string;
    contactInfo: {
      email: string;
      phone: string;
      address: string;
    };
    socialMediaLinks: {
      facebook: string;
      twitter: string;
      linkedin: string;
    };
  };
  navigationLinks: {
    quickLinks: { url: string; name: string }[];
  };
  legalInfo: {
    termsOfService: string;
    privacyPolicy: string;
  };
}

const Footer: React.FC = () => {
  const { companyInfo, navigationLinks, legalInfo } = footerContent.footer as FooterContent;

  return (
    <FooterWrapper>
      <FooterSection style={{ gridColumn: '3fr' }}>
        <FooterTitle>About Us</FooterTitle>
        <p>{companyInfo.aboutUs}</p>
      </FooterSection>
      <FooterSection style={{ gridColumn: '2fr' }}>
        <FooterTitle>Contact Info</FooterTitle>
        <ContactInfo>
          <div>
            <FooterIcon><FaEnvelope /></FooterIcon>
            {companyInfo.contactInfo.email}
          </div>
          <div>
            <FooterIcon><FaPhone /></FooterIcon>
            {companyInfo.contactInfo.phone}
          </div>
          <div>
            <FooterIcon><FaMapMarkerAlt /></FooterIcon>
            {companyInfo.contactInfo.address}
          </div>
        </ContactInfo>
        <SocialIcons>
          <a href={companyInfo.socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
          <a href={companyInfo.socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          <a href={companyInfo.socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer"><FaLinkedin /></a>
        </SocialIcons>
      </FooterSection>
      <FooterSection style={{ gridColumn: '1fr' }}>
        <FooterTitle>Quick Links</FooterTitle>
        <FooterLinks>
          {navigationLinks.quickLinks.map((link, index) => (
            <FooterLink key={index}>
              <Link to={link.url}>{link.name}</Link>
            </FooterLink>
          ))}
        </FooterLinks>
      </FooterSection>
      <FooterSection style={{ gridColumn: '1fr' }}>
        <FooterTitle>Legal</FooterTitle>
        <FooterLinks>
          <FooterLink>
            <Link to={legalInfo.termsOfService}>Terms of Service</Link>
          </FooterLink>
          <FooterLink>
            <Link to={legalInfo.privacyPolicy}>Privacy Policy</Link>
          </FooterLink>
        </FooterLinks>
      </FooterSection>
    </FooterWrapper>
  );
};

const LandingPage: React.FC = () => {
  const { sections } = infoCardsData.landingPageInfoCard as Section;

  return (
    <LandingWrapper>
      <ContentContainer>
        <Title>Welcome to QuizMaster</Title>
        <Subtitle>The ultimate platform for mastering your exams. Get started by signing in, signing up, or learning more about us!</Subtitle>
        <ButtonGroup>
          <Button to="/login">Get Started</Button>
          <SecondaryButton to="/signup">Sign Up</SecondaryButton>
        </ButtonGroup>
      </ContentContainer>
      <Divider />
      <CardsContainer>
        {sections.map((card, index) => (
          <Card key={index}>
            <CardTitle>{card.title}</CardTitle>
            <CardList>
              {card.points.map((point, i) => (
                <CardListItem key={i}>{point}</CardListItem>
              ))}
            </CardList>
          </Card>
        ))}
      </CardsContainer>
      <Footer />
    </LandingWrapper>
  );
};

export default LandingPage;
