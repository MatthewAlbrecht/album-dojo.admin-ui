import React from 'react'

import TextInput from 'components/TextInput/TextInput'
import SelectDropdown from 'components/SelectDropdown/SelectDropdown'

export default function ListControls({
  onFormSubmit,
  onSearchUpdate,
  onSortUpdate,
  searchDefault,
  sortOptions,
  sortDefault,
}) {
  return (
    <form
      className="display_grid grid--col2 grid--gap2"
      onSubmit={onFormSubmit}
      id="listControls"
    >
      {/* <Box classes="right2"> */}
      <TextInput
        name="search"
        id="list-search"
        icon="Search"
        iconClasses="search 16"
        placeholder="Search List..."
        defaultValue={searchDefault}
        onChange={onSearchUpdate}
      />
      {/* </Box> */}
      <SelectDropdown
        name="sort"
        id="album-sort"
        className="listControls-sortDropdown"
        options={sortOptions}
        defaultValue={sortDefault}
        onChange={onSortUpdate}
        fullWidth
      />
    </form>
  )
}
