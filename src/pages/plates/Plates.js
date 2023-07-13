import React, { useEffect, useState } from "react";
import "./Plates.css";
import useHttp from "../../hooks/useHttp";
import { CardPlate } from "../../components/plates/CardPlate";
import Loading from "../../components/global/Loading";

const Plates = () => {
  const [plates, setPlates] = useState([]);
  const { isLoading, requestGet } = useHttp();

  useEffect(() => {
    getPlates();
  }, []);

  const getPlates = async () => {
    const plates = await requestGet("api/plates");
    console.log(plates);
    setPlates(plates);
  };
  return (
    <div className="d-flex flex-wrap container-gap">
      {isLoading && <Loading />}
      {plates.map((plate, index) => (
        <CardPlate {...plate} key={index} />
      ))}
    </div>
  );
};

export default Plates;
