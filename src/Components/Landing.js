import React, { useEffect, useState } from "react";
import CodeEditorWindow from "./CodeEditorWindow";
import axios from "axios";
import { Buffer } from "buffer";

import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "./OutputWindow";
import CustomInput from "./CustomInput";
import OutputDetails from "./OutputDetails";
import ThemeDropdown from "./ThemeDropdown";
import LanguagesDropdown from "./LanguageDropdown";
import { useProjects } from "../context/DataContext";
import { IoCloudDownloadOutline, IoCloudUploadOutline } from "react-icons/io5";

const Landing = ({ file_data }) => {
  const { updateCode } = useProjects();
  const [code, setCode] = useState(file_data.content || "");
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [theme, setTheme] = useState("cobalt");
  const [language, setLanguage] = useState(file_data.language);

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const onSelectChange = (sl) => {
    console.log("selected Option...", sl);
    setLanguage(sl);
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      console.log("enterPress", enterPress);
      console.log("ctrlPress", ctrlPress);
      handleCompile();
    }
  }, [ctrlPress, enterPress]);

  useEffect(() => {
    // Anything in here is fired on component mount.
    return () => {
      // Anything in here is fired on component unmount.
      updateCode(file_data.pid, file_data.id, code);
    };
  }, []);

  const encode = (str) => {
    return Buffer.from(str, "binary").toString("base64");
  };

  const decode = (str) => {
    return Buffer.from(str, "base64").toString();
  };

  const getFile = (e, setState) => {
    const input = e.target;
    if ("files" in input && input.files.length > 0) {
      placeFileContent(input.files[0], setState);
    }
  };

  const placeFileContent = (file, setState) => {
    readFileContent(file)
      .then((file_content) => {
        setState(file_content);
        console.log("INNER", file_content);
        onChange(file_data.pid, file_data.id, "code", file_content);
      })
      .catch((error) => console.log("ERROR", error));
  };

  function readFileContent(file) {
    const reader = new FileReader();
    return new Promise((resolve, reject) => {
      reader.onload = (event) => resolve(event.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
  }

  const languageId = languageOptions.filter(
    (el) => file_data.language === el.name
  ).id;

  console.log("USUAL", file_data);

  const onChange = (pid, fid, action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        updateCode({ pid, fid, code: data });
        break;
      }
      default: {
        console.warn("case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    console.log(process.env.REACT_APP_RAPID_API_HOST);
    setProcessing(true);
    const formData = {
      language_id: file_data.lang_id,
      // encode source code in base64
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log("res.data", response.data);
        const token = response.data.token;

        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        setProcessing(false);
        console.log(error.message);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        console.log("response.data", response.data);
        return;
      }
    } catch (err) {
      console.log("err", err);
      setProcessing(false);
      showErrorToast();
    }
  };

  function handleThemeChange(th) {
    const theme = th;
    console.log("theme...", theme);

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
    } else {
      defineTheme(theme.value).then((_) => setTheme(theme));
    }
  }
  useEffect(() => {
    defineTheme("oceanic-next").then((_) =>
      setTheme({ value: "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const showErrorToast = (msg) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-row">
        {/* <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div> */}
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4">
        <div className="flex flex-col w-full h-full justify-start">
          <span className="text-2xl text-left font-medium">
            File Name: {file_data.name}
          </span>
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
            file_data={file_data}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />

            <button
              onClick={handleCompile}
              disabled={!code}
              className={classnames(
                "mt-4 border border-black z-10 rounded-md px-4 py-2  bg-white flex-shrink-0",
                !code ? "opacity-50" : ""
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
            <div className="flex flex-row w-[50%] ml-[30%] p-4">
              {/* <input
                className="hidden "
                type="file"
                accept="."
                id="codefile"
                onChange={(e) => getFile(e, setCode)}
              />{" "}
              <IoCloudUploadOutline style={{ fontSize: "1.5rem" }} /> Upload
              Code
              <label className="flex gap-3 items-center" htmlFor="codefile">
                <input
                  className="hidden"
                  type="file"
                  accept="."
                  id="codefile"
                  onChange={(e) => getFile(e, setCode)}
                />{" "}
                <IoCloudUploadOutline style={{ fontSize: "1.5rem" }} /> Import
                Code
              </label> */}
              <a
                className="flex flex-row justify-around w-[100%] ml-[20%] p-2 border border-gray-600 rounded-lg"
                href={`data:text/plain;charset=utf-8,${encodeURIComponent(
                  code
                )}`}
                download={"code.txt"}
              >
                <IoCloudDownloadOutline style={{ fontSize: "1.5rem" }} />{" "}
                Download Code
              </a>
            </div>
          </div>
          {outputDetails && <OutputDetails outputDetails={outputDetails} />}
        </div>
      </div>
    </>
  );
};
export default Landing;
