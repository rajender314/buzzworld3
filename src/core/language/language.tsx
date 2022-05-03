import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
// import { i18n } from "app/src/core/language/i18n";

const Language = () => {
  const { t, i18n } = useTranslation();
  // const [text1, setText1] = useState();
  // const [lang1, setLang1] = useState();
  // const Lang = "eng";
  // const [output] = useState(language('PROFILE_NAME','arb'))
 
  
  const getLang = (label: string, lang?: string) => {
    t(label);
    // console.log(lang);
    lang ? i18n.changeLanguage(lang) : i18n.changeLanguage("eng");
    setTimeout(() => {
      // console.log(t(label));
    }, 100);
  };
  useEffect(() => {
    getLang("PROFILE_NAME");
    // i18n.changeLanguage("eng");
    // geti18('arb')
    // console.log(Lan("PROFILE_NAME","rus"))
    // console.log(GetNames());
    // const res =  lan("PROFILE_NAME","arb")
    // console.log(res)
    // const res = language('PROFILE_NAME','eng')
    // let output:any = {}
    //   let   output = lan("PROFILE_NAME","arb")
    // console.log(output)
    // console.log(res)
    // i18n.changeLanguage('arb')
  }, []);

  //   function Lan(text: any, lang: any) {
  //     i18n.changeLanguage(lang);
  //     return console.log(t("PROFILE_NAME"));
  //     //    <Fragment>{t(text)}</Fragment>
  //     //    console.log()
  //   }
  return (
    <>
      <div style={{ width: "20%" }}>
        <p> hi </p>
        {/* <LangChange lang="arb" displayName="CITY" /> */}
        {/* <PiSelect
          name="language"
          options={options}
          placeholder="Select Language"
          onChange={e => handleClick(e)}
        /> */}
        {/* <button
          style={{ cursor: "pointer" }}
          onClick={() => handleClick("eng")}
        >
          English
        </button>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => handleClick("arb")}
        >
          Arabic
        </button>
        <button
          style={{ cursor: "pointer" }}
          onClick={() => handleClick("rus")}
        >
          Rusian
        </button> */}
      </div>
      <button onClick={() => getLang("PROFILE_NAME", "rus")}>Translate</button>
      {/* <div>{console.log(t('PROFILE_NAME'))} {t('PROFILE_NAME')} </div> */}
      <div>{t("PROFILE_NAME")} </div>
    </>
  );
};

export default Language;
