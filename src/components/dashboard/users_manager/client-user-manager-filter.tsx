import * as React from 'react'; 
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { useDebouncedCallback } from 'use-debounce';
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
export function ClientUserManagerFilter({ setSort }: { setSort: Function }): React.JSX.Element {
  const [accountType, setAccoutType] = React.useState('Client');
  const [keyword, setKeyword] = React.useState<string>();

  const debounce = useDebouncedCallback(() => setSort(
    (sort: any) => ({ ...sort, keyword: keyword, accountType: accountType })
  ), 700)
  const handleChange = (event: SelectChangeEvent) => {
    debounce();
    setAccoutType(event.target.value);
  };
  return (
    <div className='flex justify-start items-center'>
      <OutlinedInput
        fullWidth
        value={keyword}
        onChange={(e) => {
          setKeyword(e.target.value)
          debounce();
        }}
        placeholder="Search users"
        startAdornment={
          <InputAdornment position="start" variant='standard' >
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '350px', height: "40px" }}
      />
      <div className=' ml-5'>
        <FormControl variant="standard" className='w-[10rem]' >
          <InputLabel id="demo-simple-select-standard-label">Account Type</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={accountType}
            onChange={handleChange}
            label="Account Type"
          >
            <MenuItem value={"Client"}>Client</MenuItem>
            <MenuItem value={"Meta"}>Meta</MenuItem>
            <MenuItem value={"Google"}>Google</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
