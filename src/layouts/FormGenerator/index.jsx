import React, { useEffect, useState } from 'react';
import {
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
  VStack,
} from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';

function FormGenerator({
  data,
  editeData = {},
  handlePost = null,
  // handleClearSearchForm = undefined,
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
  const UpdatingPatient = useSelector((state) => state.Patient.UpdatingPatient);
  const UpdatingPraticien = useSelector(
    (state) => state.Praticiens.UpdatingPraticien,
  );
  const updatingUser = useSelector((state) => state.User.updatingUser);
  const postingMotif = useSelector((state) => state.Motifs.postingMotif);
  const updatingMotif = useSelector((state) => state.Motifs.updatingMotif);
  const [dataCp, setDataCp] = useState({});
  const civilities = useSelector((state) => state.Civilities.civilities);
  const groupes = useSelector((state) => state.Groupes.groups);
  const specialities = useSelector((state) => state.Specialities.specialities);
  const lieux = useSelector((state) => state.Lieux.lieux);
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
      } else {
        alert(JSON.stringify(values, null, 2));
      }
    },
  });

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
        <Box w="100%" paddingLeft="200px">
          {Object.keys(data.dataFields.callBacks)?.map((key, i) => (
            <Button
              type={i === 0 ? 'submit' : null}
              isLoading={
                i === 0 &&
                (loadingPostLieu ||
                  postingSpecs ||
                  postingMotif ||
                  postingPatient ||
                  postingUser ||
                  postingPraticien ||
                  updatingUser ||
                  UpdatingPatient ||
                  UpdatingPraticien ||
                  updatingLieuLoading ||
                  updatingMotif ||
                  updatingSpecialities)
              }
              onClick={() =>
                i === 1
                  ? data.dataFields.callBacks[key].action()
                  : data.dataFields.callBacks[key].action(() =>
                      console.log('worked'),
                    )
              }
              key={key}
              marginLeft={i !== 0 ? 5 : 0}
              backgroundColor={data.dataFields.callBacks[key].color ?? null}
              // onClick={() => {
              //   data.dataFields.callBacks[key].action(formData);
              // }}
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
