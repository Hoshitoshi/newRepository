import { style } from '@vanilla-extract/css';

export const progressAndHearts = style({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

export const progressBarBackground = style({
  width: '70%',
  backgroundColor: '#ddd',
  borderRadius: '5px',
  overflow: 'hidden',
  position: 'relative',
  // marginLeft:'20px',
});

export const progressBar = style({
  height: '10px',
  backgroundColor: 'lightgreen',
  borderRadius: '5px',
});

export const progressMarks = style({
  display: 'flex',
  justifyContent: 'space-between',
  position: 'absolute',
  width: '100%',
  height: '10px',
  top: 0,
});

export const mark = style({
  height: '100%',
  width: '2px',
  backgroundColor: 'black',
});

export const hearts = style({
  display: 'flex',
  // ハートの追加スタイル（必要に応じて）
});

export const heart = style({
  // 各ハートのスタイル
  fontSize: '24px',
  marginRight: '5px',
});
