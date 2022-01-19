import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default class ColorRadioButtons extends React.Component {

    render(){
        return (<>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                onChange={this.props.onChange}
                value = {this.props.value}
                sx={{ml: "10px"}}
            >
                <FormControlLabel value={0} control={<Radio color="warning" />} label="Đợi" />
                <FormControlLabel value={1} control={<Radio color="error" />} label="Lỗi" />
                <FormControlLabel value={2} control={<Radio color="success" />} label="Duyệt" />
            </RadioGroup>
        </>)
    }
}