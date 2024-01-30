import { Chip, Avatar } from "@mui/material"
import { styled } from "@mui/system"
import constants from "../src/constants";
import styles from 'styles/allocationChip.module.css';

const ListItem = styled("li")(({theme}) => ({margin: theme.spacing(0.5)}))

const allTasks = constants.allTasks
const backgroundColorList = constants.backgroundColorList
const myBackColor = constants.myBackColor
const partnerBackColor = constants.partnerBackColor
const myBackColorBorder = constants.myBackColorBorder
const partnerBackColorBorder = constants.partnerBackColorBorder

export default function AllocationChip(props) {
  let backColor;
  let avatar;
  if (props.person == '私'){
    backColor = myBackColor;
    avatar = '../avatar/myAvatar.png';
  }else if(props.person == 'パートナー'){
    backColor = partnerBackColor;
    avatar = '../avatar/partnerAvatar.png';
  }
  let changedList = props.changedList;
  if (props.current != "current"){
    if (changedList.includes(props.label) && props.tabtabnumber == 2){
      //理想的な分担
      return (<ListItem sx={{maxWidth:"100%"}}>
        <Chip 
        sx = {{
          backgroundColor: backColor,
        }}
        className={styles.chip} 
        avatar={<Avatar src = { avatar }></Avatar>}
        label={`${props.label}　${props.participates}`}
        onClick={() => props.repartition(props.person, props.label, props.tabtabnumber)}
        >
        </Chip><div><b style={{color: "rgba(100,185,50)"}}>変更</b></div>
        </ListItem>
        )
    }else{
      //少し理想的な分担
      return (<ListItem sx={{maxWidth:"100%"}}>
        <Chip 
        sx = {{
          backgroundColor: backColor,
        }} 
        className={styles.chip} 
        avatar={<Avatar src = { avatar }></Avatar>}
        label={`${props.label}　${props.participates}`}
        // onClick={() => props.repartition(props.person, props.label, props.tabtabnumber)}
        >
        </Chip>
        </ListItem>
        )
      }
    }else{
    //今の家事分担
    return (<ListItem sx={{maxWidth:"100%"}}>
      <Chip 
      sx = {{
        backgroundColor: backColor,
      }} 
      className={styles.chip} 
      avatar={<Avatar src = { avatar }></Avatar>}
      label={`${props.label}　${props.participates}`}
      // style={styles.chip}
      // onClick={() => props.repartition(props.person, props.label, props.tabtabnumber)}
      >
      </Chip>
      </ListItem>
      )
  }
}