import Link from 'next/link'
import styled from 'styled-components'
import { Project, User } from 'types/projects'
import Card from './shared/Card'
import Markdown from './shared/Markdown'
import { Icon } from './shared/Icon'

type Props = {
  project: Project;
}

export default function ProjectCard({project}: Props) {
  return (
    <Card>
      <Columns>
        <ColumnLeft>
          <Icon src={project.icon_url}/>
        </ColumnLeft>
        <ColumnRight>
          <h2>{project.name}</h2>
          <Markdown>{project.description}</Markdown>
          {!!project.users.length && (
            <>
              <h3>Participants:</h3>
              {project.users.map(u => (
                <Participant key={u.id} user={u} />
              ))}
            </>
          )}
        </ColumnRight>
      </Columns>
    </Card>
  )
}

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 0;
  margin-right: 1.5rem;
`

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`

function Participant({user}: {user: User}) {
  return (
    <ParticipantContainer>
      <ParticipantColumnLeft>
        <ParticipantAvatar src={user.avatar_url} />
      </ParticipantColumnLeft>
      <ParticipantColumnRight>
        <Link href={`/users/${user.id}`}>
          {user.name}
        </Link>
      </ParticipantColumnRight>
    </ParticipantContainer>
  )
}

const ParticipantAvatar = styled.img`
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.1);
`

const ParticipantContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const ParticipantColumnLeft = styled.div`
  flex-basis: 2rem;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 1rem;
`

const ParticipantColumnRight = styled.div`
  flex-basis: 3rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
