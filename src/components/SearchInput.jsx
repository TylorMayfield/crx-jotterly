/* eslint-disable react/prop-types */
import { TextInput, ActionIcon } from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";

const SearchInput = ({ searchTerm, setSearchTerm }) => {
  return (
    <TextInput
      placeholder="Search notes..."
      size="sm"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      rightSection={
        searchTerm ? (
          <ActionIcon
            onClick={() => setSearchTerm("")}
            variant="subtle"
            size="sm"
          >
            <IconX size={14} />
          </ActionIcon>
        ) : (
          <IconSearch size={14} style={{ color: "#aaa" }} />
        )
      }
    />
  );
};

export default SearchInput;
