import styled from '@emotion/styled';
import { motion, MotionValue, useTransform, useVelocity } from 'framer-motion';
import { useEffect, useState } from 'react';
import Cell, { CELL_SIZE } from './Cell';

const Container = styled(motion.div)<{
  columns: number;
}>`
  position: absolute;
  top: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  mask-repeat: no-repeat;
  mask-image: radial-gradient(
    500px 500px,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0.2),
    transparent
  );
  z-index: 0;
`;

const Grid: React.FC<{
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  mouseXEased: MotionValue<number>;
  mouseYEased: MotionValue<number>;
}> = ({ mouseX, mouseY, mouseXEased, mouseYEased }) => {
  const [columns, setColumns] = useState(0);
  const [rows, setRows] = useState(0);

  // mouse velocity
  const mouseXVelocity = useVelocity(mouseXEased);
  const mouseYVelocity = useVelocity(mouseYEased);
  const mouseVelocity = useTransform<number, number>(
    [mouseXVelocity, mouseYVelocity],
    ([latestX, latestY]) => Math.abs(latestX) + Math.abs(latestY)
  );

  // determine rows and columns
  useEffect(() => {
    // possibly use a resize observer here instead
    if (typeof window === 'undefined') return;
    const calculateGrid = () => {
      const columnCount = Math.ceil(window.innerWidth / CELL_SIZE);
      setColumns(columnCount);
      const rowCount = Math.ceil(window.innerHeight / CELL_SIZE);
      setRows(rowCount);
    };
    // calculate the grid on load
    calculateGrid();
    // recalculate grid on resize
    window.addEventListener('resize', calculateGrid);
    // cleanup
    return () => {
      window.removeEventListener('resize', calculateGrid);
    };
  }, []);

  const opacity = useTransform(mouseVelocity, [0, 1000], [0.4, 1]);

  return (
    <Container
      columns={columns}
      style={{
        opacity,
        translateZ: -100,
      }}
    >
      {Array.from({ length: columns * rows }).map((_, i) => (
        <Cell key={i} mouseX={mouseX} mouseY={mouseY} />
      ))}
    </Container>
  );
};

export default Grid;
