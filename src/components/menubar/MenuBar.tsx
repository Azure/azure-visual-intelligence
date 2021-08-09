import React from "react";
import { Stack, Separator, ISeparatorStyles, DefaultPalette, IStackTokens, IStackStyles, Label } from '@fluentui/react';
import AuthenticationMenu from './AuthenticationMenu';
import DiagramMenu from './DiagramMenu';
import { Icon } from '@fluentui/react/lib/Icon';

const horizontalGapStackTokens: IStackTokens = {
  childrenGap: 10,
  padding: 10,
};

const stackStyles: IStackStyles = {
  root: {
    background: DefaultPalette.neutralLighter,
    marginTop : 10
  },
};

const separatorStyles: ISeparatorStyles = {
  content:{},
  root: [{
    marginLeft: 10,
    marginRight: 10,
    selectors: {
      '::before': {
        background: 'black',
         }
    }
  }]
};


const  MenuBar = () => {
    return (
      <Stack styles={stackStyles}>
        <Stack horizontal tokens={horizontalGapStackTokens}>
          <Icon iconName="GlobalNavButton" />
          <Label>Azure Visual Intelligence</Label>
        </Stack>
        <Separator styles={separatorStyles}/>
        <AuthenticationMenu/>
        <Separator styles={separatorStyles}/>
        <DiagramMenu/>
      </Stack>
      
    );
}
export default MenuBar;

