import {
  Button,
  Flex,
  Heading,
  keyframes,
  Text,
  usePrefersReducedMotion,
} from "@chakra-ui/react";
import React, { useState, useRef, useEffect } from "react";
import { duplicateRegenerateSortArray } from "../utils/card-utils";
import Card, { CardProps } from "./Card";

export interface GridProps {
  cards: CardProps[];
}

const GridCards: React.FC<GridProps> = ({ cards }) => {
  const [stateCards, setStateCards] = useState(() => {
    return duplicateRegenerateSortArray(cards);
  });

  const frist = useRef<CardProps | null>(null);
  const second = useRef<CardProps | null>(null);
  const unflip = useRef(false);
  const [matches, setMatches] = useState(0);
  const [moves, setMoves] = useState(0);
  const [record, setRecord] = useState(100);
  const [win, setWin] = useState(false);

  useEffect(() => {
    const recordGame = localStorage.getItem("record");
    if (recordGame) {
      setRecord(Number(recordGame));
    }
  }, []);

  const handleReset = () => {
    setStateCards(duplicateRegenerateSortArray(cards));
    frist.current = null;
    second.current = null;
    unflip.current = false;
    setMatches(0);
    setMoves(0);
    setWin(false);
  };

  const handleClick = (id: string) => {
    const newStateCards = stateCards.map((card) => {
      if (card.id !== id) return card;
      if (card.fliped) return card;

      if (unflip.current && frist.current && second.current) {
        frist.current.fliped = false;
        second.current.fliped = false;
        frist.current = null;
        second.current = null;
        unflip.current = false;
      }

      card.fliped = true;

      if (frist.current === null) {
        frist.current = card;
      } else if (second.current === null) {
        second.current = card;
      }
      if (frist.current && second.current) {
        if (frist.current.back === second.current.back) {
          frist.current = null;
          second.current = null;
          setMatches(matches + 1);
          if (matches >= 5) {
            setWin(true);
            if (moves < record) {
              localStorage.setItem("record", JSON.stringify(moves + 1));
            }
            const recordGame = localStorage.getItem("record");
            if (recordGame) {
              setRecord(Number(recordGame));
            }
          }
        } else {
          unflip.current = true;
        }
        setMoves(moves + 1);
      }

      return card;
    });

    setStateCards(newStateCards);
  };

  const spin = keyframes`
  from { transform: scale(0.9) }
  to { transform: scale(1.3); }`;

  function Example() {
    const prefersReducedMotion = usePrefersReducedMotion();

    const animation = prefersReducedMotion
      ? undefined
      : `${spin} infinite alternate 1.5s ease-in-out`;
    return (
      <Flex animation={animation} mt="40px">
        <Text fontSize={["16px", "24px"]} fontWeight="600" color="green">
          CONGRATULATION, YOU WON!
        </Text>
      </Flex>
    );
  }

  return (
    <>
      <Heading>Memory Game</Heading>
      <Flex mt="16px" flexDir="column" align="center">
        <Flex>
          <Text fontSize="24px" fontWeight="600">
            Moves
          </Text>
          <Text fontSize="24px" ml="6px" fontWeight="600" color="secondary">
            {moves}
          </Text>
          <Text fontSize="24px" fontWeight="600" ml="16px">
            | Matches
          </Text>
          <Text fontSize="24px" ml="6px" fontWeight="600" color="green">
            {matches} / 6
          </Text>
        </Flex>
        <Flex>
          <Text fontSize="24px" fontWeight="600" ml="16px">
            Record
          </Text>
          <Text fontSize="24px" ml="6px" fontWeight="600" color="#880071">
            {record === 100 ? 0 : record}
          </Text>
          <Text fontSize="24px" fontWeight="600" ml="6px">
            moves
          </Text>
        </Flex>
      </Flex>
      <Button
        bg="primary"
        color="white"
        _hover={{ bg: "secondary", boxShadow: "0px 1px 7px 2px #03043a30" }}
        mt="16px"
        onClick={handleReset}
        boxShadow="0px 6px 7px 2px #03043a30"
      >
        Reset Game
      </Button>
      <Flex flexDir="column">
        {win && <Example />}{" "}
        {/* {record < Number(recordGame) && (
          <Text fontSize={["16px", "24px"]} fontWeight="600" color="green">
            NEW RECORD
          </Text>
        )} */}
      </Flex>

      <Flex
        mt="40px"
        maxW={["350px", "900px"]}
        display="grid"
        gap={["5px", "10px"]}
        gridTemplateColumns={[
          "repeat( auto-fit, minmax(100px, 1fr) )",
          "repeat( auto-fit, minmax(200px, 1fr) )",
        ]}
        justify="center"
      >
        {stateCards.map((card) => {
          return <Card {...card} key={card.id} handleClick={handleClick} />;
        })}
      </Flex>
    </>
  );
};

export default GridCards;
