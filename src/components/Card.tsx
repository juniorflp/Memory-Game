import { Flex, Text } from "@chakra-ui/react";
import React from "react";

export interface CardProps {
  fliped?: boolean;
  back: string;
  id: string;
  handleClick?: (id: string) => void;
}

const Card: React.FC<CardProps> = ({ fliped, back, id, handleClick }) => {
  const handleClickFn = () => {
    if (handleClick) {
      handleClick(id);
    }
  };

  return (
    <Flex
      boxSize={["100px", "200px"]}
      borderRadius="8px"
      position="relative"
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 600ms ease-in-out",
      }}
      transform={fliped ? "rotateY(180deg)" : "none"}
      onClick={handleClickFn}
      cursor="pointer"
      boxShadow="0px 6px 7px 2px #03043a30"
    >
      <Flex
        position="absolute"
        borderRadius="8px"
        w="100%"
        h="100%"
        bg="primary"
        color="white"
        style={{
          backfaceVisibility: "hidden",
        }}
        align="center"
        justify="center"
      >
        <Text fontSize={["40px", "70px"]}>?</Text>
      </Flex>
      <Flex
        borderRadius="8px"
        position="absolute"
        w="100%"
        h="100%"
        bg="secondary"
        style={{
          backfaceVisibility: "hidden",
        }}
        transform="rotateY(180deg)"
        align="center"
        justify="center"
      >
        <Text fontSize={["40px", "70px"]}>{back}</Text>
      </Flex>
    </Flex>
  );
};

export default Card;
