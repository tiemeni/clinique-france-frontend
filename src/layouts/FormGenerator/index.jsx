import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import './style.css';
import ReactSelectContainer from 'react-select';
import { ColorPicker } from 'primereact/colorpicker';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { getAllMotifs } from '../../redux/motifs/actions';
import { getAllUser } from '../../redux/user/actions';
import { getAllSpecialities } from '../../redux/speciality/actions';
import { getAllPraticiens } from '../../redux/praticiens/actions';
import { formatDataForConsignePicKlist } from '../../utils/helpers';
import { getAllPatients } from '../../redux/patient/actions';
import { getAllConsignes } from '../../redux/consignes/actions';

// import { searchMotif } from '../../redux/motifs/actions';

function FormGenerator({
  type,
  data,
  editeData = {},
  cle,
  handlePost = null,
  // handleClearSearchForm = undefined,?
}) {

  const loadingPostLieu = useSelector(
    (state) => state.Lieux.postingLieuLoading,
  );
  const updatingLieuLoading = useSelector(
    (state) => state.Lieux.updatingLieuLoading,
  );
  const postingUser = useSelector((state) => state.User.postingUser);
  const postingPatient = useSelector((state) => state.Patient.postingPatient);
  const postingSpecs = useSelector(
    (state) => state.Specialities.loadingSpecialities,
  );
  const updatingSpecialities = useSelector(
    (state) => state.Specialities.updatingSpecialities,
  );
  const postingPraticien = useSelector(
    (state) => state.Praticiens.postingPraticien,
  );
  const searchPraticien = useSelector((state) => state.Praticiens.searchprat);
  const searchUser = useSelector((state) => state.User.searchUser);
  const searchMotif = useSelector((state) => state.Motifs.searchMotif);
  const searchConsigne = useSelector((state) => state.Consignes.searchCons);
  const searchPatient = useSelector((state) => state.Patient.searchpat);
  const searchSpecialite = useSelector(
    (state) => state.Specialities.searchspeciali,
  );

  const UpdatingPatient = useSelector((state) => state.Patient.UpdatingPatient);
  const UpdatingPraticien = useSelector(
    (state) => state.Praticiens.UpdatingPraticien,
  );
  const updatingUser = useSelector((state) => state.User.updatingUser);
  const postingMotif = useSelector((state) => state.Motifs.postingMotif);
  const updatingMotif = useSelector((state) => state.Motifs.updatingMotif);
  const creatingConsignes = useSelector(
    (state) => state.Consignes.creatingConsigne,
  );
  const updatingConsigne = useSelector(
    (state) => state.Consignes.updatingConsigne,
  );

  const errorPostingPatient = useSelector(
    (state) => state.Patient.errorPostingPatient,
  );
  const errorUpdatingPatient = useSelector(
    (state) => state.Patient.errorUpdatingPatient,
  );

  const errorPostingPraticien = useSelector(
    (state) => state.Praticiens.errorPostingPraticien,
  );
  const errorUpdatingPraticien = useSelector(
    (state) => state.Praticiens.errorUpdatingPraticien,
  );

  const errorPostingUser = useSelector((state) => state.User.errorPostingUser);
  const errorUpdatingUser = useSelector(
    (state) => state.User.errorUpdatingUser,
  );

  const loadingSpecsError = useSelector(
    (state) => state.Specialities.loadingSpecsError,
  );
  const updatingSpecsError = useSelector(
    (state) => state.Specialities.updatingSpecsError,
  );

  const errorPostingMotif = useSelector(
    (state) => state.Motifs.errorPostingMotif,
  );
  const errorupdatingMotif = useSelector(
    (state) => state.Motifs.errorupdatingMotif,
  );

  const creatingConsigneError = useSelector(
    (state) => state.Consignes.creatingConsigneError,
  );
  const updatingConsigneError = useSelector(
    (state) => state.Consignes.updatingConsigneError,
  );

  const [dataCp, setDataCp] = useState({});
  const civilities = useSelector((state) => state.Civilities.civilities);
  const groupes = useSelector((state) => state.Groupes.groups);
  const specialities = useSelector((state) => state.Specialities.specialities);
  const consignes = useSelector((state) => state.Consignes.consignes);
  const lieux = useSelector((state) => state.Lieux.lieux);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(() => {
    const state = {};
    data.dataFields.data.forEach((e) => {
      if (e.type === 'checkbox') {
        state[e.name] = editeData[e.name] ?? [];
      } else {
        state[e.name] = editeData[e.name] ?? '';
      }
    });
    return state;
  });
 
  const emptyPhoneNumberMsg = 'veuillez renseigner le numéro de téléphone'
  const [phoneError, setPhoneError] = useState({ isGenerated: false, value: '' });
  const [phoneisEmpty, setPhoneisEmpty] = useState({isEmpty:true, show: false, msg: emptyPhoneNumberMsg})
  const canShowPhoneNumberFieldError = phoneError.isGenerated === true ? phoneError.value !== '' : false;
  const canSubmitPhoneNumberField = () => {
    if (phoneError.isGenerated) {
 
      if (phoneisEmpty.isEmpty === true) {
        return false
      }
      if (phoneError.value !== '') {
      return false
    }
    }
    
    return true
  }

  console.log('phoneError: ', phoneError.value)
  console.log('can show: ', canShowPhoneNumberFieldError)
  console.log('can subnit ', canSubmitPhoneNumberField())

  useEffect(() => {
    if (Object.keys(editeData).length > 0) {
      setFormData(() => {
        const state = {};
        data.dataFields.data.forEach((e) => {
          if (e.type === 'checkbox') {
            state[e.name] = editeData[e.name] ?? [];
          } else {
            state[e.name] = editeData[e.name] ?? '';
          }
        });
        return state;
      });
    }
  }, [editeData]);

  useEffect(() => {
    const temp = data;
    setDataCp(temp);
  }, [specialities]);

  const formik = useFormik({
    initialValues:
      Object.keys(editeData).length > 0
        ? {
            ...editeData,
          }
        : { ...formData },
    onSubmit: (values) => {
      if (handlePost) {
        handlePost(values);
        // alert(JSON.stringify(values, null, 2));
        console.log('searchConsigne ==== > ', searchConsigne);
      } else {
        alert(JSON.stringify(values, null, 2));
      }
    },
  });

  const clearForm = (key) => {
    if (cle && type === 'MOTIF') {
      formik.resetForm();
      dispatch(getAllMotifs());
    } else if (cle && type === 'USER') {
      formik.resetForm();
      dispatch(getAllUser());
    } else if (cle && type === 'SPECIALITE') {
      formik.resetForm();
      dispatch(getAllSpecialities());
    } else if (cle && type === 'PRATICIEN') {
      formik.resetForm();
      dispatch(getAllPraticiens());
    } else if (cle && type === 'PATIENT') {
      formik.resetForm();
      dispatch(getAllPatients());
    } else if (cle && type === 'CONSIGNE') {
      formik.resetForm();
      dispatch(getAllConsignes());
    } else {
      data.dataFields.callBacks[key].action();
    }
    // handleClearSearchForm();
  };

  const generatePickListData = (name, e) => {
    let result;
    switch (name) {
      case 'civility':
        result = (
          <Select
            id={e.name}
            placeholder="Select option"
            onChange={formik.handleChange}
            value={formik.values[e.name]}
            // {...register(e.name, {
            //   required: e.required ? 'required field' : false,
            //   // required: 'This is required',
            // })}
          >
            {civilities.map((op) => (
              <option key={op._id} value={op._id}>
                {op.label}
              </option>
            ))}
          </Select>
        );
        break;
      case 'groups':
        result = (
          <Select
            id={e.name}
            // onChange={(event) => handleChange(event, e.name?.toString())}
            placeholder="Select option"
            onChange={formik.handleChange}
            value={formik.values[e.name]}
            // {...register(e.name, {
            //   required: e.required ? 'required field' : false,
            // })}
          >
            {groupes.map((op) => (
              <option key={op._id} value={op._id}>
                {op.title}
              </option>
            ))}
          </Select>
        );
        break;
      case 'job':
        result = (
          <Select
            id={e.name}
            // onChange={(event) => handleChange(event, e.name?.toString())}
            placeholder="Select option"
            onChange={formik.handleChange}
            value={formik.values[e.name]}
            // {...register(e.name, {
            //   required: e.required ? 'required field' : false,
            //   // required: 'This is required',
            // })}
          >
            {specialities.map((op) => (
              <option key={op._id} value={op._id}>
                {op.title || op.label}
              </option>
            ))}
          </Select>
        );
        break;
      case 'affectation':
        result = (
          <Select
            id={e.name}
            multiple={false}
            // onChange={(event) => handleChange(event, e.name?.toString())}
            placeholder="Select option"
            onChange={formik.handleChange}
            value={formik.values[e.name]}
            // {...register(e.name, {
            //   required: e.required ? 'required field' : false,
            //   // required: 'This is required',
            // })}
          >
            {lieux.map((op) => (
              <option key={op._id} value={op._id}>
                {op.title || op.label}
              </option>
            ))}
          </Select>
        );
        break;
      case 'idLieux':
        result = (
          <Select
            id={e.name}
            multiple={false}
            placeholder="Select option"
            onChange={formik.handleChange}
            value={formik.values[e.name]}
            // {...register(e.name, {
            //   required: e.required ? 'required field' : false,
            //   // required: 'This is required',
            // })}
          >
            {lieux.map((op) => (
              <option key={op._id} value={op._id}>
                {op.title || op.label}
              </option>
            ))}
          </Select>
        );
        break;
      case 'idSpeciality':
        result = (
          <Select
            id={e.name}
            multiple={false}
            placeholder="Select option"
            onChange={formik.handleChange}
            value={formik.values[e.name]}
            // {...register(e.name, {
            //   required: e.required ? 'required field' : false,
            //   // required: 'This is required',
            // })}
          >
            {specialities.map((op) => (
              <option key={op._id} value={op._id}>
                {op.title || op.label}
              </option>
            ))}
          </Select>
        );
        break;
      default:
        result = (
          <Select
            id={e.name}
            // onChange={(event) => handleChange(event, e.name?.toString())}
            placeholder="Select option"
            onChange={formik.handleChange}
            value={formik.values[e.name]}
            // {...register(e.name, {
            //   required: e.required ? 'required field' : false,
            // })}
          >
            {e.options.map((op) => (
              <option key={op._id} value={op._id}>
                {op.label}
              </option>
            ))}
          </Select>
        );
    }
    return result;
  };

  const flexDesign = {
    display: 'inline-block',
  };

  return (
    <VStack spacing={5}>
      <form
        onSubmit={formik.handleSubmit}
        style={{ width: '100%', display: 'grid' }}
      >
        {dataCp?.dataFields?.data.map((e) => {
          
          let result;
          switch (e.type) {
            case 'text':
              result = (
                <FormControl
                  // isInvalid={errors[e.name]}
                  marginBottom={5}
                  key={e.id}
                  isRequired={e.required}
                >
                  <Stack
                    style={{
                      ...flexDesign,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <FormLabel width="250px" textAlign="right" htmlFor={e.name}>
                      {e.placeholder}
                    </FormLabel>
                    <Input
                      id={e.name}
                      type="text"
                      placeholder={e.placeholder}
                      // value={formData[e.name]}
                      required={e.required}
                      onChange={formik.handleChange}
                      value={formik.values[e.name]}
                    />
                  </Stack>
                  {/* <FormErrorMessage marginLeft="210px">
                    {errors[e.name] && errors[e.name].message}
                  </FormErrorMessage> */}
                </FormControl>
              );
              break;
            case 'textarea':
              result = (
                <FormControl
                  // isInvalid={errors[e.name]}
                  marginBottom={5}
                  key={e.id}
                  isRequired={e.required}
                >
                  <Stack
                    style={{
                      ...flexDesign,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <FormLabel width="250px" textAlign="right" htmlFor={e.name}>
                      {e.placeholder}
                    </FormLabel>
                    <Textarea
                      id={e.name}
                      placeholder={e.placeholder}
                      // value={formData[e.name]}
                      required={e.required}
                      onChange={formik.handleChange}
                      value={formik.values[e.name]}
                    />
                  </Stack>
                  {/* <FormErrorMessage marginLeft="210px">
                    {errors[e.name] && errors[e.name].message}
                  </FormErrorMessage> */}
                </FormControl>
              );
              break;
            case 'multiselect':
              result = (
                <FormControl
                  // isInvalid={errors[e.name]}
                  marginBottom={5}
                  key={e.id}
                  isRequired={e.required}
                >
                  <Stack
                    style={{
                      ...flexDesign,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <FormLabel width="250px" textAlign="right" htmlFor={e.name}>
                      {e.placeholder}
                    </FormLabel>
                    <Stack width="100%">
                      <ReactSelectContainer
                        isMulti
                        closeMenuOnSelect
                        multiple
                        placeholder="consignes liees"
                        name={e.name}
                        id={e.name}
                        value={formik.values[e.name]}
                        onChange={(ev) => formik.setFieldValue(e.name, ev)}
                        options={formatDataForConsignePicKlist(consignes)}
                        className="basic-multi-select"
                        classNamePrefix="select"
                      />
                    </Stack>
                  </Stack>
                  {/* <FormErrorMessage marginLeft="210px">
                    {errors[e.name] && errors[e.name].message}
                  </FormErrorMessage> */}
                </FormControl>
              );
              break;
            case 'couleur':
              result = (
                <FormControl
                  // isInvalid={errors[e.name]}
                  marginBottom={5}
                  key={e.id}
                  isRequired={e.required}
                >
                  <Stack
                    style={{
                      ...flexDesign,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <FormLabel width="250px" textAlign="right" htmlFor={e.name}>
                      {e.placeholder}
                    </FormLabel>
                    <Stack width="100%">
                      <ColorPicker
                        style={{ width: '25px', overflowX: 'hidden' }}
                        defaultColor="#C5C5C5"
                        format="hex"
                        id={e.name}
                        name={e.name}
                        value={formik.values[e.name]}
                        onChange={formik.handleChange}
                      />
                    </Stack>
                  </Stack>
                  {/* <FormErrorMessage marginLeft="210px">
                    {errors[e.name] && errors[e.name].message}
                  </FormErrorMessage> */}
                </FormControl>
              );
              break;
            case 'password':
              result = (
                <FormControl
                  // isInvalid={errors[e.name]}
                  marginBottom={5}
                  key={e.id}
                  isRequired={e.required}
                >
                  <Stack
                    style={{
                      ...flexDesign,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <FormLabel width="250px" textAlign="right" htmlFor={e.name}>
                      {e.placeholder}
                    </FormLabel>
                    <Input
                      id={e.name}
                      type="password"
                      placeholder={e.placeholder}
                      // value={formData[e.name]}
                      required={e.required}
                      // {...register(e.name, {
                      //   required: e.required
                      //     ? 'ce champs est requi'
                      //     : false,
                      // })}
                      // onChange={(event) =>
                      //   handleChange(event, e.name?.toString())
                      // }
                      onChange={formik.handleChange}
                      value={formik.values[e.name]}
                    />
                  </Stack>
                  {/* <FormErrorMessage marginLeft="210px">
                    {errors[e.name] && errors[e.name].message}
                  </FormErrorMessage> */}
                </FormControl>
              );
              break;
            case 'date':
              result = (
                <FormControl
                  marginBottom={5}
                  key={e.id}
                  isRequired={e.required}
                  // isInvalid={errors[e.name]}
                >
                  <Stack
                    style={{
                      ...flexDesign,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <FormLabel width="250px" textAlign="right" htmlFor={e.name}>
                      {e.placeholder}
                    </FormLabel>
                    <Input
                      id={e.name}
                      type="date"
                      placeholder={e.placeholder}
                      // value={formData[e.name]}
                      required={e.required}
                      // {...register(e.name, {
                      //   required: e.required
                      //     ? 'ce champs est requi'
                      //     : false,
                      //   minLength: {
                      //     value: 4,
                      //     message: 'Minimum length should be 4',
                      //   },
                      // })}
                      // onChange={(event) =>
                      //   handleChange(event, e.name?.toString())
                      // }
                      onChange={formik.handleChange}
                      value={formik.values[e.name]}
                    />
                  </Stack>
                  {/* <FormErrorMessage marginLeft="200px">
                    {errors[e.name] && errors[e.name].message}
                  </FormErrorMessage> */}
                </FormControl>
              );
              break;
            case 'email':
              result = (
                <FormControl
                  marginBottom={5}
                  key={e.id}
                  isRequired={e.required}
                  // isInvalid={errors[e.name]}
                >
                  <Stack
                    style={{
                      ...flexDesign,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <FormLabel width="250px" textAlign="right" htmlFor={e.name}>
                      {e.placeholder}
                    </FormLabel>
                    <Input
                      id={e.name}
                      type="email"
                      placeholder={e.placeholder}
                      // value={formData[e.name]}
                      required={e.required}
                      // {...register(e.name, {
                      //   required: e.required
                      //     ? 'ce champs est requi'
                      //     : false,
                      //   minLength: {
                      //     value: 4,
                      //     message: 'Minimum length should be 4',
                      //   },
                      // })}
                      // onChange={(event) =>
                      //   handleChange(event, e.name?.toString())
                      // }
                      onChange={formik.handleChange}
                      value={formik.values[e.name]}
                    />
                  </Stack>
                  {/* <FormErrorMessage marginLeft="200px">
                    {errors[e.name] && errors[e.name].message}
                  </FormErrorMessage> */}
                </FormControl>
              );
              break;
            case 'number':
              result = (
                <FormControl
                  marginBottom={5}
                  key={e.id}
                  isRequired={e.required}
                >
                  <Stack
                    style={{
                      ...flexDesign,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <FormLabel width="250px" textAlign="right">
                      {e.placeholder}
                    </FormLabel>
                    {e.name === 'telephone' ?
                      
                      (<PhoneInput
                        countryCodeEditable={false}
                        onMount={() => {
                         console.log('phone nmber field gen: ', phoneError.isGenerated)
                            setPhoneError({
                              ...phoneError,
                              isGenerated: true,
                              value:'',
                            })
                          setPhoneisEmpty({isEmpty:true, show: false, msg: emptyPhoneNumberMsg})
                          
                        }}
                        onChange={(...args) => {
                          setPhoneisEmpty({isEmpty:false, show: false, msg: emptyPhoneNumberMsg})

                          if (args[2]?.target?.value?.length < 16) {
                            setPhoneError({isGenerated:true, value:'Le numéro de téléphone est trop court'}) 
                          } else {
                            setPhoneError({isGenerated:true, value:''})
                          }

                          formik.handleChange(args[2])
                        }}
                        country='cm'
                        disableDropdown
                        inputStyle={{ width: '100%', fontFamily:'Poppins', fontSize:'15px' }}
                        placeholder='numéro de téléphone'
                        inputProps={{
                          name: e?.name,
                          maxlength: 16,
                          minlength: 16,
                          required:true,
                        }}
                      />) : 
                      <Input
                      id={e?.name}
                      type="number"
                      placeholder={e.placeholder}
                      // value={formData[e.name]}
                      required={e.required}
                      // {...register(e.name, {
                      //   required: e.required
                      //     ? 'ce champs est requi'
                      //     : false,
                      //   minLength: {
                      //     value: 4,
                      //     message: 'Minimum length should be 4',
                      //   },
                      // })}
                      // onChange={(event) =>
                      //   handleChange(event, e.name?.toString())
                      // }
                      onChange={formik.handleChange}
                      value={formik.values[e.name]}
                    />
                  
                  }
                    
                  </Stack>
                  {/* <FormErrorMessage marginLeft="200px">
                    {errors[e.name] && errors[e.name].message}
                  </FormErrorMessage> */}
                </FormControl>
              );
              break;
            case 'picklist':
              result = (
                <FormControl
                  marginBottom={5}
                  key={e.id}
                  // isInvalid={errors[e.name]}
                  isRequired={e.required}
                >
                  <Stack
                    style={{
                      ...flexDesign,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <FormLabel width="250px" textAlign="right">
                      {e.placeholder}
                    </FormLabel>
                    {generatePickListData(e.name, e)}
                  </Stack>
                  {/* <FormErrorMessage marginLeft="200px">
                    {errors[e.name] && errors[e.name].message}
                  </FormErrorMessage> */}
                </FormControl>
              );
              break;
            case 'radio':
              result = (
                <FormControl
                  marginBottom={5}
                  key={e.id}
                  isRequired={e.required}
                >
                  <Stack
                    style={{
                      ...flexDesign,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <FormLabel width="250px" textAlign="right">
                      {e.placeholder}
                    </FormLabel>
                    <RadioGroup
                      w="100%"
                      // onChange={(v) => {
                      //   handleChange(
                      //     { target: { value: v } },
                      //     e.name.toString(),
                      //   );
                      // }}
                      // value={formData[e.name]}
                      // onChange={formik.handleChange}
                      // value={formik.values[e.name]}
                    >
                      <Stack direction="row">
                        {e.options.map((op) => (
                          <Radio key={op.id} value={op.value.toString()}>
                            {op.name}
                          </Radio>
                        ))}
                      </Stack>
                    </RadioGroup>
                  </Stack>
                  {/* <FormErrorMessage marginLeft="200px">
                    {errors[e.name] && errors[e.name].message}
                  </FormErrorMessage> */}
                </FormControl>
              );
              break;
            case 'checkbox':
              result = (
                <FormControl
                  alignItems="center"
                  display="flex"
                  flexDirection="row"
                  marginBottom={5}
                  key={e.id}
                  isRequired={e.required}
                >
                  <Stack
                    style={{
                      ...flexDesign,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                  >
                    <FormLabel width="250px" textAlign="right">
                      {e.placeholder}
                    </FormLabel>
                    <Stack w="100%" spacing={5} direction="row">
                      {e.options.map((op) => (
                        <Checkbox
                          onChange={() => {
                            if (
                              parseInt(
                                formData[e.name].indexOf(op.name),
                                10,
                              ) !== -1
                            ) {
                              formData[e.name].splice(
                                formData[e.name].indexOf(op.name),
                                1,
                              );
                            } else {
                              setFormData((v) => ({
                                ...v,
                                [e.name]: [...formData[e.name], op.name],
                              }));
                            }
                          }}
                          key={op.id}
                        >
                          {op.name}
                        </Checkbox>
                      ))}
                    </Stack>
                  </Stack>
                  {/* <FormErrorMessage marginLeft="200px">
                    {errors[e.name] && errors[e.name].message}
                  </FormErrorMessage> */}
                </FormControl>
              );
              break;
            default:
              break;
          }
          return result;
        })}
        <p style={{ color: 'red', marginLeft: '200px', marginBottom: '10px' }}>
          {(canShowPhoneNumberFieldError ||
            phoneisEmpty.show ||
            errorPostingPatient ||
            errorPostingPraticien ||
            errorUpdatingPatient ||
            errorUpdatingPraticien ||
            errorPostingUser ||
            errorUpdatingUser ||
            loadingSpecsError ||
            updatingSpecsError ||
            errorPostingMotif ||
            errorupdatingMotif ||
            creatingConsigneError ||
            updatingConsigneError) && (
            <Alert status="error" mt={2}>
              <AlertIcon />
              {
                phoneError.value ||
                phoneisEmpty.msg ||
                errorPostingPatient ||
                errorPostingPraticien ||
                errorUpdatingPatient ||
                errorUpdatingPraticien ||
                errorPostingUser ||
                errorUpdatingUser ||
                loadingSpecsError ||
                updatingSpecsError ||
                errorPostingMotif ||
                errorupdatingMotif ||
                updatingSpecsError ||
                errorPostingMotif ||
                errorupdatingMotif ||
                creatingConsigneError ||
                updatingConsigneError}
            </Alert>
          )}
        </p>
        <Box w="100%" paddingLeft="200px" marginBottom="10px">
          {Object.keys(data.dataFields.callBacks)?.map((key, i) => (
            <Button
              type={i === 0 && canSubmitPhoneNumberField()=== true ? 'submit' : 'button'}
              isLoading={
                i === 0 &&
                (loadingPostLieu ||
                  postingSpecs ||
                  postingMotif ||
                  postingPatient ||
                  postingUser ||
                  postingPraticien ||
                  creatingConsignes ||
                  updatingConsigne ||
                  searchPraticien ||
                  updatingUser ||
                  UpdatingPatient ||
                  searchUser ||
                  searchMotif ||
                  searchPatient ||
                  searchSpecialite ||
                  UpdatingPraticien ||
                  updatingLieuLoading ||
                  updatingMotif ||
                  updatingSpecialities ||
                  searchConsigne)
              }
              onClick={
                ()=> {
                  
                  if (i === 0 && canSubmitPhoneNumberField() === true) {
                    data.dataFields.callBacks[key].action(() =>
                      console.log('worked'),
                    )
                  }
                    if (i === 0 && canSubmitPhoneNumberField() === false) {
                      setPhoneisEmpty({...phoneisEmpty, show:true})
                    }
                    if (i === 1 && cle) {
                      clearForm(key) 
                  }
                  
                    data.dataFields.callBacks[key].action(() =>
                      console.log('worked'),
                    )
                  }
                }
              
              key={key}
              marginLeft={i !== 0 ? 5 : 0}
              backgroundColor={data.dataFields.callBacks[key].color ?? null}
              textColor="white"
            >
              {data.dataFields.callBacks[key].label}
            </Button>
          ))}
        </Box>
      </form>
    </VStack>
  );
}

export default FormGenerator;
