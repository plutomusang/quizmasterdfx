import styled from 'styled-components';

interface ThemeProps {
  theme: {
    sideMenuBackground: string;
    color: string;
  };
}

// SideMenu styled component
const SideMenu = styled.div<ThemeProps>`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.sideMenuBackground}; /* Use theme side menu background */
  color: ${({ theme }) => theme.color};
`;

export default SideMenu;
