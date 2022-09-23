import styles from 'styles/input.module.css';

import { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Slider } from '@mui/material';
import { SliderThumb, SliderValueLabelProps } from '@mui/material/Slider';

import bad from '../public/images/bad.png';
import soso from '../public/images/soso.png';
import good from '../public/images/good.png';
import neutral from '../public/images/neutral.svg';
import happy from '../public/images/happy.svg';
import unhappy from '../public/images/unhappy.svg';

import Image from 'next/image';
import { width } from '@mui/system';

export default function InputItem(props) {

    const { person, label, onTaskChange, initialValue } = props;

    const [ isDoingTask, setDoingTask ] = useState(initialValue.participates);
    const [ happyLevel, setHappyLevel ] = useState(initialValue.effort ? initialValue.effort : 0); // Neutral: 0, Unhappy: -1, Happy: +1
    const [ taskTime, setTaskTime ] = useState(initialValue.duration ? initialValue.duration : 30);

    const sliderMarks = [
        {
            value: 1,
            label: '1m',
        },
        {
            value: 15,
            label: '15m',
        },
        {
            value: 30,
            label: '30m',
        },
        {
            value: 60,
            label: '60m',
        },
    ];

    useEffect(() => {
        if (onTaskChange && onTaskChange instanceof Function) {
            onTaskChange(person, label, {
                participates: isDoingTask,
                effort: happyLevel,
                duration: taskTime,
                category: initialValue.category
            })
        }
    }, [isDoingTask, happyLevel, taskTime, onTaskChange, label, person, initialValue.category ] )

    return (<div className={ styles.inputRow } variant="fullWidth">
        <div className={ styles.taskLabel }>{ props.label }</div>
          
        <ToggleButtonGroup value={isDoingTask} sx={{ gridArea: 'action' }} color="secondary" exclusive 
            onChange={ (_, newValue) => {
                        if (newValue !== null) setDoingTask(newValue);
                    }}
            aria-label="タスク担当かどうか">
            <ToggleButton value={true} aria-label="する"><font size="2.0">YES</font></ToggleButton>
            <ToggleButton value={false} aria-label="しない"><font size="2.0">NO</font></ToggleButton>
        </ToggleButtonGroup>

        <ToggleButtonGroup value={happyLevel} sx={{ gridArea: 'effort' }} color="secondary" exclusive
            onChange={ (_, newValue) => {
                if (newValue !== null) setHappyLevel(newValue);
            }}>
            {/* <ToggleButton value={-1}>👎</ToggleButton>
            <ToggleButton value={0}>👌</ToggleButton>
            <ToggleButton value={-1}>👍</ToggleButton> */}
            <ToggleButton value={-1} sx={{ padding: '5px' }} ><Image alt="introduction" src={unhappy} width={30} height={30}></Image></ToggleButton>
            <ToggleButton value={0} sx={{ padding: '5px' }}><Image alt="introduction" src={neutral} width={30} height={30}></Image></ToggleButton>
            <ToggleButton value={1} sx={{ padding: '5px' }}><Image alt="introduction" src={happy} width={30} height={30}></Image></ToggleButton>
        </ToggleButtonGroup>

        <Slider
            value={ taskTime }
            sx={{ gridArea: 'duration', marginLeft: '1em' }}
            step={1}
            marks= { sliderMarks }
            min={1}
            max={60}
            aria-label="custom thumb label"
            valueLabelDisplay="auto"
            onChange={ (_, newValue) => setTaskTime(newValue) }
            />

    </div>);
};