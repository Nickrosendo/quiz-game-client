export const All       = 'All'
export const CINEMA    = 'Cinema'
export const COMPUTERS = 'Computers'
export const GAMES     = 'Games'
export const SPORT     = 'Sport'
export const WORLD     = 'World'

export const separateQuestionsByCategory = (questions = []) => {
  const all = questions.map(parseQuestionServerData)
  return all.reduce((lists, question) => {
    lists[question.category].push(question)

    return lists
  }, {
    [All]:       all,
    [CINEMA]:    [],
    [COMPUTERS]: [],
    [GAMES]:     [],
    [SPORT]:     [],
    [WORLD]:     [],
  })
}

export const parseQuestionServerData = ({ question, answers, correct, category }) => ({
  question,
  category,
  answers,
  correct
})
