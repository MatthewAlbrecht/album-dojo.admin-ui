import React from 'react'
import { Link } from 'react-router-dom'

import Txt from 'components/Txt/Txt'

export default function SimilarActions({ actions }) {
  return (
    <div className="similarActions">
      <div className="similarActions-header">
        <Txt
          className="similarActions-codeLabel"
          tag="span"
          size="11"
          color="Grey"
          content="Code"
          uppercase
          semibold
          space="1"
        />
        <Txt
          className="similarActions-nameLabel"
          tag="span"
          size="11"
          color="Grey"
          content="Name"
          uppercase
          semibold
          space="1"
        />
        <Txt
          className="similarActions-pointsLabel"
          tag="span"
          size="11"
          color="Grey"
          content="Points"
          uppercase
          semibold
          space="1"
        />
        <Txt
          className="similarActions-descriptionLabel"
          tag="span"
          size="11"
          color="Grey"
          content="Description"
          uppercase
          semibold
          space="1"
        />
      </div>
      <ul className="similarActions-table">
        {actions.map(action => (
          <li className="similarActions-item" key={action.code}>
            <Link
              to={`/actions/${action.code}`}
              className="similarActions-link"
            >
              <Txt
                className="similarActions-code"
                tag="span"
                size="12"
                color="DefaultCopy"
                content={action.code}
              />
              <Txt
                className="similarActions-name"
                tag="span"
                size="12"
                color="DefaultCopy"
                content={action.name}
              />
              <Txt
                className="similarActions-points"
                tag="span"
                size="12"
                color="DefaultCopy"
                content={action.points}
              />
              <Txt
                className="similarActions-description"
                tag="span"
                size="12"
                color="DefaultCopy"
                content={action.description}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
