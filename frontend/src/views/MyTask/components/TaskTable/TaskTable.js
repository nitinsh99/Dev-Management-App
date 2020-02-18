import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';
import ModelForm from '../ModalForm/ModelFormIndex';
import {
  stableSort,
  getSorting,
  EnhancedTableHead
} from '../../../../components/TableTools/TableTools';
import headCells from './DefaultData/DefaultData';
import useStyles from './TaskTable-Style';
import Notes from './components/Notes/Notes';
export default function TaskTable(props) {
  const { currentSection, isPM } = props;

  const classes = useStyles();
  const { tasks } = currentSection;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('deadline');
  const [selected, setSelected] = useState([]);
  const [selectOneData, setSelectOneData] = useState(null);

  // return selectOneData;
  useEffect(() => {
    if (selected.length === 1) {
      const id = selected[0];
      tasks.forEach(e => {
        if (e['_id'] === id) {
          const { status, updateAt, title, deadline, user } = e;
          setSelectOneData({
            status,
            updateAt,
            title,
            deadline,
            username: user['_id']
          });
        }
      });
    } else {
      setSelectOneData(null);
    }
  }, [tasks, selected]);
  const selectNothing = () => {
    setSelected([]);
  };
  function createData(name, deadline, staff, status, taskId, comment) {
    return { name, deadline, staff, status, taskId, comment };
  }

  const rows = tasks.map(currentTask => {
    const { title, deadline, user, status, _id, comment } = currentTask;
    return createData(
      title,
      deadline,
      `${user.firstName} ${user.lastName}`,
      status,
      _id,
      comment
    );
  });

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelecteds = rows.map(n => n.taskId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const isSelected = name => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* ////////////////////////////////////////////////Table Head */}
        <Toolbar
          className={clsx(classes.rootToolBar, {
            [classes.highlight]: selected.length > 0
          })}>
          {selected.length > 0 ? (
            <Typography
              className={classes.title}
              color="inherit"
              variant="subtitle1">
              {selected.length}
            </Typography>
          ) : (
            <Typography className={classes.title} variant="h6" id="tableTitle">
              {currentSection.title}
            </Typography>
          )}
          {selected.length > 0 ? (
            <>
              {selected.length === 1 ? (
                <Tooltip title="Edit Task">
                  <IconButton aria-label="edit">
                    <ModelForm
                      sectionId={currentSection['_id']}
                      method={'edit-task'}
                      projectId={currentSection.project}
                      allTasksId={selected}
                      selectNothing={selectNothing}
                      currentData={selectOneData}
                    />
                  </IconButton>
                </Tooltip>
              ) : null}
              {isPM ? (
                  <IconButton aria-label="delete task">
                    <ModelForm
                      sectionId={currentSection['_id']}
                      method={'delete-task'}
                      projectId={currentSection.project}
                      allTasksId={selected}
                      selectNothing={selectNothing}
                    />
                </IconButton>
              ) : null}
            </>
          ) : (
            <>
              {isPM ? (
                <>
                  <Tooltip title="Add task">
                    <IconButton aria-label="add task">
                      <ModelForm
                        sectionId={currentSection['_id']}
                        method={'add-task'}
                        projectId={currentSection.project}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Edit Section">
                    <IconButton aria-label="edit section">
                      <ModelForm
                        method={'edit-section'}
                        sectionCurrentTitle={currentSection.title}
                        projectId={currentSection.project}
                        sectionId={currentSection['_id']}
                      />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete Section">
                    <IconButton aria-label="delete section">
                      <ModelForm
                        sectionId={currentSection['_id']}
                        method={'delete-section'}
                        projectId={currentSection.project}
                      />
                    </IconButton>
                  </Tooltip>
                </>
              ) : null}
              <Tooltip title="Filter list">
                <IconButton aria-label="filter list">
                  <FilterListIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </Toolbar>
        {/* ////////////////////////////////////////////////Table Head */}

        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table">
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getSorting(order, orderBy)).map(
                (row, index) => {
                  const {
                    deadline,
                    staff,
                    status,
                    name,
                    comment,
                    taskId
                  } = row;
                  const isItemSelected = isSelected(taskId);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, taskId)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={taskId}
                      defaultValue={isItemSelected || ''}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          color="default"
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none">
                        {name}
                      </TableCell>
                      <TableCell align="right">{deadline}</TableCell>
                      <TableCell align="right">{staff}</TableCell>
                      <TableCell align="right">{status}</TableCell>
                      <TableCell align="right">
                        <Notes
                          contentText={comment}
                          projectId={currentSection.project}
                          sectionId={currentSection['_id']}
                          taskId={taskId}
                        />
                      </TableCell>
                    </TableRow>
                  );
                }
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
