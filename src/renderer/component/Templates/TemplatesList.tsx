import * as React from 'react';
import { Divider, Grid, List, ListItem, Paper, Typography } from '@material-ui/core/';
import { ITemplate } from './flux/models';

function TemplateItem(props: { title: string, description: string, time: string }) {
  const { title, description, time } = props;
  return (
    <ListItem button>
      <Grid container spacing={24}>
        <Grid item xs={4}>
          <Typography gutterBottom noWrap>{title || '---'}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography align={'center'} gutterBottom noWrap>{description || '---'}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography align={'right'} gutterBottom noWrap>{time || '---'}</Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
}

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

  onSelectTemplate = (template: ITemplate) => () => {
    this.props.selectTemplate(template);
  }

  render() {
    const templates: ITemplate[] = this.props.templates;

    if (!templates || templates.length === 0) {
      return (
        <Typography variant='headline' noWrap align='center'>Templates list empty</Typography>
      );
    }

    return (
      <Paper elevation={4} style={{ height: '100%' }}>
        <div>
          <List component='nav'>
            {templates.map((template: ITemplate, index) => (
              <div
                key={template.id}
                onClick={this.onSelectTemplate(template)}
              >
                <TemplateItem
                  title={template.title}
                  description={template.description}
                  time={template.updated_at}
                />
                {index !== templates.length - 1 && <Divider/>}
              </div>
            ))}
          </List>
        </div>
      </Paper>
    );
  }
}

export default TemplatesList;
