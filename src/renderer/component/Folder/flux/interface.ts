interface IFolder {
  id: number;
  name: string;
  parentId: number;
  description?: string;
}

interface ICreateUpdateFolderRequest {
  name: string;
  parent_id: number;
  description: string;
}

interface IDeleteFolderRequest {
  ids: number[];
}
