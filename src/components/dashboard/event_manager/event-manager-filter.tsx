import * as React from 'react';
import Card from '@mui/material/Card';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { useDebouncedCallback } from 'use-debounce'; 
export function EventManagerFilter({ setSort }: { setSort: Function }): React.JSX.Element {
  const debounce = useDebouncedCallback((e) => setSort(
    (sort: any) => ({   ...sort, keyword:e.target.value})
  ), 700)
  return (
    <Card sx={{ p: 2 }}>
      <OutlinedInput
        fullWidth
        onChange={debounce}
        placeholder="Search event name"
        startAdornment={
          <InputAdornment position="start" variant='standard' >
            <MagnifyingGlassIcon fontSize="var(--icon-fontSize-md)" />
          </InputAdornment>
        }
        sx={{ maxWidth: '350px', height: "40px" }}

      />
    </Card>
  );
}
