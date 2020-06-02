import React from 'react'

import TextInput from 'components/TextInput/TextInput'
import SelectDropdown from 'components/SelectDropdown/SelectDropdown'
import Box from 'components/Box/Box'

export default function ListControls({
  onFormSubmit,
  onSearchUpdate,
  onSortUpdate,
  searchDefault,
  sortOptions,
  sortDefault,
}) {
  return (
    <form className="listControls" onSubmit={onFormSubmit} id="listControls">
      <TextInput
        name="search"
        id="list-search"
        icon="Search"
        iconClasses="search 16"
        placeholder="Search List..."
        defaultValue={searchDefault}
        onChange={onSearchUpdate}
      />
      <Box classes="left2">
        <SelectDropdown
          name="sort"
          id="album-sort"
          options={sortOptions}
          defaultValue={sortDefault}
          onChange={onSortUpdate}
        />
      </Box>
    </form>
  )
}