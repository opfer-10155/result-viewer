import React from 'react'
import { makeStyles } from '@material-ui/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Slider from '@material-ui/core/Slider'
import Input from '@material-ui/core/Input'
import { Theme } from '../../theme'

// -----------style------------
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    height: 200,
    color: theme.palette.primary.contrastText,
  },
  input: {
    width: 42,
  }
}));

// -----------render------------
type Props = {
  label: string,
  value: number,
  min: number,
  max: number,
  onChange: (event: React.ChangeEvent<{}>, value: number | number[]) => void
}

// Caution: numberにしか対応していない
export default function SliderInput(props: Props) {
  const classes = useStyles()
  const space = 2
  const { label, value, min, max, onChange } = props

  const handleSliderChange = onChange

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value !== '') onChange(event, Number(event.target.value))
  }

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (value < min) { onChange(event, min); }
    else if (value > max) { onChange(event, max); }
  }

  return (
    <div className={classes.root}>
      <Typography id="input-slider" gutterBottom>
        {label}
      </Typography>
      <Grid container spacing={space} alignItems="center">
        <Grid item xs>
          <Slider
            value={value}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={value}
            margin="dense"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 10,
              min,
              max,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </div>
  )
}
