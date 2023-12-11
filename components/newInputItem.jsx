import styles from 'styles/input.module.css';

import { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Slider ,TextField} from '@mui/material';

import bad from '../public/images/bad.png';
import soso from '../public/images/soso.png';
import good from '../public/images/good.png';
import neutral from '../public/images/neutral.svg';
import happy from '../public/images/happy.svg';
import unhappy from '../public/images/unhappy.svg';

import Image from 'next/image';

export default function NewInputItem(props) {

    const { person, label, onTaskChange, initialValue ,setTaskCount ,taskCount, countOurTask } = props;

    const [ isDoingTask, setDoingTask ] = useState(initialValue.participates);
    const [ happyLevel, setHappyLevel ] = useState(initialValue.effort ? initialValue.effort : 0); // Neutral: 0, Unhappy: -1, Happy: +1
    const [ taskTime, setTaskTime ] = useState(initialValue.duration ? initialValue.duration : 30);

    const sliderMarks = [
        {
            value: 10,
            label: '10分',
        },
        {
            value: 30,
            label: '30分',
        },
        {
            value: 60,
            label: '60分',
        },
        {
            value: 90,
            label: '90分',
        }
    ];

    useEffect(() => {
        if (onTaskChange && onTaskChange instanceof Function) {
            onTaskChange(person, label, {
                participates: Number(taskCount),
                effort: happyLevel,
                duration: taskTime,
                category: initialValue.category
            })
        }
    }, [taskCount, happyLevel, taskTime, onTaskChange, label, person, initialValue.category ] )

    //分担回数を変える度に合計値を計算する
    useEffect(()=>{
        countOurTask()
    },[taskCount])

    return (<div className={ styles.inputRow }>
        <ToggleButtonGroup value={isDoingTask} sx={{ gridArea: 'action' }} color="secondary" exclusive
            onChange={ (_, newValue) => {
                        if (newValue !== null) setDoingTask(newValue);
                    }}
            aria-label="タスク担当かどうか">
        <label>
            <input
            value={taskCount}
            onChange={e => setTaskCount(e.target.value)}
            type="number"
            min={0}
            max={7}
            defaultValue={taskCount}
            />
        </label>
            {/* <ToggleButton value={true} aria-label="する"><font size="1.5">する</font></ToggleButton>
            <ToggleButton value={false} aria-label="しない"><font size="1.5">しない</font></ToggleButton> */}
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
            step={10}
            marks= { sliderMarks }
            min={10}
            max={90}
            onChange={ (_, newValue) => setTaskTime(newValue) }
            />
    </div>);
};