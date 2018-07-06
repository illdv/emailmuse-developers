/**
 * Params for editor.
 * idBackEnd get when we send Entity on back end.
 * idFrontEnd use
 */
export interface IEditEntity {
  id: string;
  idFrontEnd: string;
  html: string;
  type: EntityType;
  params: IEditEntityParameter;
}

export interface IEditEntityParameter {
  [key: string]: {
    value: string;
    type: ParamType;
  };
}

export enum ParamType {
  Text = 'Text',
  Html = 'Html',
}

export enum EntityType {
  Email   = 'Email',
  Snippet = 'Snippet',
  Layout  = 'Layout',
}
