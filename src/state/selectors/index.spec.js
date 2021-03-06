import { head, identity, last, length, times } from 'ramda'

import {
  ALL_GOOD_RESULT,
  NEED_HELP_RESULT,
  NO,
  NOT_SURE,
  YES
} from '../constants'
import { state as fullState } from '../fixtures'

import {
  checkNextQuestionEnabled,
  checkPreviousQuestionEnabled,
  getActiveQuestion,
  getActiveQuestionIndex,
  getCurrentTopicName,
  getNoAnswers,
  getNotSureAnswers,
  getQuestionCount,
  getQuestionIndices,
  getQuestionList,
  getResponseCount,
  getResponseList,
  getResponses,
  getResultType,
  getTopics,
  getYesAnswers
} from './'

const { checkup: state } = fullState

const questions = getQuestionList(state)

describe('state:selectors', () => {
  describe('checkNextQuestionEnabled', () => {
    it('should return true if the next question exists and is permitted', () => {
      expect(checkNextQuestionEnabled(state)).toBe(true)
    })

    it('should return false if the next question does not exist or is not permitted', () => {
      const newState = { ...state, activeQuestionIndex: 3 }

      expect(checkNextQuestionEnabled(newState)).toBe(false)
    })
  })

  describe('checkPreviousQuestionEnabled', () => {
    it('should return true if the next question exists and is permitted', () => {
      const newState = { ...state, activeQuestionIndex: 3 }

      expect(checkPreviousQuestionEnabled(newState)).toBe(true)
    })

    it('should return false if the next question does not exist or is not permitted', () => {
      expect(checkPreviousQuestionEnabled(state)).toBe(false)
    })
  })

  describe('getActiveQuestion', () => {
    it('should return the active question when an index is set', () => {
      const [activeTopic] = state.topics
      const [activeQuestion] = activeTopic.questions

      expect(getActiveQuestion(state)).toMatchObject(activeQuestion)
    })

    it('should return undefined when the active question index does not exist', () => {
      const newState = { ...state, activeQuestionIndex: -1 }

      expect(getActiveQuestion(newState)).toBeUndefined()
    })
  })

  describe('getActiveQuestionIndex', () => {
    it('should return the active question', () => {
      expect(getActiveQuestionIndex(state)).toBe(state.activeQuestionIndex)
    })

    it('should return undefined if no activeQuestionIndex value', () => {
      const newState = {}

      expect(getActiveQuestionIndex(newState)).toBeUndefined()
    })
  })

  describe('getCurrentTopicName', () => {
    it('should return the name of the current topic', () => {
      expect(getCurrentTopicName(state)).toBe('Money Troubles')
    })

    it('should return undefined if no activeQuestionIndex value', () => {
      const newState = { ...state, activeQuestionIndex: -1 }

      expect(getCurrentTopicName(newState)).toBeUndefined()
    })
  })

  describe('getQuestionCount', () => {
    it('should give an accurate count of the questions', () => {
      expect(getQuestionCount(state)).toBe(length(questions))
    })
  })

  describe('getQuestionIndices', () => {
    it('provides an array of indices equal to the number of questions', () => {
      expect(getQuestionIndices(state)).toEqual(times(identity, 28))
    })
  })

  describe('getQuestionList', () => {
    it('should return the correct number of questions in the correct order', () => {
      expect(questions).toHaveLength(28)
      expect(head(questions).id).toBe('759CDC30C25B489A9EB71B7E859F2DD7')
      expect(last(questions).id).toBe('79591D25C03D4AA7912E1366DD282586')
    })

    it('should add the topic name and id to each question', () => {
      const { topic, topicId } = head(questions)

      expect(topic).toBe('Money Troubles')
      expect(topicId).toBe('4DDB61C7677B4BA2813D2CAE98EF51D5')
    })
  })

  describe('getResponseCount', () => {
    it('returns the total number of responses', () => {
      expect(getResponseCount(state)).toBe(3)
    })
  })

  describe('getResponseList', () => {
    it('should return the correct number of questions in the correct order', () => {
      const responses = getResponseList(state)
      const [fst, snd, thd] = responses || []

      expect(responses).toHaveLength(3)
      expect(fst.id).toBe('759CDC30C25B489A9EB71B7E859F2DD7')
      expect(fst.answer).toBe(YES)
      expect(snd.id).toBe('8A9B3C23BA41440187B0B9F9EB0D8400')
      expect(snd.answer).toBe(NO)
      expect(thd.id).toBe('A7D51C38F34A4EA1919C74013E703C39')
      expect(thd.answer).toBe(NOT_SURE)
    })

    it('should add the topic name and id to each question', () => {
      const { topic, topicId } = head(questions)

      expect(topic).toBe('Money Troubles')
      expect(topicId).toBe('4DDB61C7677B4BA2813D2CAE98EF51D5')
    })
  })

  describe('getResponses', () => {
    it('should include the topics and questions with responses added', () => {
      const responses = getResponses(state)
      const { id, name, questions } = head(responses)

      expect(id).toBe('4DDB61C7677B4BA2813D2CAE98EF51D5')
      expect(name).toBe('Money Troubles')
      expect(questions).toHaveLength(3)
      expect(head(questions).id).toBe('759CDC30C25B489A9EB71B7E859F2DD7')
    })
  })

  describe('getTopics', () => {
    it('should return the topics and their questions', () => {
      expect(getTopics(state)).toEqual(state.topics)
    })
  })

  describe(`getNoAnswers`, () => {
    it(`should return all of the No answers`, () => {
      expect(getNoAnswers(state)).toHaveLength(1)
    })
  })

  describe(`getNotSureAnswers`, () => {
    it(`should return all of the NotSure answers`, () => {
      expect(getNotSureAnswers(state)).toHaveLength(1)
    })
  })

  describe(`getYesAnswers`, () => {
    it(`should return all of the Yes answers`, () => {
      expect(getYesAnswers(state)).toHaveLength(1)
    })
  })

  describe(`getResultType`, () => {
    it(`should return ${NEED_HELP_RESULT} when yesCount >= RESULTS_TRIGGER`, () => {
      expect(getResultType(state)).toBe(NEED_HELP_RESULT)
    })

    it(`should return ${ALL_GOOD_RESULT} when yesCount < RESULTS_TRIGGER`, () => {
      const allGoodState = { ...state, responses: [] }

      expect(getResultType(allGoodState)).toBe(ALL_GOOD_RESULT)
    })
  })
})
