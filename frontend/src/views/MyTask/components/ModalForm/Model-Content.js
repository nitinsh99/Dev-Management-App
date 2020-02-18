import TextField from '@material-ui/core/TextField';
import React from 'react';

const currentTextField = (
  method,
  onChangeText,
  formData,
  isPM,
  classes,
  allStaff,
  taskOptions
) => {
  const { sectionName, taskName, taskDeadline, person, status } = formData;
  switch (method) {
    case 'add-section':
    case 'edit-section':
      return (
        <>
          <TextField
            id="filled-basic"
            label="Section Name"
            variant="filled"
            className={classes.form}
            name={'sectionName'}
            value={sectionName || ''}
            onChange={e => onChangeText(e)}
            required
          />
        </>
      );
    case 'add-task':
    case 'edit-task':
      return (
        <>
          {isPM ? (
            <>
              <TextField
                id="filled-basic"
                label="Task Name"
                variant="filled"
                className={classes.form}
                name="taskName"
                value={taskName || ''}
                onChange={e => onChangeText(e)}
                required
              />
              <br />
              <TextField
                id="date"
                label="Task Deadline"
                type="date"
                name="taskDeadline"
                value={taskDeadline || ''}
                className={classes.textFieldDate}
                InputLabelProps={{
                  shrink: true
                }}
                onChange={e => onChangeText(e)}
                required
              />
              <br />
              <div className={classes.selectOptionsForm}>
                <span className={classes.spanText}>Assign to: </span>
                <select
                  name="person"
                  value={person || ''} 
                  onChange={e => onChangeText(e)}
                  required>
                  {person ? null : (
                    <option value="" disabled hidden>
                      Choose one
                    </option>
                  )}
                  {allStaff.map(user => {
                    const { username, _id } = user;
                    if (_id === person) {
                      return (
                        <option key={_id} value={_id  || ''} selected>
                          @{username}
                        </option>
                      );
                    } else {
                      return (
                        <option key={_id} value={_id || ''}>
                          @{username}
                        </option>
                      );
                    }
                  })}
                </select>
              </div>
            </>
          ) : null}
          <br />
          <div className={classes.selectOptionsForm}>
            <span className={classes.spanText}>Status: </span>
            <select
              required
              name="status"
              value={status || ''}
              onChange={e => onChangeText(e)}>
              {status ? null : (
                <option value="" disabled hidden>
                  Choose one
                </option>
              )}
              {taskOptions.map(name => (
                <option key={name} value={name || ''}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </>
      );
    default:
      break;
  }
};

export default currentTextField;
