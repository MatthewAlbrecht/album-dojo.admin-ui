import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { findGenre, resetGenre } from 'state/actions/genres'
import Container from 'components/Container/Container'
import Tier from 'components/Tier/Tier'
import Box from 'components/Box/Box'
import Spinner from 'components/Spinner/Spinner'
import Txt from 'components/Txt/Txt'
import Btn from 'components/Btn/Btn'
import HList from 'components/HList/HList'
import VList from 'components/VList/VList'
import Hr from 'components/Hr/Hr'
import ModalContainer from 'components/ModalContainer/ModalContainer'
import AddGenreModal from 'components/AddGenreModal/AddGenreModal'
import ItemSection from 'components/ItemSection/ItemSection'
import KeyValueItem from 'components/KeyValueItem/KeyValueItem'

const Genres = ({
  match: {
    params: { id },
  },
}) => {
  const dispatch = useDispatch()
  const [modalIsOpen, setIsOpen] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const requestGenreCallback = useCallback(() => dispatch(findGenre(id)), [
    dispatch,
    id,
  ])
  const resetGenreCallback = useCallback(() => dispatch(resetGenre()), [
    dispatch,
  ])

  useEffect(() => {
    requestGenreCallback()
    return () => resetGenreCallback()
  }, [requestGenreCallback, resetGenreCallback])
  const { genre } = useSelector(({ genres: { genre } }) => ({
    genre,
  }))

  const handleEditClick = () => {
    setIsEdit(true)
    setIsOpen(true)
  }

  const handleDuplicateClick = () => {
    setIsEdit(false)
    setIsOpen(true)
  }

  if (genre && !Object.keys(genre).length) return <Spinner></Spinner>
  return (
    <section className="genrePage">
      <Tier classes="underNav">
        <Container>
          <Box classes="bottom3">
            <Box classes="bottom0_5">
              <Txt
                tag="span"
                size="14"
                semibold
                color="Grey"
                content="Genre"
                uppercase
                space="2"
              />
            </Box>
            <Txt
              tag="h1"
              size="24"
              semibold
              color="DefaultCopy"
              content={genre.name}
            />
            <Box classes="top2">
              <Hr color="GreyLightest"></Hr>
            </Box>
          </Box>
          <Box classes="bottom5">
            <div className="display_flex flexJustifier_flexStart">
              <HList classes="2">
                <Btn
                  small
                  tertiary
                  content="Edit"
                  onClick={handleEditClick}
                ></Btn>
                <Btn
                  small
                  tertiary
                  content="Duplicate"
                  onClick={handleDuplicateClick}
                ></Btn>
              </HList>
            </div>
          </Box>
          <VList classes="5">
            <ItemSection heading="Genre Details">
              <HList classes="3">
                <KeyValueItem
                  property="Parent Genre"
                  value={(genre.parentGenre && genre.parentGenre.name) || '—'}
                />
              </HList>
            </ItemSection>
          </VList>
        </Container>
      </Tier>
      <ModalContainer modalIsOpen={modalIsOpen} setIsOpen={setIsOpen}>
        <AddGenreModal
          isEdit={isEdit}
          defaultValues={genre}
          setIsOpen={setIsOpen}
        ></AddGenreModal>
      </ModalContainer>
    </section>
  )
}

export default Genres
