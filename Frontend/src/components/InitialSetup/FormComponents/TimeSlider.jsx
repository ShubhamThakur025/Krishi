import React from 'react'
import { Slider } from '@mui/material'

function TimeSlider({ productionTime, setProductionTime }) {
    return (
        <Slider
            value={productionTime}
            onChange={(e) => setProductionTime(e.target.value)}
            valueLabelDisplay="auto"
            min={1}
            max={12}
            step={1}
            marks={[
                { value: 1, label: '1 month' },
                { value: 3, label: '3 months' },
                { value: 6, label: '6 months' },
                { value: 9, label: '9 months' },
                { value: 12, label: '12 months' },
            ]}
        />
    )
}

export default TimeSlider
