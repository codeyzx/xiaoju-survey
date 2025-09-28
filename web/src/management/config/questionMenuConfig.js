import { createI18n } from 'vue-i18n'

export const menuItems = {
  text: {
    type: 'text',
    snapshot: '/imgs/question-type-snapshot/iL84te6xxU1657702189333.webp',
    path: 'InputModule',
    icon: 'tixing-danhangshuru',
    titleKey: 'editor.typeListSingleLineInput'
  },
  textarea: {
    type: 'textarea',
    snapshot: '/imgs/question-type-snapshot/11iAo3ca0u1657702225416.webp',
    path: 'TextareaModule',
    icon: 'tixing-duohangshuru',
    titleKey: 'editor.typeListMultiLineInput'
  },
  radio: {
    type: 'radio',
    snapshot: '/imgs/question-type-snapshot/TgeRDfURJZ1657702220602.webp',
    icon: 'tixing-danxuan',
    path: 'RadioModule',
    titleKey: 'editor.typeListSingleChoice'
  },
  checkbox: {
    type: 'checkbox',
    path: 'CheckboxModule',
    snapshot: '/imgs/question-type-snapshot/Md2YmzBBpV1657702223744.webp',
    icon: 'tixing-duoxuan',
    titleKey: 'editor.typeListMultipleChoice'
  },
  'binary-choice': {
    type: 'binary-choice',
    snapshot: '/imgs/question-type-snapshot/blW8U1ckzd1657702223023.webp',
    path: 'BinaryChoiceModule',
    icon: 'tixing-panduanti',
    titleKey: 'editor.typeListTrueFalse'
  },
  'radio-star': {
    type: 'radio-star',
    snapshot: '/imgs/question-type-snapshot/7CU6tn4XqT1657702221208.webp',
    path: 'StarModule',
    icon: 'tixing-pingfen',
    titleKey: 'editor.typeListStarRating'
  },
  'radio-nps': {
    type: 'radio-nps',
    path: 'NpsModule',
    snapshot: '/imgs/question-type-snapshot/radio-nps.webp',
    icon: 'NPSpingfen',
    titleKey: 'editor.typeListNpsRating'
  },
  vote: {
    type: 'vote',
    path: 'VoteModule',
    snapshot: '/imgs/question-type-snapshot/nGTscsZlwn1657702222857.webp',
    icon: 'tixing-toupiao',
    titleKey: 'editor.typeListVoteQuestion'
  },
  cascader: {
    type: 'cascader',
    path: 'CascaderModule',
    snapshot: '/imgs/question-type-snapshot/cascader.webp',
    icon: 'cascader-select',
    titleKey: 'editor.typeListCascaderQuestion'
  }
}

const menuGroup = [
  {
    titleKey: 'editor.inputQuestions',
    questionList: ['text', 'textarea']
  },
  {
    titleKey: 'editor.choiceQuestions',
    questionList: ['radio', 'checkbox', 'binary-choice', 'radio-star', 'radio-nps', 'vote']
  }, {
    titleKey: 'editor.advancedQuestions',
    questionList: ['cascader']
  }
]

const menu = menuGroup.map((group) => {
  group.questionList = group.questionList.map((question) => menuItems[question])
  return group
})

export const questionTypeList = Object.values(menuItems)

export default menu
