import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { withStyles } from '@material-ui/core/styles';
import Radio, { RadioProps } from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { Theme } from '../../theme';

/**
 * x,y,z軸に使う列を選択する
 */
// -----------style------------
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1),
    height: '100%',
    color: theme.palette.primary.contrastText,
    display: 'flex'
  },
  formControl: {
    margin: theme.spacing(3),
  }
}));

const makeColoredRadio = (color: string) => withStyles({
  root: {
    color: color,
    '&$checked': {
      color: color,
    }
  },
  checked: {}
})((props: RadioProps) => <Radio color="default" {...props} />);

// -----------render------------
// type Table = {
//   color: string
//   name: string
//   colnames: string[]
// }
type Props = {
  label: string
  colnames: string[]
  // selectedTables: {[key: string]: Table},
  selected: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void
  color: string
  key: string
}

export default function ColumnList(props: Props) {
  const classes = useStyles()
  const { label, colnames, selected, onChange, color, key } = props
  const ColoredRadio = makeColoredRadio(color)
  return (
    <div className={classes.root}>
      {/* {
        Object.keys(selectedTables).map(
          (key, i, _) => {
            const table = selectedTables[key]
            const { colnames, name, color } = table
            const ColoredRadio = makeColoredRadio(color)
            return (
              <FormControl component="fieldset">
                <FormLabel component="legend">{name}</FormLabel>
                  <RadioGroup name={key} value={selected} onChange={onChange}>
                  {
                    colnames.map((colname) => (
                      <FormControlLabel
                        value={colname}
                        control={<ColoredRadio />}
                        label={colname}
                      />
                    ))
                  }
                  </RadioGroup>
              </FormControl>
            )
          }
        )
      } */}
      <FormControl component="fieldset">
        <FormLabel component="legend">{label}</FormLabel>
          <RadioGroup name={key} value={selected} onChange={onChange}>
          {
            colnames.map((colname, index) => (
              <FormControlLabel
                value={colname}
                control={<ColoredRadio />}
                label={colname}
                key={index}
              />
            ))
          }
          </RadioGroup>
      </FormControl>
    </div>
  )
}
