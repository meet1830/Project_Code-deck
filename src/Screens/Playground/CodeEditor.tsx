import React, { useState } from "react";
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

const CodeEditor = () => {
  // code editor configuration
  // the theme that we want our code editor to have
  const [theme, setTheme] = useState<any>(githubDark);
  // language
  const [lang, setLang] = useState<any>(python);

  return (
    // according to docs codemirror has theme attribute, apply and changes will be visible, same for language
    <CodeEditorContainer>
      <CodeMirror
        theme={theme}
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
