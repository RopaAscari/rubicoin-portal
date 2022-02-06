import { Location } from 'history';
import { useEffect, useRef, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

const usePrevLocation = () => {
    const location = useLocation();
    const prevLocRef = useRef(location)
    
    useEffect(()=>{
    
    prevLocRef.current = location
    
    },[location])
    
    return prevLocRef.current
    
    }

export default usePrevLocation;