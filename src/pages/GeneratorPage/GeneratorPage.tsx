import "./GeneratorPageStyles.scss";
import { GeneratorHeader } from "../../components/headers/GeneratorHeader/GeneratorHeader";
import { useState } from "react";

export const GeneratorPage = () => {

  const [ page, setPage ] = useState(true);

  return (
    <div className="generator-page-container">
      <GeneratorHeader  page={page} setPage={setPage}/>
    </div>
  );
};
