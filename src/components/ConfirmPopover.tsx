import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import React from "react"; 

interface ConfirmPopoverProps {
    message: string
    actionFunc: Function
    open: boolean
    setOpen: Function
    anchorRef: React.RefObject<any>
}

export const ConfirmPopover = ({ message, actionFunc, open, setOpen, anchorRef }: ConfirmPopoverProps) => {


    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }
    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return <>
        <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            placement="left-start"
            transition
            disablePortal
            sx={{ zIndex: 9999 }}
        >
            {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps} style={{
                        transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                    }}
                >
                    <Paper  >
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                                autoFocusItem={open}
                                id="composition-menu"
                                aria-labelledby="composition-button"
                                onKeyDown={handleListKeyDown}
                                sx={{ padding: 0 }}
                            >
                                <MenuItem sx={{ padding: 0 }}  >
                                    <Button sx={{ borderRadius: 1 }} color='warning' variant='outlined' size="small" onClick={() => actionFunc()} >
                                        {message}
                                    </Button>
                                </MenuItem>
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
            )}
        </Popper>
    </>
}