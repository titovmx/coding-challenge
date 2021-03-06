import Link from 'next/link'
import styled from 'styled-components'
import { User, UserProject } from 'types/shared'
import Card from './shared/Card'
import Markdown from './shared/Markdown'
import { Icon } from './shared/Icon'

type Props = {
  user: User;
}

export default function UserCard({user}: Props) {
  return (
    <Card>
      <Columns>
        <ColumnLeft>
          <Icon src={user.avatar_url}/>
        </ColumnLeft>
        <ColumnRight>
          <h2>{user.name}</h2>
          <p>Fellowship: {user.fellowship}</p>
          <Markdown>{user.bio}</Markdown>
          {!!user.projects.length && (
            <>
              <h3>Projects:</h3>
              {user.projects.map(p => (
                <ProjectView key={p.id} project={p} />
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

function ProjectView({project}: {project: UserProject}) {
  return (
    <ProjectContainer>
      <ProjectColumnLeft>
        <ProjectIcon src={project.icon_url} />
      </ProjectColumnLeft>
      <ProjectColumnRight>
        <Link href={`/projects/${project.id}`}>
          {project.name}
        </Link>
      </ProjectColumnRight>
    </ProjectContainer>
  )
}

const ProjectIcon = styled.img`
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.1);
`

const ProjectContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1rem;
`

const ProjectColumnLeft = styled.div`
  flex-basis: 2rem;
  flex-shrink: 0;
  flex-grow: 0;
  margin-right: 1rem;
`

const ProjectColumnRight = styled.div`
  flex-basis: 3rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
