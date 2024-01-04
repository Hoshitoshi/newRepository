// VisualPareChallenge.css.ts
import { style } from '@vanilla-extract/css';

export const body = style({
  fontFamily: "'Arial', sans-serif",
  backgroundColor: '#f4f4f4',
  color: '#333',
  textAlign: 'center',
});

export const container = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '20px',
  padding: '20px',
  // '@media': {
  //   'min-width: 600px': {
  //     flexDirection: 'row',
  //   },
  // },
});

export const image = style({
  display: 'flex',
  width: '150px',
  height: '150px',
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  transition: 'transform 0.3s ease',
  cursor: 'pointer',
  selectors: {
    '&:hover': {
      transform: 'scale(1.05)',
    },
    // '&:disabled': {
    //   opacity: 0.6,
    //   cursor: 'not-allowed',
    // },
  },
});

export const imageDisabled = style({
  opacity: 0.4, // 画像を透明にする
  pointerEvents: 'none', // クリックイベントを無効にする
  backgroundColor: 'lightblue',
});

export const button = style({
  width: '150px',
  height: '150px',
  color: 'gray',
  border: 'none',
  borderRadius: '15px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  backgroundColor:'white',
  padding: '10px 20px',
  textTransform: 'uppercase',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  selectors: {
    '&:hover': {
      // backgroundColor: '#45a049',
      transform: 'scale(1.05)',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'default',
    },
  },
});

export const correct = style({
  backgroundColor: 'lightblue',
});

export const selected = style({
  backgroundColor: 'lightgreen',
});

export const wrong = style({
  backgroundColor: 'pink',
});

export const normal = style({
  backgroundColor: 'white',
});

export const wrongMessage = style({
  margin: '10px 0',
  color: 'red',
  fontWeight: 'bold',
});

export const correctMessage = style({
  color: '#28a745',
  fontSize: '1.2em',
  fontWeight: 'bold',
});

export const allCorrectMessage = style({
  color: '#28a745',
  fontSize: '1.5em',
  fontWeight: 'bold',
});

export const nextButton = style({
  marginTop: '10px',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#4caf50',
  color: 'white',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
  selectors: {
    '&:hover': {
      backgroundColor: '#45a049',
    },
  },
});
