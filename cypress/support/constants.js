export const commands = {
  btnSignPassEMail: '[style="margin-top: 60px;"] > .MuiButton-label-172',
  btnAccount:
    '.MuiPaper-root-266 > .MuiGrid-container-22 > .MuiButtonBase-root-342',
  btnLogout: '.MuiButton-containedSecondary-329 > .MuiButton-label-319',
  btnSave:
    '[style="z-index: 99; right: 82px; transition: transform 1000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"]',
  btnClose:
    '[style="z-index: 99; right: 144px; transition: transform 1000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"]',
  btnRemove: '.MuiButton-containedSecondary-329',
  confirmationYes: '.MuiButton-textSecondary-322'
};

export const EmailsTab = {
  emailsTab: '.MuiList-root-358 > :nth-child(1) > .MuiButtonBase-root-342',
  rowInTable: 'tbody .node_table_custom_row',
  btnSelectScratch: '.MuiButton-textPrimary-321 > .MuiButton-label-319',
  valueSubject: '.MuiTableBody-root-514 > :nth-child(1) > :nth-child(3)',
  valueDesc: '.node_table_custom_row > .MuiTableCell-paddingNone-508',
  valueSubject2: ':nth-child(2) > .MuiTableCell-paddingNone-561',
  valueDesc2: '.MuiTableBody-root-567 > :nth-child(2) > :nth-child(3)',
  btnRemove: '.MuiButton-containedSecondary-329',
  confirmationYes: '.MuiButton-textSecondary-322',
  subjectContent:
    '.MuiTableBody-root-576 > :nth-child(1) > .MuiTableCell-paddingNone-570',
  subjectContentLast: ':nth-child(3) > .MuiTableCell-paddingNone-511',
  btnNewEmail:
    '[style="z-index: 99; right: 20px; transition: transform 1000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"]',
  btnAddFolder:
    '[style="z-index: 99; right: 82px; transition: transform 1000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"]',
  btnSaveFolder: '.btn-save-folder',
  btnSaveFolder2: '.btn-save-folder',
  btnSave:
    '[style="z-index: 99; right: 82px; transition: transform 1000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"]',
  btnClose:
    '[style="z-index: 99; right: 144px; transition: transform 1000ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;"]'
};

export const SnippetsTab = {
  snippetsTab: '.MuiList-root-358 > :nth-child(3) > .MuiButtonBase-root-342',
  btnAddSnippets:
    '.MuiGrid-item-23 > .MuiGrid-container-22 > .MuiButtonBase-root-342'
};

export const LayoutTab = {
  layoutTab: ':nth-child(4) > .MuiButtonBase-root-342'
};

export const TrainingsTab = {
  trainingsTab: '.MuiList-root-358 > :nth-child(6) > .MuiButtonBase-root-342',
  rowTrainers:
    '.MuiGrid-grid-sm-9-73 > :nth-child(1) > .MuiPaper-root-266 > .MuiList-root-358 > :nth-child(2) > .MuiButtonBase-root-342',
  rowTrainings:
    '.MuiGrid-grid-sm-9-73 > :nth-child(1) > .MuiPaper-root-266 > .MuiList-root-358 > :nth-child(2) > .MuiButtonBase-root-342',

  trainingsAPIUrl: '/api/v1/parse-remote-json/training.json',
  video: 'iframe',
  btnBack:
    '[style="display: flex; justify-content: space-between;"] > :nth-child(1) > .MuiButton-label-319',
  btnNext: ':nth-child(2) > .MuiButton-label-319',
  btnBreadTrainers: '.breadcrumbs > :nth-child(1)',
  btnBreadTrainings: '.breadcrumbs > :nth-child(2)'
};

export const ImageTab = {
  imageLibraryTab:
    '.MuiList-root-358 > :nth-child(2) > .MuiButtonBase-root-342',
  searchInput: '#search',
  imageList: '.image-library-list',
  imageCounter: '.image-library__pagination span',
  imageCard: '.image-library-list__tile',
  imageAPIURL: '/api/v1/images/?page=1&name=',
  inputImageName: '.image-library-dialogs__inputName input',
  inputImageURL: '.image-library-dialogs__inputURL input',
  btnImageCardDelete:
    '.MuiGridListTileBar-root-485 > .MuiGridListTileBar-actionIcon-494',
  btnPopupUpdate: '.image-library-dialogs__button--update',
  btnPaginationLeft: '.MuiTablePagination-actions-469 :nth-child(1)',
  btnPaginationRight: '.MuiTablePagination-actions-469 :nth-child(2)',
  btnSearch: '.MuiInputAdornment-root-420 > .MuiButtonBase-root-342',
  btnUploadImg: '.image-library__footer > .MuiButtonBase-root-342'
};
export const Authorization = {
  inputLogin: ':nth-child(1) > .MuiInput-root-232 > .MuiInput-input-240',
  inputPassword: ':nth-child(2) > .MuiInput-root-232 > .MuiInput-input-240',
  btnSignIn: ':nth-child(2) > .MuiButtonBase-root-195'
};

export const Profile = {
  btnChangePassword: '.MuiGrid-item-23 > .MuiGrid-container-22 > :nth-child(1)',
  inputOldPassword: '#old_password',
  newPassword: '#password',
  newPasswordConfirmation: '#password_confirmation',
  submitChangePassword: '.profile__btn--change-password',
  btnCloseModal: '.profile__btn--close-modal'
};
