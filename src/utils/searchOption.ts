import { where } from 'firebase/firestore'
import type { QueryConstraint } from 'firebase/firestore'

export const makeSearchOption = (searchOption: {
  status: string
  competitionId: string
  teamId: string
  jstDate: string
}): QueryConstraint[] => {
  const options = []
  if (searchOption.status) {
    options.push(where('status', '==', searchOption.status))
  }
  if (searchOption.competitionId) {
    options.push(where('competition.id', '==', searchOption.competitionId))
  }
  if (searchOption.teamId !== '') {
    options.push(where('teamIds', 'array-contains', searchOption.teamId))
  }
  if (searchOption.jstDate) {
    options.push(where('jstDate', '==', searchOption.jstDate))
  }
  return options
}
