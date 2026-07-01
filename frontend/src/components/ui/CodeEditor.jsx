
import Editor from "@monaco-editor/react";

function CodeEditor({ language, value, onChange, readOnly }) {
  return (
    <Editor
      height="250px"
      language={language}
      value={value}
      onChange={(value) => onChange(value || "")}
      theme="vs-dark"
      options={{
        fontSize: 15,
        minimap: { enabled: false },
        automaticLayout: true,
        readOnly: readOnly
      }}
    />
  );
}

export default CodeEditor;
