import React from "react";
import { Box } from "@mui/system";
import WorkIcon from "@mui/icons-material/Work";
import RenderDelegate from "@components/RenderDelegate/RenderDelegate";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  styled,
} from "@mui/material";
import { SlideMultipleSearch } from "@styled-icons/fluentui-system-filled/SlideMultipleSearch";


type Props = {
  param: string;
};

export const Search = styled(SlideMultipleSearch)`
  opacity: 0.15;
`;

const SearchWidget: React.FunctionComponent<Props> = (props: Props) => {
  const { param } = props;

  const fallBackComponent = () => (
    <Box
      display="flex"
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh", backgroundColor: "#f1f0f0" }}
    >
      <Search size="250" />
    </Box>
  );

  const renderComponent = () => (
    <List sx={{ width: "98%", maxWidth: "100%", height: '100vh', bgcolor: 'background.paper', marginLeft:3.5, marginTop:5, borderRadius: 2, }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Photos" secondary="Jan 9, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Work" secondary="Jan 7, 2014" />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <WorkIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Vacation" secondary="July 20, 2014" />
      </ListItem>
    </List>
  );

  return (
    
      <RenderDelegate
        condition={param !== ""}
        renderComponent={renderComponent()}
        fallBackComponent={fallBackComponent()}
      />

  );
};

export default SearchWidget;
