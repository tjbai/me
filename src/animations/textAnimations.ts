import { keyframes } from "@emotion/react";

const spinAnimationKeyframes = keyframes`
0% { transform: rotate(0); }
100% { transform: rotate(360deg); }
`;

const spinAnimation = `${spinAnimationKeyframes} 5s ease-in-out infinite`;

export { spinAnimation };
