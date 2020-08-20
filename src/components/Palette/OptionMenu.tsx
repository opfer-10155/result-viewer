import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Checkbox from '@material-ui/core/Checkbox'
import { Theme } from '../../theme'
import SliderInput from './SliderInput'

// -----------style------------
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    height: 700,
    color: theme.palette.primary.contrastText,
  },
  input: {
    width: 42,
  }
}));

// -----------render------------
type Props = {
  zMin: number,
  zMax: number
  zValue: any,
  viewPF: boolean, // パレートフロンティアを表示するか
  viewScatter: boolean, // Scatterを表示するか
  onChangeViewPF: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void,
  onChangeViewScatter: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void,
  onChangeZValue: (event: React.ChangeEvent<{}>, value: number | number[]) => void
}

export default function OptionMenu(props: Props) {
  const classes = useStyles();
  const {
    zMin,
    zMax,
    zValue,
    viewPF,
    viewScatter,
    onChangeViewPF,
    onChangeViewScatter,
    onChangeZValue
  } = props
  return (
    <Card className={classes.root}>
      <CardContent>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={viewPF}
                onChange={onChangeViewPF}
                name="viewPF"
                color="primary"
              />
            }
            label="Pareto Frontier"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={viewScatter}
                onChange={onChangeViewScatter}
                name="viewScatter"
                color="primary"
              />
            }
            label="Scatter Plot"
          />
        </FormGroup>
        <SliderInput
          value={zValue}
          label='Z軸'
          min={zMin}
          max={zMax}
          onChange={onChangeZValue}
        />
      </CardContent>
    </Card>
  )
}
