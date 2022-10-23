import React, { useEffect, useState } from "react";
import styled from "styled-components";

import CodeMirror from "@uiw/react-codemirror";

// importing all themes
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import { xcodeDark, xcodeLight } from "@uiw/codemirror-theme-xcode";
import { duotoneDark, duotoneLight } from "@uiw/codemirror-theme-duotone";
import { okaidia } from "@uiw/codemirror-theme-okaidia";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { bespin } from "@uiw/codemirror-theme-bespin";

// languages
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { javascript } from "@codemirror/lang-javascript";
import { python } from "@codemirror/lang-python";

// configuration
import { indentUnit } from "@codemirror/language"; /* no of spaces for indentation */
import { EditorState } from "@codemirror/state"; /* no of spaces after pressing tab */

const CodeEditorContainer = styled.div`
  height: calc(100vh - 12.5rem);
  // 4 rem each for lower and upper toolbar 4.5 for navbar

  // styling just next div after this
  & > div {
    height: 100%;
  }
`;

// accepting code value
interface CodeEditorProps {
  currentLanguage: string;
  currentTheme: string;
  currentCode: string;
}

// codeeditor is a functional component(not a class component). and to pass the interface as type we have to write it. accept the props as arguments
const CodeEditor: React.FC<CodeEditorProps> = ({
  currentLanguage,
  currentTheme,
  currentCode,
}) => {
  // code editor configuration
  // the theme that we want our code editor to have
  // want to change the initial value based on the value the user chose at homepage
  const [theme, setTheme] = useState<any>(githubDark);
  // language
  const [lang, setLang] = useState<any>(python);

  // setting a default theme and language
  // handle language change
  // if in upper header changed language then passing that in code editor
  useEffect(() => {
    if (currentLanguage === "c++") setLang(cpp);
    if (currentLanguage === "java") setLang(java);
    if (currentLanguage === "python") setLang(python);
    if (currentLanguage === "javascript") setLang(javascript);
  }, [currentLanguage]);

  // similarly handling theme change
  useEffect(() => {
    if (currentTheme === "duotoneLight") setTheme(duotoneLight);
    if (currentTheme === "duotoneDark") setTheme(duotoneDark);
    if (currentTheme === "xcodeLight") setTheme(xcodeLight);
    if (currentTheme === "xcodeDark") setTheme(xcodeDark);
    if (currentTheme === "okaidia") setTheme(okaidia);
    if (currentTheme === "githubLight") setTheme(githubLight);
    if (currentTheme === "githubDark") setTheme(githubDark);
    if (currentTheme === "darcula") setTheme(darcula);
    if (currentTheme === "bespin") setTheme(bespin);
  }, [currentTheme]);

  return (
    // according to docs codemirror has theme attribute, apply and changes will be visible, same for language
    // value is the current code - default code that we want to pass for every language
    <CodeEditorContainer>
      <CodeMirror
        theme={theme}
        value={currentCode}
        height="100%"
        extensions={[
          lang,
          indentUnit.of("      "),
          EditorState.tabSize.of(8),
          EditorState.changeFilter.of(() => true),
        ]}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLineGutter: true,
          highlightSpecialChars: true,
          foldGutter: true,
          drawSelection: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          syntaxHighlighting: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: true,
          rectangularSelection: true,
          crosshairCursor: true,
          highlightActiveLine: true,
          highlightSelectionMatches: true,
          closeBracketsKeymap: true,
          defaultKeymap: true,
          searchKeymap: true,
          historyKeymap: true,
          foldKeymap: true,
          completionKeymap: true,
          lintKeymap: true,
        }}
      />
    </CodeEditorContainer>
  );
};

export default CodeEditor;
