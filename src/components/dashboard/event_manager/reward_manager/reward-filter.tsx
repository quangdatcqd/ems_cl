import * as React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import { MagnifyingGlass as MagnifyingGlassIcon } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass';
import { useDebouncedCallback } from 'use-debounce';
export function RewardFilter({ setSort }: { setSort: Function }): React.JSX.Element {
  const debounce = useDebouncedCallback((e) =>  setSort(e.target.value.trim() === '' ? "all" : e.target.value), 700)
  return (
    <div className='mb-5' >
      <OutlinedInput
        fullWidth
        onChange={debounce}
        placeholder="Search reward name"
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
