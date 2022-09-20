import { useState } from "react";
import { Checkbox, ListItemButton, ListItemIcon, ListItemText, ListItemAvatar, Avatar } from "@mui/material";

export default function TaskListItem(props) {
    const [checked, setChecked] = useState(props.task.checked);
    const handleClick = (event) => {
        event.preventDefault();
        props.onChangeState({index: props.index, checked: !props.task.checked});
        setChecked(props.task.checked);
    }
    let taskName = '/avatar/'+props.task.name+'.png';
    return (
        <ListItemButton sx={{ pl: 8 }} onClick={handleClick}>
            <ListItemIcon>
                <Checkbox checked={checked}></Checkbox>
            </ListItemIcon>
            <ListItemAvatar>
                <Avatar  src={taskName} />
            </ListItemAvatar>
            <ListItemText primary={ props.task.name } />
        </ListItemButton>
    )
}
