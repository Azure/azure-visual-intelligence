import React from "react";
import { Stack, IconButton, List } from "@fluentui/react";
import { useIsAuthenticated } from "@azure/msal-react";
import {
  mergeStyleSets,
  getTheme,
  normalize,
} from "@fluentui/react/lib/Styling";

const AddIcon = { iconName: "Add" };
const UploadIcon = { iconName: "Upload" };
const DuplicateIcon = { iconName: "Copy" };
const RenameIcon = { iconName: "Edit" };
const DownloadIcon = { iconName: "Download" };

const itemslist = [
  {
    key: "item1",
    name: "Demo1",
  },
  {
    key: "item2",
    name: "Demo2",
  },
];

export interface IItem {
  key: string;
  name: string;
}

const theme = getTheme();

const styles = mergeStyleSets({
  container: {
    overflow: "auto",
    maxHeight: 400,
    border: "1px solid #CCC",
    marginTop: 20,
    selectors: {
      ".ms-List-cell:nth-child(odd)": {
        height: 50,
        lineHeight: 50,
        background: theme.palette.neutralLighter,
      },
      ".ms-List-cell:nth-child(even)": {
        height: 25,
        lineHeight: 25,
      },
    },
  },
  itemContent: [
    theme.fonts.medium,
    normalize,
    {
      position: "relative",
      boxSizing: "border-box",
      display: "block",
      borderLeft: "3px solid " + theme.palette.themePrimary,
      paddingLeft: 27,
    },
  ],
});

const onRenderCell = (item: IItem, index: number): JSX.Element => {
  return (
    <div data-is-focusable>
      <div className={styles.itemContent}>
        {index} &nbsp; {item.name}
      </div>
    </div>
  );
};

const DiagramMenu = () => {
  //const isAuthenticated = useIsAuthenticated();
  return (
    <Stack>
      <div>Diagrams</div>
      <Stack horizontal>
        <IconButton
          iconProps={AddIcon}
          disabled={true}
          title="New"
          ariaLabel="New"
        />
        <IconButton
          iconProps={UploadIcon}
          disabled={true}
          title="Upload"
          ariaLabel="Upload"
        />
        <IconButton
          iconProps={DuplicateIcon}
          disabled={true}
          title="Duplicate"
          ariaLabel="Duplicate"
        />
        <IconButton
          iconProps={RenameIcon}
          disabled={true}
          title="Rename"
          ariaLabel="Rename"
        />
        <IconButton
          iconProps={DownloadIcon}
          disabled={true}
          title="Download"
          ariaLabel="Download"
        />
      </Stack>
      <List>
        items={itemslist}
        getPageHeight={400}
        onRenderCell={onRenderCell}
      </List>

      <div>Demo Diagram</div>
    </Stack>
  );
};

export default DiagramMenu;
