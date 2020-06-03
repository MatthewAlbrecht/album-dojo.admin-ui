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
      <Box classes="right2">
        <TextInput
          name="search"
          id="list-search"
          icon="Search"
          iconClasses="search 16"
          placeholder="Search List..."
          defaultValue={searchDefault}
          onChange={onSearchUpdate}
        />
      </Box>
      <SelectDropdown
        name="sort"
        id="album-sort"
        options={sortOptions}
        defaultValue={sortDefault}
        onChange={onSortUpdate}
      />
    </form>
  )
}
