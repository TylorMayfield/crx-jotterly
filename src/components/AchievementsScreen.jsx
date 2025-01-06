/* eslint-disable react/prop-types */
import { Container, Title, SimpleGrid, Paper, Text, Group, ActionIcon } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { achievements } from "./Achievements";
import { AchievementBadge } from "./Achievements";

const AchievementsScreen = ({ stats, onBack }) => {
  return (
    <Container size="lg" py="md">
      <Group position="apart" mb="md">
        <ActionIcon onClick={() => onBack('notebook')} variant="subtle">
          <IconArrowLeft size={20} />
        </ActionIcon>
        <Title order={3}>Achievements</Title>
        <div style={{ width: 20 }} /> {/* Spacer for alignment */}
      </Group>
      <SimpleGrid cols={1} spacing="sm">
        {Object.entries(achievements).map(([key, achievement]) => (
          <Paper key={key} p="md" withBorder>
            <AchievementBadge 
              achievement={achievement} 
              unlocked={achievement.condition(stats)} 
            />
            <Text size="sm" mt="xs" color="dimmed">
              {achievement.description}
            </Text>
          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default AchievementsScreen;
