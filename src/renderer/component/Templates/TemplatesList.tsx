import * as React from 'react';
import { Divider, Grid, List, ListItem, Paper, TablePagination, Typography } from '@material-ui/core/';
import InCenter from 'src/renderer/common/InCenter';
import { ITemplate } from 'src/renderer/component/Templates/flux/entity';
import { IPagination } from 'src/renderer/component/ImageLibrary/store/models';

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
    pagination: IPagination;
    selectTemplate: (template: ITemplate) => void;
    onChangePage: (e, page: number) => void;
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
    const {templates, pagination} = this.props;

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
                <Divider/>
              </div>
            ))}
          </List>
          <InCenter>
            {
              pagination.total &&
              <TablePagination
                component='div'
                count={pagination.total}
                rowsPerPage={pagination.per_page}
                rowsPerPageOptions={[16]}
                page={pagination.current_page - 1}
                backIconButtonProps={{
                  'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                  'aria-label': 'Next Page',
                }}
                onChangePage={this.props.onChangePage}
              />
            }
          </InCenter>
        </div>
      </Paper>
    );
  }
}

export default TemplatesList;
