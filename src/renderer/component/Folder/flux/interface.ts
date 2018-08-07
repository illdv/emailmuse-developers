interface IFolder {
  name: string;
  parentId: number;
}

interface ICreateFolderRequest {
  name: string;
  parent_id: number;
}
