import React from 'react'
import { ListItem, ListItemAvatar, Avatar } from '@mui/material';
import styles from './TypingIndicator.module.css';

interface TypingIndicatorProps {
    avatar: string,
    name: string,
    surname: string
}

const TypingIndicator = ({ avatar,name,surname }: TypingIndicatorProps) => {
  return (
    <ListItem sx={{ padding: "0 30px 0 15px" }}>
          <ListItemAvatar sx={{
          paddingRight: "30px",
      }}>
        <Avatar
          sx={{
            width: "56px",
            height: "56px",
          }}
          alt="Remy Sharp"
          src={avatar}
        />
          </ListItemAvatar>
      <div className={styles.chat_bubble}>
        <div className={styles.typing}>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
          <div className={styles.dot}></div>
        </div>
      </div>
    </ListItem>
  );
};

export default TypingIndicator