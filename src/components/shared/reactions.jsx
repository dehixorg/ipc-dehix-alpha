'use client';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Badge } from '../ui/badge';

const Reactions = ({ messageId, reactions, toggleReaction }) => {
  const user = useSelector((state) => state.user);

  const handleEmojiClick = (emoji) => {
    toggleReaction(messageId, emoji);
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      {Object.entries(reactions).map(([emoji, users]) => (
        <Badge
          key={emoji}
          onClick={() => handleEmojiClick(emoji)}
          className={`cursor-pointer ${
            Array.isArray(users) && users.includes(user.uid)
              ? 'bg-gray-400'
              : 'bg-green'
          }`}
        >
          <span className="flex items-center">
            {emoji}
            {users.length > 0 && <span className="ml-2">{users.length}</span>}
          </span>
        </Badge>
      ))}
    </div>
  );
};

Reactions.propTypes = {
  messageId: PropTypes.string.isRequired,
  reactions: PropTypes.any.isRequired,
  toggleReaction: PropTypes.func.isRequired,
};

export default Reactions;