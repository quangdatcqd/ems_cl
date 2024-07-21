
import { EventDataType } from "../../../interface/event";
import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from "@mui/material";
import PlaceIcon from '@mui/icons-material/Place';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import TransgenderIcon from '@mui/icons-material/Transgender';
import RunningWithErrorsIcon from '@mui/icons-material/RunningWithErrors';
import QueueIcon from '@mui/icons-material/Queue';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import dayjs from "dayjs";
export function EventDetail({ event }: { event: EventDataType }) {
    return (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <Grid container spacing={0} >
                <Grid item xl={6} lg={8} sm={12}  >
                    <ListItem sx={{ padding: 0 }}>
                        <ListItemAvatar>
                            <Avatar>
                                <PlaceIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Location" secondary={event.location} />
                    </ListItem>
                </Grid>
                <Grid item xl={3} lg={4} sm={6} xs={12}>
                    <ListItem sx={{ padding: 0 }}>
                        <ListItemAvatar>
                            <Avatar>
                                <RunningWithErrorsIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Registration Deadline" secondary={dayjs(event.registrationDeadline).format('YYYY-MM-DD')} />
                    </ListItem>
                </Grid>
                <Grid item xl={3} lg={4} sm={6} xs={12}>
                    <ListItem sx={{ padding: 0 }}>
                        <ListItemAvatar>
                            <Avatar>
                                <PeopleAltIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Capacity Limit" secondary={event.capacityLimit} />
                    </ListItem>
                </Grid>

                <Grid item xl={3} lg={4} sm={6} xs={12}>
                    <ListItem sx={{ padding: 0 }}>
                        <ListItemAvatar>
                            <Avatar>
                                <ContactEmergencyIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Age Range" secondary={event.allowMinAge + ' - ' + event.allowMaxAge} />
                    </ListItem>
                </Grid>
                <Grid item xl={3} lg={4} sm={6} xs={12}>
                    <ListItem sx={{ padding: 0 }}>
                        <ListItemAvatar>
                            <Avatar>
                                <TransgenderIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Allowed Gender" secondary={event.allowGender} />
                    </ListItem>
                </Grid>
                <Grid item xl={3} lg={4} sm={6} xs={12}>
                    <ListItem sx={{ padding: 0 }}>
                        <ListItemAvatar>
                            <Avatar>
                                <QueueIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Allowed Waitlist" secondary={event.allowWaitlist ? "Yes" : "No"} />
                    </ListItem>
                </Grid>
                <Grid item xl={3} lg={4} sm={6} xs={12}>
                    <ListItem sx={{ padding: 0 }}>
                        <ListItemAvatar>
                            <Avatar>
                                <AssignmentTurnedInIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Type Check In" secondary={event.typeCheckin} />
                    </ListItem>
                </Grid>
            </Grid>
        </List>
    );
}
