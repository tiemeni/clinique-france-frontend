import React, { useState } from 'react';
import { useSelector } from "react-redux";
import {
  Alert,
  AlertIcon,
  /* Avatar , */
  Box,
  Button,
  FormControl,

  FormHelperText,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,

  InputRightElement,
  VStack,
} from '@chakra-ui/react';

import { useDimensions } from '../../hooks/useDimensions';
import styles from './style';
import user from '../../assets/images/user.png';
import visible from '../../assets/images/visible.png';
import hide from '../../assets/images/hide.png';



/**
 * 
 * @param {Object} Props
 * @param {String} Props.entityType  le type d'entité à modifier 'user'|| 'pratician' ...)
 * @param {Object} Props.entity l'entité à modifier (utilisateur || praticien ...)
 
 * @param {Function} Props.handler la fonction qui recevra le nouveau mot de passe 
 * @param {Function} Props.verificator la fonction qui vérifie si le mot de passe actuel est correcte
 * @param {Function} Props.onCancel la fonction qui sera exécuter lorsque l'utilisateur annule
 * @param {Boolean} Props.changeError un booléen pour préciser si une erreur universel s'est produite
 * @param {errorMessage} Props.errorMessage un message d'erreur?
 * @returns 
 */
function ChangePasswordComponent({ entityType = "user", entity, handler, verificator = () => true, onCancel, changeError = false, errorMessage = '' }) {
  const [error, setError] = useState({ onConfirmPass: false, onOther: changeError });
  const [formData, setFormData] = useState({
    oldPass: '',
    password: '',
    passwordConfirm: '',
  });
  const { innerWidth } = useDimensions();
  const [showPw, setShoPw] = useState({ none: true, old: false, new: false, confirmNew: false });
  const updatingUser = useSelector((state) => state.User.updatingUser)
  const errorUpdatingUser = useSelector((state) => state.User.errorUpdatingUser)
  const UpdatingPraticien = useSelector((state) => state.Praticiens.UpdatingPraticien)
  const errorUpdatingPraticien = useSelector((state) => state.Praticiens.errorUpdatingPraticien)
  const updateUserCompleted = useSelector((state) => state.User.updateUserCompleted);
  const updatePraticienCompleted = useSelector((state) => state.Praticiens.updatePraticienCompleted);
 // let entityText = ""
  const processLoading = updatingUser || UpdatingPraticien
  const processCompleted = updateUserCompleted || updatePraticienCompleted
  const processError = errorUpdatingUser || errorUpdatingPraticien
  const processSuccess = processCompleted && !processLoading && processError == null
  const successMsg = 'Mot de passe modifié avec success'

  console.log("password Change", entityType)
  console.log("entity", entity.name || entity.surname)
  // if (entityType === 'user') {
  //   entityText = "Utilisateur"
  // }
  // if (entityType === 'pratician') {
  //   entityText = "Praticien"
  // }

  const verifyPass = () => {
    if (formData.passwordConfirm === formData.password) {

      setError({ ...error, onConfirmPass: false })
      return true
    }
    setError({ ...error, onConfirmPass: true })
    return false

  }

  const handleChangePass = () => {

    if (verifyPass() && verificator()) {
      handler(formData.password)

    }

  }

  const handleChange = (event, payload) => {
    setFormData({
      ...formData,
      [event]: payload.target.value,
    });
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault()
      handleChangePass()
    }} >
      <Grid templateColumns="repeat(8, 1fr)" gap={4}>
        <GridItem
          colStart={innerWidth > 900 ? 3 : 1}
          colEnd={innerWidth > 900 ? 7 : 9}
          rowStart={1}
          style={styles.formContainer}
        >
          <VStack spacing={5} width={innerWidth > 500 ? '70%' : '90%'}>
            <Box position='relative'>
              <img
                src={user}
                alt=""
                width="96px"
                height="96px"

              />
              {/* <Avatar src={user}
                  alt={entity?.surname }
                  width="96px"
                  height="96px"/> */}
            </Box>

            <Box>
              {/* <p style={{ fontSize: '25px', textAlign: 'center', fontWeight: 'bold' }}> <span style={{ fontSize: '15px', fontWeight: "normal", color: 'rgba(0,0,0,0.8)' }}>{`${entityText} - `}</span>
                {
                  `${entity?.civility?.abreviation || 'M.'} ${entity?.surname || ''} ${entity?.name || ''}  `}</p> */}
              {/* <p style={{ fontSize: '15px', textAlign:'center'}}>
              Modification du mot de passe </p> */}

            </Box>
            {processCompleted && processError && (
              <Alert status="error" mt={2}>
                <AlertIcon />
                {errorMessage || processError}
              </Alert>
            )}
            {processCompleted && processSuccess && (
              <Alert status='success' mt={2}>
                <AlertIcon />
                {successMsg}
              </Alert>
            )}
            <Box width="100%" display='flex' flexDirection="column" gap={1}>





              <FormControl>
                <FormLabel>Nouveau mot de passe</FormLabel>
                <InputGroup>
                  <InputRightElement onClick={() => setShoPw({ ...showPw, new: !showPw.new })}>
                    <img
                      src={showPw.new ? visible : hide}
                      alt=""
                      width="25px"
                      height="25px"
                      style={{ ...styles.inputIconRight, cursor: 'pointer' }}
                    />
                  </InputRightElement>
                  <Input
                    required
                    value={formData.password}
                    onChange={(e) => handleChange('password', e)}
                    w="full"
                    placeholder={showPw.new ? '------' : '******'}
                    size="lg"
                    type={showPw.new ? 'text' : 'password'}
                  />
                </InputGroup>

              </FormControl>


              <FormControl >
                <FormLabel>Confirmer le Nouveau mot de passe</FormLabel>
                <InputGroup>
                  <InputRightElement onClick={() => setShoPw({ ...showPw, confirmNew: !showPw.confirmNew })}>
                    <img
                      src={showPw.confirmNew ? visible : hide}
                      alt=""
                      width="25px"
                      height="25px"
                      style={{ ...styles.inputIconRight, cursor: 'pointer' }}
                    />
                  </InputRightElement>
                  <Input
                    required
                    value={formData.passwordConfirm}
                    onChange={(e) => {
                      handleChange('passwordConfirm', e)

                    }}
                    w="full"
                    placeholder={showPw.confirmNew ? '------' : '******'}
                    size="lg"
                    type={showPw.confirmNew ? 'text' : 'password'}
                  />
                </InputGroup>
                {error.onConfirmPass === true && <FormHelperText color='red'>les mots de passe ne correspondent pas, le mot de passe et la confirmation doivent correspondre</FormHelperText>}

              </FormControl>


            </Box>
            <Box width="100%" display='flex' flexDirection='row-reverse' gap={2}>
              {!processSuccess && <Button

                isLoading={processLoading}
                w="full"
                colorScheme="blue"
                type='submit'
              >
                Terminer
              </Button>}
              <Button
                onClick={onCancel}
                w="full"
                colorScheme="red"
              >
                Retour
              </Button>
            </Box>

          </VStack>
        </GridItem>
      </Grid>
    </form>

  );
}

export default ChangePasswordComponent;
