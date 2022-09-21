import TaskCategoryListItem from './taskCategoryListItem';
import sensei from '../public/images/sensei.png';
import { Box, Button, Container, Grid, Tooltip } from '@mui/material';
import Image from 'next/image';

import constants from "../src/constants3";
const allTasks = constants.allTasks
import { isMobile } from "react-device-detect"

function categoryShow(task){
    let category;
    for (let categoryObject of allTasks) {
        for (let taskObject of categoryObject.children) {
            if (taskObject.name == task){
                category = categoryObject.name;
            }
        }
    }
    return category;
}



export default function GuideTalk(props) {

    function getSaying() {
        if (props.tabnumber == 0){
            return "First, choose your house chores to be shared.";
            //return "まずは分担する家事を選択してね";
        }else if (props.tabnumber == 1){
            if(isMobile){
                return "For each chore, enter\n(1) whether you are currently responsible for it,\n(2) whether you are positive/neutral/negative about it,\n(3) how long it takes time for you to complete it.\u3000\u3000\u3000\u3000\u3000";
                //return "あなたの\n ・担当家事\n ・好き嫌い\n ・一回あたりにかかる時間\n を教えてね";
            }else{
                return "For each chore, enter\n(1) whether you are currently responsible for it,\n(2) whether you are positive/neutral/negative about it,\n(3) how long it takes time for you to complete it.\u3000\u3000\u3000\u3000\u3000";
                //return "あなたの担当家事，好き嫌い，一回あたりにかかる時間　を教えてね　　　";
            }
        }else if (props.tabnumber == 2){
            if(isMobile){
                return "For each chore, enter\n(1) whether you are currently responsible for it,\n(2) whether you are positive/neutral/negative about it,\n(3) how long it takes time for you to complete it.\u3000\u3000\u3000\u3000\u3000";
                //return "パートナーの\n ・好き嫌い\n ・一回あたりにかかる時間\n を教えてね";
            }else{
                return "For each chore, enter\n(1) whether you are currently responsible for it,\n(2) whether you are positive/neutral/negative about it,\n(3) how long it takes time for you to complete it.\u3000\u3000\u3000\u3000\u3000";
                //return "パートナーの好き嫌い，一回あたりにかかる時間　を教えてね　　　　　　";
            }
        }else {
            if (props.tabtabnumber == 0){
                if (props.changeOrUnchageLeast=='unchanged'){
                    return "Here is the current allocation of household chores.\n\nThe pie chart represents each individual's share according to the disutilities.";
                    //return "今の家事分担です\n\n円グラフは各個人の負担感を表します";
                }else{
                    return "Here is the current allocation of household chores.\n\nThe pie chart represents each individual's share according to the disutilities.";
                    //return "今の家事分担です\n\n円グラフは各個人の負担感を表します";
                }
            }else if (props.tabtabnumber==1){
                if (props.changeOrUnchageLeast == 'unchanged'){
                    return "The current allocation is already approximately fair.";
                    //return "今の分担は既におおよそ公平です";
                }else{
                    let category = categoryShow(props.changedListLeast[0]);
                    if(isMobile){
                        return `Here is a slightly fair allocation as compared to the current allocation.\n\nHow about reviewing "${ category }"?`;
                        //return `少し変更しました\n\n「${ category }」\nの見直しはどうですか`;
                    }else{
                        return `Here is a slightly fair allocation as compared to the current allocation.\n\nHow about reviewing "${ category }"?`;
                        //return `少し変更しました\n\n「${ category }」\nの見直しはどうですか`;
                    }
                }
            }else{
                if (props.changeOrUnchageLeast == 'unchanged' && props.changeOrUnchageAW == 'unchanged'){
                    return "The current allocation is already approximately fair.\n\nCustomize an allocation by clicking an icon and transferring the chore.";
                    //return "今の分担は既におおよそ公平です\n\n家事をクリックすると入れ替えられるよ";
                }else if (props.changeOrUnchageLeast == 'unchanged' && props.changeOrUnchageAW == 'changed'){
                    return "Here is a fair allocation.\nThis allocation is also fair.\n\nCustomize an allocation by clicking an icon and transferring the chore.";
                    //return "これが理想的な分担のひとつです\nこちらも公平ですね\n\n家事をクリックすると入れ替えられるよ";
                }else{
                    return "Here is a fair allocation.\n\nCustomize an allocation by clicking an icon and transferring the chore.";
                    //return "これが理想的な分担のひとつです\n\n家事をクリックすると入れ替えられるよ";
                }
            }
        }
    }
    let textsize=5;
    if(isMobile){
        textsize=4;
    }
    return (
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'start', marginBottom: '1.5em'}}>
            <Image alt="introduction" src={sensei} width={102} height={102}></Image>
            <Box sx={{
                backgroundColor: 'rgba(211,211,211,0.5)',
                borderRadius: '5px',
                marginLeft: '1.5em',
                paddingY: '0.5em',
                paddingX: '1em',
                position: 'relative',
            }}>
                <b className='text'><font size={textsize}>{ getSaying() }</font></b>
                <Box sx={{
                    boxSizing: 'content-box',
                    backgroundColor: 'transparent',
                    borderTop: '10px solid transparent',
                    borderBottom: '10px solid transparent',
                    borderRight: '10px solid rgba(211,211,211,0.5)',
                    position: 'absolute',
                    left: '-10px',
                    top: '15px',
                    height: '0px',
                    width: '0px'
                }}></Box>
            </Box>
            <h1></h1>
        </Box>
     );

}
