import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { ITemplate } from './models';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import TemplatesList from './TemplatesList';
/* import TemplateEditor from './TemplateEditor'; */

import { LOADING, FAILURE, loading } from 'src/renderer/component/Templates/flux/module';
import { getPages, getStatus } from 'src/renderer/component/Templates/flux/selectors';

export namespace MailListSpace {
    export interface IProps {
        status?: string;
        pages?: object;
        loading?: () => void;
    }
  
    export interface IState {
        displayTemplate: null|ITemplate;
    }
}

const mapStateToProps = (state: IGlobalState) => ({
    status: getStatus(state),
    pages: getPages(state)
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
    loading: () => dispatch(loading())
});

@(connect(mapStateToProps, mapDispatchToProps))
class TemplatesRouter extends React.Component<MailListSpace.IProps, MailListSpace.IState> {
    state = {
        displayTemplate: null,
    };

    selectTemplate = (template: ITemplate) => {
        this.setState({
            displayTemplate: template
        });
    }

    exitTemplate = () => {
        this.setState({
            displayTemplate: null
        });
    }

    componentDidMount(){
        console.log('did mount')
        this.props.loading();
    }

    render(){

        if (this.props.status === LOADING) {
            return <h1>Preloader ;)</h1>
        } else if (this.props.status === FAILURE) {
            return <h1>LOADING</h1>;
        } else {
            return <TemplatesList templates={this.props.pages[1]} selectTemplate={this.selectTemplate} />;
        }

        /* if (this.state.displayTemplate !== null) {
            return <TemplatesList token={this.props.token} selectTemplate={this.selectTemplate}/>;
        } else {
            return <TemplateEditor token={this.props.token} template={this.state.displayTemplate} />;
        } */
    }
}

export default TemplatesRouter;