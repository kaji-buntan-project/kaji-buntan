import styles from 'styles/newInputItem.module.css';
import { useRef } from 'react';

import { useEffect, useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Slider } from '@mui/material';

import bad from '../public/images/bad.png';
import soso from '../public/images/soso.png';
import good from '../public/images/good.png';
import neutral from '../public/images/neutral.svg';
import happy from '../public/images/happy.svg';
import unhappy from '../public/images/unhappy.svg';

import Image from 'next/image';
import { validateCount } from 'lib/validateCount';

export default function InputItem(props) {

    const {person, label, onTaskChange, initialValue ,setTaskCount ,taskCount, countOurTask , handleValidateError  } = props;
    const errorMessage = useRef(null);

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

    return (
        <>
        {person === 'me' ? <p className={styles.inputItemMe}>私</p> : <p className={styles.inputItemPartner}>パートナー</p>}
        <div className={(person === "me" ? styles.inputRowMe : styles.inputRowPartner)}>
        {/*　家事分担回数の入力項目追加 */}
        <div className={(person === "me" ? styles.myInputLabel : styles.partnerInputLabel)} sx={{ gridArea: 'participates' }}>
            <label >
                <input
                // className={ styles.input }
                className={(person === "me" ? styles.myInput : styles.partnerInput)}
                value={taskCount}
                data-format="$1回"
                onChange={e => setTaskCount(e.target.value)}
                type="number"
                min={0}
                max={200}
                defaultValue={taskCount}
                //フォーカスアウトした時にバリデーションチェック
                onBlur={()=>{validateCount(errorMessage,taskCount),handleValidateError(errorMessage)}}
                />
                <span className={ styles.errorMessage } ref={errorMessage}></span>
            </label>
        </div>

        <ToggleButtonGroup value={happyLevel} sx={{ gridArea: 'effort' }} color="secondary" exclusive className={ styles.effort }
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
            className={ styles.slider }
            value={ taskTime }
            sx={{ gridArea: 'duration', marginLeft: '1em' }}
            // step={10}
            step={7}
            marks= { sliderMarks }
            min={10}
            max={90}
            onChange={ (_, newValue) => setTaskTime(newValue) }
            />
        </div>
        </>
);
};