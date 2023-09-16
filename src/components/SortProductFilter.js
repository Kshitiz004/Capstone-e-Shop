import { MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch } from "react-redux";

export default function SortProductFilter(props) {
    const options = ['Default', 'Price: High to Low', 'Price: Low to High', 'Newest'];
    const dispatch = useDispatch();

    return(
        <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        flex: 1
      }}
      noValidate
      autoComplete="off"
    >
        <TextField sx={{display: (props.isHide ? 'none' : 'inline-flex')}} id="standard-select-sort" select label="Sort By:" defaultValue="Default" variant="filled" onChange={(e) => {
            dispatch({type: 'setSortBy', payload: e.target.value})
        }}>
            {options.map((option) => (
                <MenuItem key={option} value={option}>
                {option}
                </MenuItem>
            ))}
        </TextField>
        </Box>
    );
}