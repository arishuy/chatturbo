import * as React from 'react';
import useAutocomplete, {
    AutocompleteGetTagProps,
} from '@mui/base/useAutocomplete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { autocompleteClasses } from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import { useEffect, useRef, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import RootModal from '../modals/RootModal';
import { useRouter } from 'next/navigation';
import { TextField } from '@mui/material';

const Root = styled('div')(
    ({ theme }) => `
  color: ${
      theme.palette.mode === 'dark'
          ? 'rgba(255,255,255,0.65)'
          : 'rgba(0,0,0,.85)'
  };
  font-size: 14px;
`
);

const Label = styled('label')`
    padding: 0 0 4px;
    line-height: 1.5;
    display: block;
`;

const InputWrapper = styled('div')(
    ({ theme }) => `
  width: 100%;
  border: 1px solid ${theme.palette.mode === 'dark' ? '#434343' : '#d9d9d9'};
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;

  &:hover {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
  }

  &.focused {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
    color: ${
        theme.palette.mode === 'dark'
            ? 'rgba(255,255,255,0.65)'
            : 'rgba(0,0,0,.85)'
    };
    height: 50px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`
);

function Tag(props) {
    const { label, onDelete, ...other } = props;
    return (
        <div {...other}>
            <span>{label}</span>
            <CloseIcon onClick={onDelete} />
        </div>
    );
}

const StyledTag = styled(Tag)(
    ({ theme }) => `
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 22px;
  background-color: ${
      theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.08)' : '#fafafa'
  };
  border: 1px solid ${theme.palette.mode === 'dark' ? '#303030' : '#e8e8e8'};
  border-radius: 2px;
  box-sizing: content-box;
  padding: 5px;
  outline: 0;
  overflow: hidden;

  &:focus {
    border-color: ${theme.palette.mode === 'dark' ? '#177ddc' : '#40a9ff'};
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    margin-left: 8px;
    font-size: 12px;
    cursor: pointer;
  }
`
);

const Listbox = styled('ul')(
    ({ theme }) => `
  width: 100%;
  margin: 2px 0 0;
  padding: 0;
  list-style: none;
  background-color: ${theme.palette.mode === 'dark' ? '#141414' : '#fff'};
  overflow: auto;
  max-height: 290px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 7px 12px;
    display: flex;
    display: flex;
    justify-content: center;
    align-items: center;

    & span {
      flex-grow: 1;
      padding-left: 12px;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: ${theme.palette.mode === 'dark' ? '#2b2b2b' : '#fafafa'};
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li.${autocompleteClasses.focused} {
    background-color: ${theme.palette.mode === 'dark' ? '#003b57' : '#e6f7ff'};
    cursor: pointer;

    & svg {
      color: currentColor;
    }
  }
`
);
export default function CustomizedHook({
    handleOk,
    open,
    groupInfo,
    handleClose,
}) {
    const [friends, setFriends] = useState([]);
    const getFriendsNotInGroup = async () => {
        const res = await fetch(`/api/friend/get`, {
            method: 'GET',
        });
        let data = await res.json();
        data = data.filter((friend) => {
            const isMember = groupInfo?.members.some(
                (member) => member._id === friend._id
            );
            return !isMember;
        });
        return data;
    };
    const handleAddMember = async () => {
        const members = value.map((friend) => friend.id);
        const res = await fetch(`/api/group/${groupInfo._id}/addMember`, {
            method: 'PUT',
            body: JSON.stringify({
                members: members,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (res.status === 200) {
            handleOk();
        }
    };
    useEffect(() => {
        getFriendsNotInGroup().then((data) => {
            const friendsMap = data.map((friend) => {
                return {
                    name: friend.name + ' ' + friend.surname,
                    id: friend._id,
                    avatar: friend.avatar,
                };
            });
            setFriends(friendsMap);
        });
        return () => {
            setFriends([]);
        };
    }, []);

    const {
        getRootProps,
        getInputLabelProps,
        getInputProps,
        getTagProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value,
        focused,
        setAnchorEl,
    } = useAutocomplete({
        id: 'customized-hook-demo',
        multiple: true,
        options: friends,
        openOnFocus: true,
        getOptionLabel: (option) => option?.name,
    });
    return (
        <RootModal
            title="Add Members"
            variant="Edit"
            open={open}
            handleClose={handleClose}
            handleOk={handleAddMember}
            closeOnly={false}
        >
            <Root>
                <div {...getRootProps()}>
                    <InputWrapper
                        ref={setAnchorEl}
                        className={focused ? 'focused' : ''}
                    >
                        {value.map((option, index) => (
                            <StyledTag
                                key={option.id}
                                label={option.name}
                                {...getTagProps({ index })}
                            />
                        ))}
                        <input {...getInputProps()} />
                    </InputWrapper>
                </div>
                <div style={{ height: '300px', position: 'relative' }}>
                    <Typography
                        gutterBottom
                        sx={{
                            position: 'absolute',
                            top: '20px',
                            left: '10px',
                            zIndex: '-10',
                        }}
                    >
                        {value.length > 0 ? '' : 'Please select friends to add'}
                    </Typography>
                    {groupedOptions.length > 0 ? (
                        <div>
                            <Listbox {...getListboxProps()}>
                                {groupedOptions.map((option, index) => (
                                    <li
                                        key={option.id}
                                        {...getOptionProps({ option, index })}
                                    >
                                        <Avatar src={option.avatar} />
                                        <span>{option.name}</span>
                                        <CheckIcon fontSize="small" />
                                    </li>
                                ))}
                            </Listbox>
                        </div>
                    ) : null}
                </div>
            </Root>
        </RootModal>
    );
}
