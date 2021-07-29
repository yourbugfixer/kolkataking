import { useState, useEffect, createContext, useContext } from "react";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { api } from "../Components/Utility";
import { GetCurrentDate, ordinal } from "../Components/Utility";

const GetData = createContext();

export const useData = () => useContext(GetData);

function GetdataProvider(props) {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [schedule, setSchedule] = useState([]);
  const [result, setResult] = useState([]);
  const [tips, setTips] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const scheduleGlobal = await api.get("/schedule");
      const resultGlobal = await api.get("/result");
      const tipsGlobal = await api.get("/tips");

      setSchedule(scheduleGlobal.data.data);
      setResult(resultGlobal.data.data);
      setTips(tipsGlobal.data.data);
    };

    fetchData();
  }, []);

  const imports = {
    Swal,
    useForm,
    useState,
    useEffect,
    api,
    Link,
    yupResolver,
    ordinal,
    isMobile,
    GetCurrentDate,
  };

  return (
    <GetData.Provider
      value={{
        schedule,
        setSchedule,
        result,
        setResult,
        tips,
        setTips,
        ...imports,
      }}
    >
      {props.children}
    </GetData.Provider>
  );
}

export default GetdataProvider;
