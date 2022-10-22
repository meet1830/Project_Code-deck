import React, { useState } from "react";
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

const CodeEditor = () => {
  // code editor configuration
  // the theme that we want our code editor to have
  const [theme, setTheme] = useState<any>(githubDark);
  // language
  const [lang, setLang] = useState<any>(python);

  return (
    // according to docs codemirror has theme attribute, apply and changes will be visible, same for language
    <div>
      <CodeMirror
        theme={theme}
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
    </div>
  );
};

export default CodeEditor;
