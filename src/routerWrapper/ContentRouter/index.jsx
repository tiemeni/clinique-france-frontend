import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector} from 'react-redux';
import MainPage from '../../pages/MainPage';
import { useSocket } from '../../providers/socket';
import Header from '../../components/Header';
import PraticienRouter from './PraticienRouter';
import UserRouter from './UserRouter';
import PatientRouter from './PatientRouter';
import SpecialityRouter from './SpecialityRouter';
import MotifsRouter from './MotifsRouter';
import LieuxRouter from './LieuxRouter';
import StructureRouter from './StructureRouter';
import { getAllLieux } from '../../redux/lieux/actions';
import { getAllMotifs } from '../../redux/motifs/actions';
import { closePraticienPanel, getStructureInfo, verifyToken } from '../../redux/common/actions';
import { useDimensions } from '../../hooks/useDimensions';
import ConsigneRouter from './ConsigneRouter';
 import VerifyTokenPage from "../../pages/VerifyTokenPage"
// import LoginPage from '../../pages/LoginPage'

function ContentRouter() {
  const dispatch = useDispatch();
  const socket = useSocket();
  const { innerWidth } = useDimensions();

  // const isTokenValid = useSelector((state) => state.User.isTokenValid);
  const isVerifyingToken = useSelector((state) => state.Common.isVerifyingToken);
  const isTokenValid = useSelector((state) => state.Common.tokenValid);
 
 // const [tokenChecking, setTokenChecking] = useState(false);
  // const [tokenValid, setTokenValid]=useState(false)


  useEffect(() => {
    dispatch(verifyToken())
    dispatch(getAllLieux());
    dispatch(getAllMotifs());
    dispatch(getStructureInfo());
    
    socket.connect();
  }, []);

  // useEffect(()=> {
  //   if (isVerifyingToken) {
  //     setTokenChecking(true);
  //   } else {
  //     setTokenChecking(false)
  //   }
  // },[isVerifyingToken])

  useEffect(() =>{
    if(innerWidth < 1200){
      dispatch(closePraticienPanel(false))
    }
  })

  useEffect(() => {
    socket.on('connected', () => {
      const idc = localStorage.getItem('idc');
      socket.emit('setUserId', idc);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);


 
  
  return (
        isTokenValid ? <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/praticien/*" element={<PraticienRouter />} />
        <Route path="/consigne/*" element={<ConsigneRouter />} />
        <Route path="/user/*" element={<UserRouter />} />
        <Route path="/patient/*" element={<PatientRouter />} />
        <Route path="/speciality/*" element={<SpecialityRouter />} />
        <Route path="/motif/*" element={<MotifsRouter />} />
        <Route path="/lieu/*" element={<LieuxRouter />} />
        <Route path="/structure/*" element={<StructureRouter />} />
      </Routes>
    </> :
   isVerifyingToken && !isTokenValid && <VerifyTokenPage/>
  );



}

export default ContentRouter;
