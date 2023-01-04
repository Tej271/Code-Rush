import React, { useState } from "react";

import Editor from "@monaco-editor/react";

const CodeEditorWindow = ({ onChange, language, code, theme, file_data }) => {
  const [value, setValue] = useState(code || "");

  const handleEditorChange = (value) => {
    setValue(value);
    onChange(file_data.pid, file_data.id, "code", value);
  };

  return (
    <div className="overlay rounded-lg overflow-hidden w-full h-full shadow-4xl mt-10">
      <Editor
        height="70vh"
        width={`80%`}
        language={language || "javascript"}
        value={value}
        theme={theme}
        defaultValue={"// Your Code Goes Here"}
        onChange={handleEditorChange}
      />
    </div>
  );
};
export default CodeEditorWindow;
