import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { IFolderActions } from 'src/renderer/component/Folder/flux/actions';

interface IFolder {
  actions?: IFolderActions;
}

export const Folder: React.SFC<IFolder> = ({ actions }) => {
  const onRequest = () => {
    // actions.showModal.REQUEST({});
  };

  return (
    <div>
      Test
    </div>
  );
};

/*const mapStateToProps = state => ({

});*/

const mapDispatchToProps = dispatch => ({
  // actions: bindActionCreators({ createFolder }, dispatch),
});
export default connect(null, mapDispatchToProps)(Folder);
