import * as React from 'react';
import { connect, Dispatch } from 'react-redux';

import { ITemplate } from './models';
import { IGlobalState } from 'src/renderer/flux/rootReducers';
import TemplatesList from './TemplatesList';
import TemplateEditor from './TemplateEditor';

import { LOADING, FAILURE, loading } from 'src/renderer/component/Templates/flux/module';
import { getPages, getStatus } from 'src/renderer/component/Templates/flux/selectors';

export namespace MailListSpace {
    export interface IProps {
        status?: string;
        pages?: object;
        loading?: () => void;
    }
  
    export interface IState {
        editTemplate: null|ITemplate;
        createTemplate: boolean;
    };
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
        editTemplate: null,
        createTemplate: false
    };

    selectTemplate = (template: ITemplate) => {
        this.setState({
            editTemplate: template
        });
    }

    closeTemplate = () => {
        this.setState({
            editTemplate: null
        });
    }

    componentDidMount(){
        this.props.loading();
    }

    onCreateTemplate = () => {
        this.setState({
            createTemplate: true
        })
    } 

    render(){

        if (this.props.status === LOADING) {
            return <h1>Preloader ;)</h1>
        } else if (this.props.status === FAILURE) {
            return <h1>Failure</h1>;
        } else {
            if (this.state.editTemplate !== null) {
                return <TemplateEditor template={this.state.editTemplate} closeTemplate={this.closeTemplate} />;
            } else if(this.state.createTemplate !== false) {
                return <TemplateEditor template={null} closeTemplate={this.closeTemplate} />;
            } else {
                return (
                    <div>
                        <div onClick={this.onCreateTemplate}>Add</div>
                        <TemplatesList templates={this.props.pages[1]} selectTemplate={this.selectTemplate} />
                    </div>
                )
            }
        }
    }
}

export default TemplatesRouter;