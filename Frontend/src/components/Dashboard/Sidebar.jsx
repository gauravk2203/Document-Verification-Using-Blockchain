import React from 'react';
import styled from 'styled-components';
import { FaHome, FaClock, FaSignOutAlt } from 'react-icons/fa'; // Importing icons from react-icons

// Styled Components
const SidebarContainer = styled.div`
  width: 16rem; /* w-64 */
  border-right: 1px solid #e2e8f0; /* border-r */
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding: 1rem; /* p-4 */
  border-bottom: 1px solid #e2e8f0; /* border-b */
`;

const Title = styled.h2`
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  line-height: 1.25; /* leading-tight */
`;

const SearchContainer = styled.div`
  padding: 1rem; /* p-4 */
  position: relative;
`;

const StyledInput = styled.input`
  padding-left: 2.25rem; /* pl-9 */
  background-color: #f7fafc; /* bg-gray-100 */
  border: 1px solid #edf2f7; /* border-gray-200 */
  border-radius: 9999px; /* rounded-full */
  width: 100%; /* Full width */
`;

const Nav = styled.nav`
  padding: 0 0.5rem; /* px-2 */
  flex: 1; /* flex-1 */
`;

const NavItem = styled.button`
  display: flex;
  align-items: center;
  width: 100%; /* w-full */
  justify-content: flex-start; /* justify-start */
  background-color: ${({ variant }) => (variant === 'ghost' ? '#f0fff4' : 'transparent')}; /* bg-green-100 */
  color: ${({ variant }) => (variant === 'ghost' ? 'black' : '#4a5568')}; /* text-black or text-gray-700 */
  padding: 0.5rem; /* Add padding */
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ variant }) => (variant === 'ghost' ? '#c6f6d5' : '#f7fafc')}; /* hover:bg-green-200 or hover:bg-gray-100 */
  }
`;

const Footer = styled.div`
  padding: 1rem; /* p-4 */
  border-top: 1px solid #e2e8f0; /* border-t */
  margin-top: auto; /* mt-auto */
`;

const UserContainer = styled.div`
  padding: 1rem; /* p-4 */
  border-top: 1px solid #e2e8f0; /* border-t */
  display: flex;
  align-items: center;
`;

const UserAvatar = styled.div`
  background-color: #48bb78; /* bg-green-500 */
  border-radius: 9999px; /* rounded-full */
  width: 1.5rem; /* w-6 */
  height: 1.5rem; /* h-6 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem; /* mr-2 */
`;

const UserName = styled.span`
  color: #48bb78; /* text-green-500 */
  font-weight: bold; /* font-bold */
`;

export const Sidebar = () => {
  return (
    <SidebarContainer>
      <Header>
        <Title>St. John College of Engineering and Management</Title>
      </Header>

      <SearchContainer>
        <StyledInput placeholder="Search" />
      </SearchContainer>

      <Nav>
        <div>
          <NavItem variant="ghost">
            <FaHome className="mr-2 h-4 w-4" />
            Home
          </NavItem>
          <NavItem variant="ghost">
            <FaClock className="mr-2 h-4 w-4" />
            Recent
          </NavItem>
        </div>
      </Nav>

      <Footer>
        <NavItem variant="ghost">
          <FaSignOutAlt className="mr-2 h-4 w-4" />
          Log out
        </NavItem>
 </Footer>

      <UserContainer >
        <UserAvatar>
          <span className="text-white text-xs">E</span>
        </UserAvatar>
        <UserName>Etheregg</UserName>
      </UserContainer>
    </SidebarContainer>
  );
};