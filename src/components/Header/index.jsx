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
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { AiFillSetting } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { HiUserGroup } from 'react-icons/hi';
import { IoMdArrowDropdown } from 'react-icons/io';
import { MdMail } from 'react-icons/md';
import styles from './styles';
import { disconnectUser } from '../../redux/common/actions';

function NavigationBar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const dispatch = useDispatch();
  const [username] = useState(localStorage.getItem('username'));
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // Mettre à jour l'heure toutes les secondes
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Nettoyer le timer lorsque le composant est démonté
    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date) => {
    const options = {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleTimeString("fr-FR", options);
  };

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

  

    const dateTime = `${dayOfWeek} ${day} ${monthName} ${year} `;
    return dateTime;
  }

  return (
    <Flex
      bg="#2c3e50"
      paddingY={5}
      paddingX={5}
      height="16"
      flexDirection={{ base: 'column', md: 'row' }}
      alignItems="center"
    >
      <VStack justifyItems="center" style={{ position: 'fixed', marginTop: -18, marginLeft: 30 }}>
        <Link to="/content" style={{ borderColor: 'red' }}>
            <Text
              fontSize={windowWidth < 958 ? 16 : 20}
              style={{ ...styles.textLogo, borderColor: 'red' }}
            >
              Clinique de France
            </Text>
          </Link>
      </VStack>
      <VStack justifyItems="center" style={{ position: 'fixed', marginTop: 29 }}>
       
        <div style={{ postion: 'fixed', marginLeft: 12 }}><Text style={styles.dateText}>{getDateAndTime()} | {  formatTime(time)}</Text></div>
        
      </VStack>
      <div>
      {windowWidth > 758 ? (
        <InputGroup
          size="sm"
          mt={{ base: 0, md: 0 }}
          width={{ base: '100%', md: 250 }}
          ml={{ base: 0, md: 14 }}
          style={{marginLeft: '22em'}}
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
      </div>
      <Spacer />
      <HStack spacing={6} color="whiteAlpha.800" mr={4}>
        {windowWidth > 958 ? (
          <>
            <Box style={styles.boxLeftIcon}>
              <MdMail size={20} />
            </Box>
            <Box style={styles.boxLeftIcon}>
              <Menu>
                <MenuButton>
                  <AiFillSetting size={24} />
                </MenuButton>
                <MenuList zIndex={9999} color="blue.400">
                  <Link to="/content/patient">
                    <MenuItem>Comptes patients</MenuItem>
                  </Link>
                  <Link to="/content/user">
                    <MenuItem>Utilisateurs</MenuItem>
                  </Link>
                  <Link to="/content/praticien">
                    <MenuItem>Fiches praticiens</MenuItem>
                  </Link>
                  <Link to="/content/speciality">
                    <MenuItem>Spécialités</MenuItem>
                  </Link>
                  <Link to="/content/motif">
                    <MenuItem>Motifs de rendez-vous</MenuItem>
                  </Link>
                  <Link to="/content/consigne">
                    <MenuItem>consignes</MenuItem>
                  </Link>
                  <Link to="/content">
                    <MenuItem>Parametres avancés</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
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
                <Text>{username}</Text>
                <IoMdArrowDropdown color="white" />
              </HStack>
            </MenuButton>
            <MenuList zIndex={9999} color="blue.400">
              <MenuItem onClick={() => dispatch(disconnectUser())} color="red">
                Deconnexion
              </MenuItem>
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
