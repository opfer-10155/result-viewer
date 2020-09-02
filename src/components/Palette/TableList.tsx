import React from 'react'
import { makeStyles } from '@material-ui/styles'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import { Theme } from '../../theme'
import { TableMeta, Table } from './reducer'
/**
 * テーブルを複数選択して、x,y,z軸に使う列を選択する
 */
// -----------style------------
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    height: 200,
    color: theme.palette.primary.contrastText,
  },
  checkbox: {
    marginLeft: 'auto',
  }
}));

const makeColoredCheckBox = (color: string) => withStyles({
  root: {
    color: color,
    '&$checked': {
      color: color,
    }
  },
  checked: {}
})((props: CheckboxProps) => <Checkbox color="default" {...props} />);

// -----------render------------

type Props = {
  tables: TableMeta[],
  // isSelected: boolean[],
  selectedTables: {[id: number]: Table},
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean, table: TableMeta) => void
}

export default function TableList(props: Props) {
  const classes = useStyles()
  const { tables, onChange, selectedTables } = props

  return (
        <FormGroup row>
          {
            tables.map((table) => {
              const id = table.id
              const isSelected = !!selectedTables[id]
              const ColoredCheckBox = isSelected ? makeColoredCheckBox(selectedTables[id].color) : Checkbox
              return (
                <FormControlLabel
                  control={
                    <ColoredCheckBox
                      checked={isSelected}
                      onChange={(e, checked) => onChange(e, checked, table)}
                    />
                  }
                  label={table.name}
                  key={table.id}
                />
              )
            })
          }
        </FormGroup>
  )
}
