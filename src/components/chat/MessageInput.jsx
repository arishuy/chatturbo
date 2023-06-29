import React from 'react';
import { TextField, InputAdornment, Avatar, Stack } from '@mui/material';
import KeyboardVoiceRoundedIcon from '@mui/icons-material/KeyboardVoiceRounded';
import AttachFileRoundedIcon from '@mui/icons-material/AttachFileRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined';
import { useSession } from 'next-auth/react';
import { CldUploadButton } from 'next-cloudinary';
import Button from '@mui/material/Button';
import InputEmoji from 'react-input-emoji';
import { useState, useRef, useEffect } from 'react';
import { EmojiClickData, Emoji, EmojiStyle } from 'emoji-picker-react';

const MessageInput = ({ groupId }) => {
    const { data: session } = useSession();
    const [message, setMessage] = React.useState();
    const emojiRef = useRef();
    const [selectedEmoji, setSelectedEmoji] = useState('');
    let canPublish = true;
    let throttleTime = 200; //0.2 seconds
    const sendMessage = async () => {
        if (!message) return;
        await fetch(`/api/message`, {
            method: 'POST',
            body: JSON.stringify({
                sender: session?.user._doc._id,
                recipient: null,
                recipientGroup: groupId,
                content: message,
                parentMessage: null,
                hearts: null,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };
    const handleUpload = async (result) => {
        await fetch(`/api/message`, {
            method: 'POST',
            body: JSON.stringify({
                sender: session?.user._doc._id,
                recipient: null,
                recipientGroup: groupId,
                content: result.info.secure_url,
                parentMessage: null,
                hearts: null,
                type: 'photo',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
    };

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Emoji
                    className="emoji-element"
                    ref={emojiRef}
                    unified={selectedEmoji}
                    emojiStyle={EmojiStyle.APPLE}
                    size={22}
                />
                <Avatar
                    src={session?.user?._doc.avatar}
                    alt="avatar"
                    sx={{ width: '30px', height: '30px' }}
                />
                <InputEmoji
                    value={message}
                    cleanOnEnter
                    borderRadius="15px"
                    onEnter={sendMessage}
                    onChange={(e) => {
                        setMessage(e);
                        if (canPublish) {
                            fetch(`/api/message/user-typing`, {
                                method: 'POST',
                                body: JSON.stringify({
                                    group_id: groupId,
                                }),
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                            });

                            canPublish = false;
                            setTimeout(function () {
                                canPublish = true;
                            }, throttleTime);
                        }
                    }}
                    placeholder="Type a message"
                />
                <Stack direction="row" sx={{ display: 'flex' }}>
                    <Button sx={{ minWidth: '35px' }}>
                        <KeyboardVoiceRoundedIcon
                            fontSize="small"
                            sx={{ opacity: '0.6' }}
                        />
                    </Button>
                    <Button sx={{ minWidth: '35px' }}>
                        <AttachFileRoundedIcon
                            fontSize="small"
                            sx={{ opacity: '0.6' }}
                        />
                    </Button>

                    <Button sx={{ minWidth: '35px' }}>
                        <CldUploadButton
                            options={{ maxFiles: 1 }}
                            onUpload={handleUpload}
                            uploadPreset={
                                process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
                            }
                        >
                            <ImageOutlinedIcon
                                fontSize="small"
                                sx={{ opacity: '0.6' }}
                            />
                        </CldUploadButton>
                    </Button>
                    <Button sx={{ minWidth: '35px' }}>
                        <SendRoundedIcon
                            fontSize="small"
                            sx={{ opacity: '0.7' }}
                            color="primary"
                        />
                    </Button>
                </Stack>
            </div>
        </>
    );
};

export default MessageInput;

