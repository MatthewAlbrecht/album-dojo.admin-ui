import React from 'react'
import { Link } from 'react-router-dom'

import Txt from 'components/Txt/Txt'

export default function SimilarAchievements({ achievements }) {
  return (
    <div className="similarAchievements">
      <div className="similarAchievements-header">
        <Txt
          className="similarAchievements-codeLabel"
          tag="span"
          size="11"
          color="Grey"
          content="Code"
          uppercase
          semibold
          space="1"
        />
        <Txt
          className="similarAchievements-nameLabel"
          tag="span"
          size="11"
          color="Grey"
          content="Name"
          uppercase
          semibold
          space="1"
        />
        <Txt
          className="similarAchievements-descriptionLabel"
          tag="span"
          size="11"
          color="Grey"
          content="Description"
          uppercase
          semibold
          space="1"
        />
      </div>
      <ul className="similarAchievements-table">
        {achievements.map(achievement => (
          <li className="similarAchievements-item" key={achievement.code}>
            <Link
              to={`/achievements/${achievement.code}`}
              className="similarAchievements-link"
            >
              <Txt
                className="similarAchievements-code"
                tag="span"
                size="12"
                color="DefaultCopy"
                content={achievement.code}
              />
              <Txt
                className="similarAchievements-name"
                tag="span"
                size="12"
                color="DefaultCopy"
                content={achievement.name}
              />
              <Txt
                className="similarAchievements-description"
                tag="span"
                size="12"
                color="DefaultCopy"
                content={achievement.description}
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
