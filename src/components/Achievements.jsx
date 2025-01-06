/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { Badge, Tooltip, Stack, Paper } from "@mantine/core";
import {
  IconTrophy,
  IconNotes,
  IconPin,
  IconSearch,
} from "@tabler/icons-react";

const achievements = {
  firstNote: {
    id: "firstNote",
    title: "First Note",
    description: "Created your first note",
    icon: IconNotes,
    condition: (stats) => stats.totalNotes >= 1,
  },
  tenNotes: {
    id: "tenNotes",
    title: "Note Master",
    description: "Created 10 notes",
    icon: IconNotes,
    condition: (stats) => stats.totalNotes >= 10,
  },
  firstPin: {
    id: "firstPin",
    title: "Pin Master",
    description: "Pinned your first note",
    icon: IconPin,
    condition: (stats) => stats.pinnedNotes >= 1,
  },
  firstSearch: {
    id: "firstSearch",
    title: "Explorer",
    description: "Performed your first search",
    icon: IconSearch,
    condition: (stats) => stats.searches >= 1,
  },
  trophyAchievement: {
    id: "trophyAchievement",
    title: "Trophy Collector",
    description: "Collected your first trophy",
    icon: IconTrophy,
    condition: (stats) => stats.trophies >= 1,
  },
  masterCollector: {
    id: "masterCollector",
    title: "Master Collector",
    description: "Collected 5 trophies",
    icon: IconTrophy,
    condition: (stats) => stats.trophies >= 5,
  },
  achievementHunter: {
    id: "achievementHunter",
    title: "Achievement Hunter",
    description: "Unlocked all achievements",
    icon: IconTrophy,
    condition: (stats) =>
      stats.achievementsUnlocked === Object.keys(achievements).length,
  },
};

const AchievementBadge = ({ achievement, unlocked }) => {
  return (
    <Tooltip label={achievement.description} withArrow position="top">
      <Badge
        size="lg"
        variant={unlocked ? "filled" : "light"}
        style={{
          opacity: unlocked ? 1 : 0.5,
          cursor: "default",
          transition: "all 0.3s ease",
        }}
        leftSection={<achievement.icon size={14} />}
      >
        {achievement.title}
      </Badge>
    </Tooltip>
  );
};

const Achievements = ({ stats }) => {
  return (
    <Stack spacing="md">
      {Object.entries(achievements).map(([key, achievement]) => (
        <Paper key={key} p="sm" withBorder>
          <AchievementBadge
            achievement={achievement}
            unlocked={achievement.condition(stats)}
          />
        </Paper>
      ))}
    </Stack>
  );
};

export { achievements, AchievementBadge };
export default Achievements;
