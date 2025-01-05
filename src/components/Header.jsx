/* eslint-disable react/prop-types */
import { Group, Title, ActionIcon, Menu, useMantineColorScheme } from '@mantine/core';
import { IconPencil, IconDots, IconDownload, IconUpload, IconPlus, IconMoon, IconSun } from '@tabler/icons-react';

const Header = ({ onNewNote, onExport, onImport }) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Group justify="space-between" h="100%" px="md">
      <Group>
        <IconPencil size={24} style={{ color: '#666' }} />
        <Title order={3}>Jotterly</Title>
      </Group>
      
      <Group>
        <ActionIcon variant="subtle" onClick={onNewNote}>
          <IconPlus size={20} />
        </ActionIcon>
        <Menu position="bottom-end" withArrow>
          <Menu.Target>
            <ActionIcon variant="subtle">
              <IconDots size={20} />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item leftSection={<IconDownload size={14} />} onClick={onExport}>
              Export Notes
            </Menu.Item>
            <Menu.Item leftSection={<IconUpload size={14} />}>
              <label style={{ cursor: 'pointer', display: 'block' }}>
                Import Notes
                <input
                  type="file"
                  accept="application/json"
                  onChange={onImport}
                  style={{ display: 'none' }}
                />
              </label>
            </Menu.Item>
            <Menu.Item 
              leftSection={isDark ? <IconSun size={14} /> : <IconMoon size={14} />} 
              onClick={() => toggleColorScheme()}
            >
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  );
};

export default Header;
