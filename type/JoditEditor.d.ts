declare module 'jodit-react' {
  export interface IJoditEditorProps {
    value: string,
    config?: object,
    onChange: (newValue: string) => void;
  }
  const JoditEditor: React.ComponentType<IJoditEditorProps>;
  // noinspection JSUnusedGlobalSymbols
  export default JoditEditor;
}
