import { SearchIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { BiSolidMessageRounded } from 'react-icons/bi';
import { FaUser } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdMail, MdOutlinePersonalVideo } from 'react-icons/md';
import { RiAlertFill } from 'react-icons/ri';
import styles from './styles';

function NavigationBar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function getDateAndTime() {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    let dayOfWeek;
    switch (now.getDay()) {
      case 0:
        dayOfWeek = 'Dimanche';
        break;
      case 1:
        dayOfWeek = 'Lundi';
        break;
      case 2:
        dayOfWeek = 'Mardi';
        break;
      case 3:
        dayOfWeek = 'Mercredi';
        break;
      case 4:
        dayOfWeek = 'Jeudi';
        break;
      case 5:
        dayOfWeek = 'Vendredi';
        break;
      case 6:
        dayOfWeek = 'Samedi';
        break;
      default:
        dayOfWeek = '';
        break;
    }

    let monthName;
    switch (Number(month)) {
      case 1:
        monthName = 'Janvier';
        break;
      case 2:
        monthName = 'Février';
        break;
      case 3:
        monthName = 'Mars';
        break;
      case 4:
        monthName = 'Avril';
        break;
      case 5:
        monthName = 'Mai';
        break;
      case 6:
        monthName = 'Juin';
        break;
      case 7:
        monthName = 'Juillet';
        break;
      case 8:
        monthName = 'Août';
        break;
      case 9:
        monthName = 'Septembre';
        break;
      case 10:
        monthName = 'Octobre';
        break;
      case 11:
        monthName = 'Novembre';
        break;
      case 12:
        monthName = 'Décembre';
        break;
      default:
        monthName = '';
        break;
    }

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const dateTime = `${dayOfWeek} ${day} ${monthName} ${year} ${hours}:${minutes}:${seconds}`;
    return dateTime;
  }

  return (
    <Flex
      bg="#3A3C44"
      paddingY={5}
      paddingX={5}
      height="16"
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems="center"
    >
      <VStack justifyItems="center">
        <Text fontSize={windowWidth < 958 ? 16 : 20} style={styles.textLogo}>
          CLINIQUE FRANCE
        </Text>
        <Text style={styles.dateText}>{getDateAndTime()}</Text>
      </VStack>
      {windowWidth > 758 ? (
        <InputGroup
          size="sm"
          mt={{ base: 0, md: 0 }}
          width={{ base: '100%', md: 250 }}
          ml={{ base: 0, md: 14 }}
        >
          <Input
            backgroundColor="whiteAlpha.800"
            rounded={50}
            placeholder="Rechercher un patient"
            _placeholder={{ color: 'blue.300' }}
          />
          <InputRightElement backgroundColor="blue.300" rounded={50}>
            <SearchIcon color="white" />
          </InputRightElement>
        </InputGroup>
      ) : null}
      <HStack color="whiteAlpha.800" spacing={6} ml={{ base: 0, md: 14 }}>
        <FaUser
          display={{ base: 'none', md: 'block' }}
          className="let"
          size={20}
        />
        <MdMail size={24} />
        <Menu>
          <MenuButton>
            <AiFillSetting size={24} />
          </MenuButton>
          <MenuList zIndex={9999} color="blue.400">
            <Link to="/content/structure">
              <MenuItem>Structure</MenuItem>
            </Link>
            <Link to="/content/patient">
              <MenuItem>Comptes patient</MenuItem>
            </Link>
            <Link to="/content/user">
              <MenuItem>Utilisateurs</MenuItem>
            </Link>
            <Link to="/content/praticien">
              <MenuItem>Fiches praticien</MenuItem>
            </Link>
            <Link to="/content/speciality">
              <MenuItem>Spécialités</MenuItem>
            </Link>
            <Link to="/content/motif">
              <MenuItem>Motifs de rendez-vous</MenuItem>
            </Link>
            <Link to="/content/lieu">
              <MenuItem>Lieux</MenuItem>
            </Link>
            <Link to="/content">
              <MenuItem>Parametres avancés</MenuItem>
            </Link>
          </MenuList>
        </Menu>
        <MdOutlinePersonalVideo size={24} />
      </HStack>
      <Spacer />
      <HStack spacing={6} color="whiteAlpha.800" mr={4}>
        {windowWidth > 958 ? (
          <>
            <Box style={styles.boxLeftIcon}>
              <BiSolidMessageRounded size={20} />
            </Box>
            <Box style={styles.boxLeftIcon}>
              <MdMail size={20} />
            </Box>
            <Box style={styles.boxLeftIcon}>
              <RiAlertFill size={20} />
            </Box>
            <Box
              backgroundColor="black"
              borderWidth={0}
              style={styles.boxLeftIcon}
            >
              <FaUser size={20} />
            </Box>
          </>
        ) : null}

        {windowWidth > 796 ? (
          <Menu isLazy>
            <MenuButton>
              <HStack>
                <Text>Clinique France Admin</Text>
                <IoMdArrowDropdown color="white" />
              </HStack>
            </MenuButton>
            <MenuList color="blue.400">
              <MenuItem>Download</MenuItem>
              <MenuItem>Create a Copy</MenuItem>
              <MenuItem>Mark as Draft</MenuItem>
            </MenuList>
          </Menu>
        ) : null}
        {windowWidth > 1092 ? <HiUserGroup size={26} /> : null}
      </HStack>
    </Flex>
  );
}

function Header() {
  return (
    <div>
      <NavigationBar />
    </div>
  );
}

export default Header;
