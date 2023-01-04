import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

interface LayoutProps extends FlexProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex
      w="full"
      h="100vh"
      bg="bg"
      flexDir="column"
      justify="center"
      align="center"
    >
      {children}
    </Flex>
  );
};

export default Layout;
