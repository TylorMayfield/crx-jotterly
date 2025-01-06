import { notifications } from '@mantine/notifications';
import { IconTrophy } from '@tabler/icons-react';

export const showAchievementNotification = (achievement) => {
  notifications.show({
    title: '🏆 Achievement Unlocked!',
    message: `${achievement.title}: ${achievement.description}`,
    color: 'yellow',
    icon: <IconTrophy size={16} />,
    autoClose: 5000,
    style: { animation: 'bounce 0.5s ease' },
  });
};

export const showNoteNotification = (type, message) => {
  notifications.show({
    title: type === 'create' ? '📝 Note Created' : '🗑️ Note Deleted',
    message,
    color: type === 'create' ? 'green' : 'red',
    autoClose: 3000,
  });
};
