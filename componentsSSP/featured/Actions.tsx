import { Box, Grid, Switch } from '@mui/material/';
import React, { useContext } from 'react';
import { FeaturedSectionContext } from '../../components/contexts/featured/contexts';
import pointerStyle from './pointerStyle';

const switchStyle = {
    bg: 'darkGray',
    'input:checked ~ &': {
        bg: 'secondary',
    },
};

const EmojiButton: React.FC<{ enabled?: boolean; action?: () => void }> = ({
    children,
    enabled = true,
    action = () => {},
}) => {
    return (
        <Box
            sx={{ opacity: enabled ? 1 : 0, ...(enabled ? pointerStyle : null) }}
            onClick={() => {
                enabled && action && action();
            }}
        >
            {children}
        </Box>
    );
};

const Actions: React.FC<{}> = () => {
    const { section, actions, ...context } = useContext(FeaturedSectionContext);
    return (
        <Box sx={{ fontSize: '2rem', display: 'flex' }}>
            <Box sx={{ fontSize: '2rem', display: 'flex', alignItems: 'space-between', gap: '16px' }}>
                <EmojiButton action={context.editRoutes.toggle}>
                    🚴‍♀️<sup style={{ fontSize: '1.2rem' }}>{section?.routes?.length || 0}</sup>
                </EmojiButton>
                <EmojiButton enabled={context.hasChanges} action={actions.updateName}>
                    💾
                </EmojiButton>
                <EmojiButton enabled={!context.isFirst} action={actions.moveUp}>
                    ⬆️
                </EmojiButton>
                <EmojiButton enabled={!context.isLast} action={actions.moveDown}>
                    ⬇️
                </EmojiButton>
                <EmojiButton action={actions.remove}>🗑</EmojiButton>
                <EmojiButton>
                    <Switch sx={switchStyle} onChange={actions.toggle} checked={section.isActive} />
                </EmojiButton>
            </Box>
        </Box>
    );
};

export default Actions;
