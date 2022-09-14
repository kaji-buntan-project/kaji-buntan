import List from '@mui/material/List';
import TaskCategoryListItem from './taskCategoryListItem';


export default function TaskCategoryList(props) {
    const handleChange = (event) => {
        props.onChange(event);
    }
    return (
        <List align-items="center"
            sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
            {props.taskTree.map((d, idx) => {
                return <TaskCategoryListItem key={idx} index={idx} onChange={handleChange} taskCategory={d}></TaskCategoryListItem>
            })}
      </List>        
    )
}
