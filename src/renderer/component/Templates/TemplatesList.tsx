import * as React from 'react';
import { Divider, Grid, List, ListItem, Paper, Typography, withStyles } from '@material-ui/core/';
import { ITemplate } from './models';

export namespace TemplatesListSpace {
  export interface IProps {
    templates: ITemplate[];
    selectTemplate: (template: ITemplate) => void;
  }
}

class TemplatesList extends React.Component<TemplatesListSpace.IProps> {

  constructor(props: TemplatesListSpace.IProps, context?: object) {
    super(props, context);
  }

  render() {
    return (
      <Paper elevation={4}>
        <div>
          <List component="nav">
            {this.props.templates && this.props.templates.map((template: ITemplate, index) => {
              const selectTemplate = () => this.props.selectTemplate(template);
              return (
                <div
                  key={template.id}
                  onClick={selectTemplate}
                >
                  <ListItem button>
                    <Grid container spacing={24}>
                      <Grid item xs={4}>
                        <Typography gutterBottom noWrap>{template.title || '---'}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography align={'center'} gutterBottom noWrap>{template.description}</Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography align={'right'} gutterBottom noWrap>{template.updated_at}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  {index !== this.props.templates.length - 1 && <Divider/>}
                </div>
              );
            }
            )}
          </List>
        </div>
      </Paper>
    );
  }
}

export default TemplatesList;