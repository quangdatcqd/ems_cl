import * as React from 'react'; 
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { useDebouncedCallback } from 'use-debounce';
export function SurveyManagerFilter({ setSort }: { setSort: Function }): React.JSX.Element {
  const [keyword, setKeyword] = React.useState<string>();
  const debounce = useDebouncedCallback(() => setSort(
    (sort: any) => ({ ...sort, keyword: keyword})
  ), 700)
 
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
       
    </div>
  );
}
