import React, { useEffect, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import logi from '../../assets/images/icone 512-100.jpg';
import { useDimensions } from '../../hooks/useDimensions';
import styles from './style';
import user from '../../assets/images/user.png';
import visible from '../../assets/images/visible.png';
import hide from '../../assets/images/hide.png';
// import { retreiveIdc } from '../../utils/helpers';
import { RESET_ALL_FIELD } from '../../redux/user/types';
import { processLogin } from '../../redux/user/actions';

function LoginPage() {
  const dispatch = useDispatch();
  const [error, setError] = useState();
  const loginLoading = useSelector((state) => state.User.loginLoading);
  const isVerifyingToken = useSelector((state) => state.Common.isVerifyingToken);
  const successLogin = useSelector((state) => state.User.loginSuccess);
  const loginErrorMessage = useSelector(
    (state) => state.User.loginErrorMessage,
  );
 
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const { innerWidth } = useDimensions();
  const [showPw, setShoPw] = useState(false);
  const handleLogin = () => {
    setError('');
    dispatch({ type: RESET_ALL_FIELD });
    dispatch(
      processLogin({
        email: formData.username,
        password: formData.password,
      }),
    );
  };

  const handleChange = (event, payload) => {
    setFormData({
      ...formData,
      [event]: payload.target.value,
    });
  };

  useEffect(() => {
    if (successLogin) {
      try {
        window.location = '/content';
      } catch (e) {
        /**
         *
         */
      }
    } else if (loginErrorMessage) {
      setError(loginErrorMessage);
    }
    
  }, [successLogin, loginErrorMessage]);
  if(isVerifyingToken){
    return "checking token...."
  }

  return (
    <Grid templateColumns="repeat(8, 1fr)" gap={4}>
      <GridItem
        colStart={innerWidth > 900 ? 3 : 1}
        colEnd={innerWidth > 900 ? 7 : 9}
        rowStart={1}
        style={styles.formContainer}
      >
        <VStack spacing={10} width={innerWidth > 500 ? '70%' : '90%'}>
          <Box>
            <img src={logi} height="180px" width="180px" alt="" />
          </Box>
          <Box>
            <p>Connectez-vous a votre compte</p>
          </Box>
          {error && (
            <Alert status="error" mt={2}>
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Box width="100%">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <img
                  src={user}
                  alt=""
                  width="25px"
                  height="25px"
                  style={{ ...styles.inputIconLeft }}
                />
              </InputLeftElement>
              <Input
                value={formData.username}
                onChange={(e) => handleChange('username', e)}
                w="full"
                placeholder="username"
                size="lg"
                mb={3}
              />
            </InputGroup>
            <InputGroup>
              <InputRightElement onClick={() => setShoPw((v) => !v)}>
                <img
                  src={showPw ? visible : hide}
                  alt=""
                  width="25px"
                  height="25px"
                  style={{ ...styles.inputIconRight, cursor: 'pointer' }}
                />
              </InputRightElement>
              <Input
                value={formData.password}
                onChange={(e) => handleChange('password', e)}
                w="full"
                placeholder="**********"
                size="lg"
                type={showPw ? 'text' : 'password'}
              />
            </InputGroup>
          </Box>
          <Box width="100%">
            <Button
              isLoading={loginLoading}
              onClick={handleLogin}
              w="full"
              colorScheme="blue"
            >
              Connexion
            </Button>
          </Box>
        </VStack>
      </GridItem>
    </Grid>
  );
}

export default LoginPage;
