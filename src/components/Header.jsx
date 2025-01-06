/* eslint-disable react/prop-types */
import {
  Group,
  Title,
  ActionIcon,
  Menu,
  useMantineColorScheme,
  Modal,
  Button,
  Text,
  Stack,
} from "@mantine/core";
import {
  IconPencil,
  IconDots,
  IconDownload,
  IconPlus,
  IconMoon,
  IconSun,
  IconTrophy,
  IconTrash,
} from "@tabler/icons-react";
import { useState } from "react";

const Header = ({
  onNewNote,
  onExport,
  onViewChange,
  currentView,
  onDeleteAll,
}) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === "dark";
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleDelete = () => {
    onDeleteAll();
    setDeleteModalOpen(false);
  };

  return (
    <>
      <Group justify="space-between" h="100%" px="md">
        <Group>
          <IconPencil size={24} style={{ color: "#666" }} />
          <Title order={3}>Jotterly</Title>
        </Group>

        <Group spacing="xs">
          {currentView === "notebook" && (
            <ActionIcon variant="subtle" onClick={onNewNote}>
              <IconPlus size={20} />
            </ActionIcon>
          )}
          <Menu position="bottom-end" withArrow>
            <Menu.Target>
              <ActionIcon variant="subtle">
                <IconDots size={20} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              {currentView === "notebook" ? (
                <>
                  <Menu.Item
                    leftSection={<IconTrophy size={14} />}
                    onClick={() => onViewChange("achievements")}
                  >
                    View Achievements
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconDownload size={14} />}
                    onClick={onExport}
                  >
                    Export Notes
                  </Menu.Item>
                  <Menu.Divider />
                  <Menu.Item
                    leftSection={<IconTrash size={14} />}
                    onClick={() => setDeleteModalOpen(true)}
                    color="red"
                  >
                    Delete All Data
                  </Menu.Item>
                </>
              ) : (
                <Menu.Item
                  leftSection={<IconPencil size={14} />}
                  onClick={() => onViewChange("notebook")}
                >
                  Back to Notes
                </Menu.Item>
              )}
              <Menu.Item
                leftSection={
                  isDark ? <IconSun size={14} /> : <IconMoon size={14} />
                }
                onClick={() => toggleColorScheme()}
              >
                {isDark ? "Light Mode" : "Dark Mode"}
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>

      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete All Data"
        centered
      >
        <Stack>
          <Text>
            Are you sure you want to delete all notes and achievements? This
            action cannot be undone.
          </Text>
          <Group justify="flex-end" mt="md">
            <Button variant="default" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button color="red" onClick={handleDelete}>
              Delete All
            </Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
};

export default Header;
