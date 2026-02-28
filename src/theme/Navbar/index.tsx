import React from 'react';
import OriginalNavbar from '@theme-original/Navbar';
import type NavbarType from '@theme/Navbar';
import type { WrapperProps } from '@docusaurus/types';
import SubNav from '@site/src/components/SubNav';

type Props = WrapperProps<typeof NavbarType>;

export default function NavbarWrapper(props: Props): React.ReactElement {
  return (
    <>
      <OriginalNavbar {...props} />
      <SubNav />
    </>
  );
}
